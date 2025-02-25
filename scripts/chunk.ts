import { RecursiveCharacterTextSplitter, MarkdownTextSplitter } from 'langchain/text_splitter';
import { Document } from 'langchain/document';

/**
 * Generate chunks from repository content using LangChain splitters
 * with specific optimizations for Swift code repositories
 */
export const generateChunks = async (input: string): Promise<string[]> => {
    console.log('\n=== Starting Chunk Generation ===');
    console.log(`Total input length: ${input.length} characters`);
    console.log('Analyzing input structure...');

    // First identify and separate the directory structure
    const dirStructureSeparator = "================================================================\nFiles\n================================================================";
    const dirStructureEndIndex = input.indexOf(dirStructureSeparator);
    
    let directoryStructure = "";
    let fileContent = input;
    
    if (dirStructureEndIndex !== -1) {
        console.log('Found directory structure section');
        directoryStructure = input.substring(0, dirStructureEndIndex + dirStructureSeparator.length);
        fileContent = input.substring(dirStructureEndIndex + dirStructureSeparator.length);
        console.log(`Directory structure length: ${directoryStructure.length}`);
        console.log(`Remaining content length: ${fileContent.length}`);
    } else {
        console.log('No directory structure section found');
    }

    console.log('\n=== Creating File Documents ===');
    // Create documents from file sections
    const fileDocuments = await splitIntoFileDocuments(fileContent);
    console.log(`Created ${fileDocuments.length} file documents`);
    
    // Add directory structure as a separate document if it exists
    if (directoryStructure) {
        console.log('Adding directory structure as separate document');
        fileDocuments.unshift(new Document({
            pageContent: directoryStructure,
            metadata: { type: 'directory_structure' }
        }));
    }
    
    console.log('\n=== Processing Individual Files ===');
    // Process each file document
    const chunkedDocuments: Document[] = [];
    let processedFiles = 0;
    
    for (const doc of fileDocuments) {
        processedFiles++;
        console.log(`\nProcessing document ${processedFiles}/${fileDocuments.length}`);
        console.log(`Document content length: ${doc.pageContent.length}`);
        
        const filename = doc.metadata.filename || "unknown";
        const fileType = detectFileType(filename);
        console.log(`File: ${filename}`);
        console.log(`Detected type: ${fileType}`);
        
        const chunks = await chunkByFileType(doc.pageContent, fileType, doc.metadata);
        console.log(`Generated ${chunks.length} chunks for this file`);
        chunkedDocuments.push(...chunks);
    }
    
    console.log('\n=== Chunk Generation Complete ===');
    console.log(`Total documents processed: ${fileDocuments.length}`);
    console.log(`Total chunks generated: ${chunkedDocuments.length}`);
    
    // Return the page content of all documents
    const finalChunks = chunkedDocuments.map(doc => doc.pageContent);
    console.log(`Final chunk count: ${finalChunks.length}`);
    console.log('=== End of Chunk Generation ===\n');
    
    return finalChunks;
};

/**
 * Split repository content into separate file documents
 */
async function splitIntoFileDocuments(content: string): Promise<Document[]> {
    console.log('\n--- Starting File Document Split ---');
    console.log(`Content length: ${content.length}`);
    
    const fileRegex = /^={2,}\nFile: (.+?)\n={2,}\n/gm;
    const documents: Document[] = [];
    
    let match;
    let lastIndex = 0;
    let fileCount = 0;
    
    console.log('Searching for file markers...');
    
    while ((match = fileRegex.exec(content)) !== null) {
        fileCount++;
        const filename = match[1];
        const startIndex = match.index;
        const headerLength = match[0].length;  // Get the full length of the header
        
        console.log(`\nFound file ${fileCount}: ${filename}`);
        console.log(`File marker at index: ${startIndex}`);
        console.log(`Header length: ${headerLength}`);
        
        // If this isn't the first match, extract the previous file
        if (startIndex > lastIndex) {
            const fileContent = content.substring(lastIndex, startIndex);
            console.log(`Extracting content of length: ${fileContent.length}`);
            
            if (fileContent.trim().length > 0) {  // Only add if there's actual content
                documents.push(new Document({
                    pageContent: fileContent,
                    metadata: { 
                        filename: filename,
                        type: 'file' 
                    }
                }));
                console.log(`Added document for: ${filename}`);
            } else {
                console.log('Skipping empty content');
            }
        }
        
        lastIndex = startIndex + headerLength;  // Advance past the header
        console.log(`New lastIndex: ${lastIndex}`);
    }
    
    // Add the last file
    if (lastIndex < content.length) {
        const fileContent = content.substring(lastIndex);
        console.log('\nProcessing final file section');
        console.log(`Remaining content length: ${fileContent.length}`);
        
        // Extract filename from the last file header
        const filenameMatch = fileContent.match(/^={2,}\nFile: (.+?)\n={2,}\n/);
        const filename = filenameMatch ? filenameMatch[1] : "unknown";
        
        if (fileContent.trim().length > 0) {  // Only add if there's actual content
            documents.push(new Document({
                pageContent: fileContent,
                metadata: { 
                    filename: filename,
                    type: 'file' 
                }
            }));
            console.log(`Added final document for: ${filename}`);
        } else {
            console.log('Skipping empty final content');
        }
    }
    
    console.log('\n--- File Document Split Complete ---');
    console.log(`Total documents created: ${documents.length}`);
    
    return documents;
}

