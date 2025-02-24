import { readFile, readdir } from 'fs/promises';
import { join } from 'path';
import { openai } from '@ai-sdk/openai';
import { db } from '../lib/db';
import { embeddings, resources } from '../lib/db/schema';
import { embedMany } from 'ai';
import { MarkdownTextSplitter, RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { writeFile, mkdir, unlink } from 'fs/promises';
import { exec } from 'child_process';
import { promisify } from 'util';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import yaml from 'js-yaml';
import cliProgress from 'cli-progress';

const execAsync = promisify(exec);

const embeddingModel = openai.embedding('text-embedding-ada-002');

type Repository = {
  filename: string;
  url: string;
  title: string;
};

async function loadRepositories(): Promise<Repository[]> {
  try {
    const configPath = join(process.cwd(), 'config', 'repositories.yml');
    const fileContents = await readFile(configPath, 'utf8');
    const config = yaml.load(fileContents) as { repositories: Repository[] };
    return config.repositories;
  } catch (error) {
    console.error('Error loading repositories config:', error);
    process.exit(1);
  }
}

async function generateMarkdownFiles() {
  try {
    const repositories = await loadRepositories();
    await mkdir('./resources', { recursive: true });

    for (const repo of repositories) {
      console.log(`Processing repository: ${repo.url}`);
      
      try {
        // Generate markdown content using repomix CLI
        await execAsync(`repomix --remote ${repo.url} --ignore "**/*.pbxproj,**/.swiftlint.yml,**/*.license,**/*.xcstrings,**/*.xcworkspace,**/*.xcodeproj,**/*.xcscheme,**/*.xcuserdata,**/*.xcuserdatad,**/*.xcuserstate,**/*.xcuserstate.xcuserdatad" --no-file-summary`);
        
        // Read the generated output file
        const content = await readFile('repomix-output.txt', 'utf-8');
        
        // Use the filename from the config
        const filePath = join('./resources', repo.filename);
        
        // Write the markdown content to a file
        await writeFile(filePath, content, 'utf-8');
        console.log(`Successfully generated markdown for ${repo.url} at ${filePath}`);

        // Delete the generated output file
        await unlink('repomix-output.txt');
      } catch (error) {
        console.error(`Error processing repository ${repo.url}:`, error);
        // Continue with next repository even if one fails
        continue;
      }
    }
    
    console.log('Finished generating all markdown files');
  } catch (error) {
    console.error('Error in markdown generation:', error);
    process.exit(1);
  }
}

const generateChunks = async (input: string): Promise<string[]> => {
  // Create a markdown splitter that preserves code blocks and headers
  const markdownSplitter = new MarkdownTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  // Create a code splitter for handling large code blocks
  const codeSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
    separators: ["\n\n", "\n", " ", ""],
    keepSeparator: true,
  });

  // First split by markdown structure
  const mdDocs = await markdownSplitter.splitText(input);

  // Further process any large chunks (especially code blocks)
  const finalChunks: string[] = [];
  for (const doc of mdDocs) {
    if (doc.length > 1500) { // If chunk is too large
      finalChunks.push(...await codeSplitter.splitText(doc));
    } else {
      finalChunks.push(doc);
    }
  }

  return finalChunks.filter(chunk => chunk.length > 10);
};

const generateEmbeddings = async (
  value: string,
): Promise<Array<{ embedding: number[]; content: string }>> => {
  const chunks = await generateChunks(value);
  const { embeddings } = await embedMany({
    model: embeddingModel,
    values: chunks,
  });
  return embeddings.map((e, i) => ({ content: chunks[i], embedding: e }));
};

async function processMarkdownFile(filePath: string) {
  try {
    console.log(`Processing ${filePath}`);
    // Read the markdown file
    const content = await readFile(filePath, 'utf-8');

    // Get the repository URL from repositories.yml based on the filename
    const repositories = await loadRepositories();
    const fileName = filePath.split('/').pop() || '';
    const repo = repositories.find(r => r.filename === fileName);

    if (!repo) {
      console.warn(`Could not find repository URL for ${fileName}`);
    }

    // First create a resource entry for the file
    const [resource] = await db.insert(resources).values({
      url: repo?.url || filePath, // Use repo URL if found, fallback to filePath
      title: repo?.title || fileName.replace(/\.[^/.]+$/, ''), // Use repo title if found, fallback to filename without extension
      content: content
    }).returning();
    
    // Generate embeddings for the content
    const contentEmbeddings = await generateEmbeddings(content);
    
    // Create a progress bar
    const progressBar = new cliProgress.SingleBar({
      format: 'Processing chunks |{bar}| {percentage}% | {value}/{total} Chunks',
      barCompleteChar: '\u2588',
      barIncompleteChar: '\u2591',
    });
    
    // Start the progress bar
    progressBar.start(contentEmbeddings.length, 0);
    
    // Store embeddings in the database
    for (let i = 0; i < contentEmbeddings.length; i++) {
      const { embedding, content } = contentEmbeddings[i];
      await db.insert(embeddings).values({
        embedding,
        content,
        resourceId: resource.id
      });
      progressBar.update(i + 1);
    }
    
    // Stop the progress bar
    progressBar.stop();
    console.log(`Successfully processed ${filePath}`);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

async function processMarkdownDirectory(directoryPath: string) {
  try {
    // Read all files in the directory
    const files = await readdir(directoryPath);
    
    // Filter for markdown files
    const markdownFiles = files.filter(file => 
      file.endsWith('.md') || file.endsWith('.markdown')
    );
    
    console.log(`Found ${markdownFiles.length} markdown files`);
    
    // Process each markdown file
    for (const file of markdownFiles) {
      const filePath = join(directoryPath, file);
      await processMarkdownFile(filePath);
    }
    
    console.log('Finished processing all markdown files');
  } catch (error) {
    console.error('Error processing directory:', error);
  }
}

async function main() {
  const argv = yargs(hideBin(process.argv))
    .option('generate', {
      alias: 'g',
      type: 'boolean',
      description: 'Generate markdown files from repositories'
    })
    .option('ingest', {
      alias: 'i',
      type: 'boolean',
      description: 'Ingest markdown files into the database'
    })
    .option('clear', {
      alias: 'c',
      type: 'boolean',
      default: true,
      description: 'Clear existing data before ingestion'
    })
    .check((argv) => {
      if (!argv.generate && !argv.ingest) {
        throw new Error('At least one operation (--generate or --ingest) must be specified');
      }
      return true;
    })
    .help()
    .parseSync();

  // Clear existing data if specified and we're ingesting
  if (argv.clear && argv.ingest) {
    console.log('Clearing existing data...');
    await db.delete(embeddings);
    await db.delete(resources);
  }

  // Generate markdown files if specified
  if (argv.generate) {
    console.log('Generating markdown files...');
    await generateMarkdownFiles();
  }

  // Ingest markdown files if specified
  if (argv.ingest) {
    console.log('Ingesting markdown files...');
    const markdownDir = './resources';
    await processMarkdownDirectory(markdownDir);
  }

  console.log('Operations completed successfully');
  process.exit(0);
}

main().catch(console.error);