import { join } from 'path';
import { writeFile, mkdir, readFile, rename } from 'fs/promises';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// Array of GitHub repository URLs to process
const repositories = [
  'https://github.com/stanfordspezi/speziaccount',
  'https://github.com/stanfordspezi/spezifirebase',
  'https://github.com/stanfordspezi/spezionboarding',
  'https://github.com/stanfordspezi/spezischeduler',
  'https://github.com/stanfordspezi/spezistorage',
  'https://github.com/stanfordspezi/speziviews',
  'https://github.com/stanfordspezi/spezillm',
  'https://github.com/stanfordspezi/spezihealthkit',
  'https://github.com/stanfordspezi/spezitemplateapplication'
  // Add more repositories as needed
];

async function generateMarkdownFiles() {
  try {
    // Create resources directory if it doesn't exist
    await mkdir('./resources', { recursive: true });

    for (const repoUrl of repositories) {
      console.log(`Processing repository: ${repoUrl}`);
      
      try {
        // Generate markdown content using repomix CLI
        await execAsync(`repomix --remote ${repoUrl} --ignore "*.license" --no-file-summary --compress`);
        
        // Read the generated output file
        const content = await readFile('repomix-output.txt', 'utf-8');
        
        // Create a filename from the repository URL
        const repoName = repoUrl.split('/').pop() || 'repo';
        const fileName = `${repoName}.md`;
        const filePath = join('./resources', fileName);
        
        // Write the markdown content to a file
        await writeFile(filePath, content, 'utf-8');
        console.log(`Successfully generated markdown for ${repoUrl} at ${filePath}`);
      } catch (error) {
        console.error(`Error processing repository ${repoUrl}:`, error);
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

async function main() {
  await generateMarkdownFiles();
  process.exit(0);
}

main().catch(console.error); 