/**
 * Detect the type of file based on extension
 */
function detectFileType(filename: string): string {
  if (filename.endsWith('.swift')) {
    return 'swift';
  } else if (filename.endsWith('.yml') || filename.endsWith('.yaml')) {
    return 'yaml';
  } else if (filename.endsWith('.md') || filename.endsWith('.markdown')) {
    return 'markdown';
  } else if (filename.endsWith('.json')) {
    return 'json';
  } else if (filename.endsWith('.plist')) {
    return 'plist';
  } else {
    return 'unknown';
  }
}

/**
 * Apply different chunking strategies based on file type
 */
async function chunkByFileType(
  content: string, 
  fileType: string,
  metadata: Record<string, any>
): Promise<Document[]> {
  // Keep track of file header to include with each chunk
  const headerMatch = content.match(/^={2,}\nFile: (.+?)\n={2,}\n/);
  const fileHeader = headerMatch ? headerMatch[0] : "";
  
  let documents: Document[] = [];
  
  switch (fileType) {
    case 'swift':
      documents = await chunkSwiftCode(content, fileHeader, metadata);
      break;
    case 'yaml':
      documents = await chunkYamlFile(content, fileHeader, metadata);
      break;
    case 'markdown':
      documents = await chunkMarkdownFile(content, fileHeader, metadata);
      break;
    case 'json':
    case 'plist':
      documents = await chunkConfigFile(content, fileHeader, metadata);
      break;
    default:
      documents = await chunkGenericFile(content, fileHeader, metadata);
      break;
  }
  
  return documents;
}

/**
 * Chunk Swift code files using specialized Swift-aware separators
 */
async function chunkSwiftCode(
  content: string, 
  fileHeader: string,
  metadata: Record<string, any>
): Promise<Document[]> {
  // Extract the content without the header
  const fileContent = fileHeader ? content.substring(fileHeader.length) : content;
  
  // Create Swift-specific splitter
  const swiftSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1500,
    chunkOverlap: 200,
    separators: [
      // First try to split on Swift declarations
      "\n\nclass ", "\n\nstruct ", "\n\nenum ", "\n\nprotocol ", 
      "\n\nextension ", "\n\nfunc ", "\n\nvar ", "\n\nlet ",
      // Then try Swift visibility modifiers
      "\n\npublic ", "\n\nprivate ", "\n\ninternal ", "\n\nfileprivate ", "\n\nopen ",
      // Next try comments and general Swift constructs
      "\n\n//", "\n\n/*", "\n\nimport ", "\n\n@",
      // Fall back to normal paragraph and sentence splitting
      "\n\n", "\n", ". ", "? ", "! ",
      // Last resort
      " ", ""
    ],
    keepSeparator: true,
  });
  
  // First extract the imports and header comments
  const importsEndRegex = /^(?:import|\/\/|\/\*|@).*?$/m;
  const match = fileContent.match(importsEndRegex);
  
  let headerSection = "";
  let codeSection = fileContent;
  
  if (match) {
    const headerEndIndex = fileContent.indexOf('\n\n', match.index);
    if (headerEndIndex !== -1) {
      headerSection = fileContent.substring(0, headerEndIndex);
      codeSection = fileContent.substring(headerEndIndex);
    }
  }
  
  const documents: Document[] = [];
  
  // Add header section as its own chunk if it exists
  if (headerSection) {
    documents.push(new Document({
      pageContent: `${fileHeader}${headerSection}`,
      metadata: {
        ...metadata,
        section: 'header'
      }
    }));
  }
  
  // Chunk the main code section
  const chunks = await swiftSplitter.createDocuments([codeSection]);
  
  // Add file header to each chunk and update metadata
  return [
    ...documents,
    ...chunks.map(chunk => new Document({
      pageContent: `${fileHeader}${chunk.pageContent}`,
      metadata: {
        ...metadata,
        section: 'code'
      }
    }))
  ];
}

