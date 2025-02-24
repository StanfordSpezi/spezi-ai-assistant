import { readFile, readdir } from 'fs/promises';
import { join } from 'path';
import { openai } from '@ai-sdk/openai';
import { db } from '../lib/db';
import { embeddings, resources } from '../lib/db/schema';
import { embedMany } from 'ai';
import { MarkdownTextSplitter, RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

const embeddingModel = openai.embedding('text-embedding-ada-002');

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

    // First create a resource entry for the file
    const fileName = filePath.split('/').pop() || '';
    const [resource] = await db.insert(resources).values({
      url: filePath,
      title: fileName.replace(/\.[^/.]+$/, ''),
      content: content
    }).returning();
    
    // Generate embeddings for the content
    const contentEmbeddings = await generateEmbeddings(content);
    
    // Store embeddings in the database
    for (const { embedding, content } of contentEmbeddings) {
      await db.insert(embeddings).values({
        embedding,
        content,
        resourceId: resource.id
      });
    }
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
  const markdownDir = './resources';
  await processMarkdownDirectory(markdownDir);
  process.exit(0);
}

main().catch(console.error);