/**
 * Chunk YAML files by maintaining top-level structures
 */
async function chunkYamlFile(
  content: string, 
  fileHeader: string,
  metadata: Record<string, any>
): Promise<Document[]> {
  // Extract content without header
  const fileContent = fileHeader ? content.substring(fileHeader.length) : content;
  
  // Create YAML-aware splitter
  const yamlSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1500,
    chunkOverlap: 200,
    separators: [
      // Try to split on top-level YAML keys
      "\n\n", "\n- ", "\n  - ", 
      // Last resort
      "\n", " ", ""
    ],
    keepSeparator: true,
  });
  
  const chunks = await yamlSplitter.createDocuments([fileContent]);
  
  // Add file header to each chunk
  return chunks.map(chunk => new Document({
    pageContent: `${fileHeader}${chunk.pageContent}`,
    metadata
  }));
}

/**
 * Chunk Markdown files by headings
 */
async function chunkMarkdownFile(
  content: string, 
  fileHeader: string,
  metadata: Record<string, any>
): Promise<Document[]> {
  console.log('\nProcessing Markdown file...');
  console.log(`Content length: ${content.length}`);
  
  // Use LangChain's dedicated markdown splitter
  const markdownSplitter = new MarkdownTextSplitter({
    chunkSize: 1500,
    chunkOverlap: 200,
  });
  
  console.log('Splitting markdown content...');
  const chunks = await markdownSplitter.createDocuments([content]);
  
  console.log(`Generated ${chunks.length} chunks`);
  
  // Add file header to each chunk
  return chunks.map(chunk => {
    console.log(`Processing chunk of length: ${chunk.pageContent.length}`);
    return new Document({
      pageContent: `${fileHeader}${chunk.pageContent}`,
      metadata
    });
  });
}

/**
 * Chunk configuration files like JSON and plist
 */
async function chunkConfigFile(
  content: string, 
  fileHeader: string,
  metadata: Record<string, any>
): Promise<Document[]> {
  // For config files, we need to be careful about breaking JSON structure
  const fileContent = fileHeader ? content.substring(fileHeader.length) : content;
  
  // If the file is small enough, keep it as a single chunk
  if (fileContent.length <= 1500) {
    return [new Document({
      pageContent: content,
      metadata
    })];
  }
  
  // Create a splitter with conservative chunk size
  const configSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 300,
    separators: [
      // Try to split on structural elements
      "\n  },\n", "\n  ],\n", "\n},\n", "\n],\n",
      // More aggressive splits
      "\n  },", "\n  ],", "\n},", "\n],",
      // Last resort
      "\n", " ", ""
    ],
    keepSeparator: true,
  });
  
  const chunks = await configSplitter.createDocuments([fileContent]);
  
  // Add file header to each chunk
  return chunks.map(chunk => new Document({
    pageContent: `${fileHeader}${chunk.pageContent}`,
    metadata
  }));
}

/**
 * Default chunking for unknown file types
 */
async function chunkGenericFile(
  content: string, 
  fileHeader: string,
  metadata: Record<string, any>
): Promise<Document[]> {
  const fileContent = fileHeader ? content.substring(fileHeader.length) : content;
  
  // Use standard text splitter with reasonable defaults
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1500,
    chunkOverlap: 200,
    separators: ["\n\n", "\n", ". ", " ", ""],
    keepSeparator: true,
  });
  
  const chunks = await splitter.createDocuments([fileContent]);
  
  // Add file header to each chunk
  return chunks.map(chunk => new Document({
    pageContent: `${fileHeader}${chunk.pageContent}`,
    metadata
  }));
}