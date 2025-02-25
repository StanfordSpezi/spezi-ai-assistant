export const generateChunks = async (input: string): Promise<string[]> => {
    console.log('Starting chunk generation...');
    console.log(`Input length: ${input.length} characters`);

    // Split the input into sections based on file boundaries
    const fileRegex = /^={2,}\nFile: (.+?)\n={2,}\n/gm;
    const fileSections = [];
    let lastMatch = null;
  
    // First extract the directory structure if present
    let directoryStructure = "";
    const dirStructureRegex = /^={2,}\nDirectory Structure\n={2,}\n([\s\S]+?)(?=\n={2,}\n|$)/;
    const dirMatch = input.match(dirStructureRegex);
    if (dirMatch) {
      console.log('Found directory structure section');
      directoryStructure = dirMatch[0];
      // We'll keep the directory structure as its own chunk for context
      fileSections.push(directoryStructure);
    }
  
    // Extract file sections, preserving the file headers
    console.log('Extracting file sections...');
    let match;
    let fileCount = 0;
    while ((match = fileRegex.exec(input)) !== null) {
      fileCount++;
      const start = match.index;
      const filePath = match[1];
      console.log(`Found file section: ${filePath}`);
      
      // If this isn't the first match, calculate the end of the previous section
      if (lastMatch) {
        const end = start;
        const fileContent = input.substring(lastMatch.index, end);
        fileSections.push(fileContent);
      }
      
      lastMatch = match;
    }
    console.log(`Found ${fileCount} file sections`);
    
    // Add the last file section (from the last match to the end)
    if (lastMatch) {
      fileSections.push(input.substring(lastMatch.index));
    } else if (fileSections.length === 0) {
      console.log('No file sections found, processing entire input as one section');
      fileSections.push(input);
    }
  
    // Process each file section
    console.log('Processing file sections into final chunks...');
    const finalChunks: string[] = [];
    for (const section of fileSections) {
      if (section.length <= 1500) {
        console.log(`Small section (${section.length} chars) kept as single chunk`);
        finalChunks.push(section);
        continue;
      }
  
      console.log(`Large section (${section.length} chars) being split...`);
      const chunks = splitFileContent(section);
      console.log(`Split into ${chunks.length} chunks`);
      finalChunks.push(...chunks);
    }
  
    const filteredChunks = finalChunks.filter(chunk => chunk.trim().length > 10);
    console.log(`Final chunk count: ${filteredChunks.length}`);
    return filteredChunks;
  };
  
  /**
   * Split a file content into logical chunks, preserving code structure
   */
  const splitFileContent = (fileContent: string): string[] => {
    console.log('\nSplitting file content...');
    
    // Extract the file header for inclusion in each chunk
    const headerMatch = fileContent.match(/^={2,}\nFile: (.+?)\n={2,}\n/);
    const fileHeader = headerMatch ? headerMatch[0] : "";
    const filePath = headerMatch ? headerMatch[1] : "";
    
    if (filePath) {
        console.log(`Processing file: ${filePath}`);
    }
    
    // Remove the header from the content for processing
    let content = headerMatch 
      ? fileContent.substring(headerMatch[0].length) 
      : fileContent;
    
    const chunks: string[] = [];
    
    // Handle each file type according to its extension
    if (filePath.endsWith('.swift')) {
      console.log('Processing as Swift file');
      chunks.push(...splitSwiftCode(fileHeader, content));
    } else if (filePath.endsWith('.yml') || filePath.endsWith('.yaml')) {
      console.log('Processing as YAML file');
      chunks.push(...splitYamlFile(fileHeader, content));
    } else if (filePath.endsWith('.md') || filePath.endsWith('.markdown')) {
      console.log('Processing as Markdown file');
      chunks.push(...splitMarkdownFile(fileHeader, content));
    } else if (filePath.endsWith('.json') || filePath.endsWith('.plist')) {
      console.log('Processing as config file');
      chunks.push(...splitConfigFile(fileHeader, content));
    } else {
      console.log('Processing with default chunking');
      chunks.push(...splitBySize(fileHeader, content));
    }
    
    console.log(`Generated ${chunks.length} chunks for ${filePath || 'content'}`);
    return chunks;
  };
  
  /**
   * Split Swift code by declarations (struct, class, extension, function, etc.)
   */
  const splitSwiftCode = (fileHeader: string, content: string): string[] => {
    console.log('\nProcessing Swift code...');
    const chunks: string[] = [];
    let currentChunk = "";
    
    // Capture imports and header comments first
    const headerEndRegex = /^(?:\/\/|import\s+|@_)/gm;
    let lastHeaderMatch = null;
    let match;
    
    while ((match = headerEndRegex.exec(content)) !== null) {
        lastHeaderMatch = match;
    }
    
    let headerEnd = 0;
    if (lastHeaderMatch) {
        headerEnd = content.indexOf('\n', lastHeaderMatch.index);
        if (headerEnd === -1) headerEnd = content.length;
        else headerEnd += 1;
        
        const headerSection = content.substring(0, headerEnd).trim();
        if (headerSection.length > 0) {
            console.log('Adding header section');
            chunks.push(`${fileHeader}// File header\n${headerSection}`);
        }
    }
    
    // Process declarations
    const swiftDeclRegex = /^(?:public\s+|private\s+|fileprivate\s+|internal\s+|open\s+)?(?:struct|class|enum|protocol|extension|func|var|let)\s+\w+/gm;
    let lastIndex = headerEnd;
    
    while ((match = swiftDeclRegex.exec(content)) !== null) {
        console.log(`Found Swift declaration at index ${match.index}`);
        const start = match.index;
        
        if (start > lastIndex) {
            const interstitial = content.substring(lastIndex, start).trim();
            if (interstitial.length > 0) {
                if (currentChunk.length + interstitial.length > 1500 && currentChunk.length > 0) {
                    chunks.push(`${fileHeader}${currentChunk}`);
                    currentChunk = interstitial + "\n";
                } else {
                    currentChunk += (currentChunk ? "\n" : "") + interstitial + "\n";
                }
            }
        }
        
        // Find the next declaration to determine the end of this one
        const nextRegex = new RegExp(swiftDeclRegex);
        nextRegex.lastIndex = swiftDeclRegex.lastIndex;
        const nextMatch = nextRegex.exec(content);
        const end = nextMatch ? nextMatch.index : content.length;
        
        const declaration = content.substring(start, end).trim();
        console.log(`Processing declaration of length ${declaration.length}`);
        
        if (currentChunk.length + declaration.length > 1500 && currentChunk.length > 0) {
            chunks.push(`${fileHeader}${currentChunk}`);
            currentChunk = declaration;
        } else {
            currentChunk += (currentChunk ? "\n" : "") + declaration;
        }
        
        lastIndex = end;
    }
    
    if (currentChunk.length > 0) {
        chunks.push(`${fileHeader}${currentChunk}`);
    }
    
    console.log(`Swift processing complete. Generated ${chunks.length} chunks`);
    return chunks;
  };
  
  /**
   * Split YAML files while preserving section structure
   */
  const splitYamlFile = (fileHeader: string, content: string): string[] => {
    console.log('\nProcessing YAML file...');
    
    if (content.length <= 1500) {
        console.log('Content small enough for single chunk');
        return [`${fileHeader}${content}`];
    }
    
    const chunks: string[] = [];
    let currentChunk = "";
    const lines = content.split('\n');
    let currentIndent = 0;
    
    console.log(`Processing ${lines.length} lines`);
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const indent = line.search(/\S/);
        
        // New top-level section
        if (indent === 0 && line.trim().length > 0) {
            console.log(`Found top-level section: ${line.trim()}`);
            
            if (currentChunk.length > 0) {
                chunks.push(`${fileHeader}${currentChunk}`);
                currentChunk = "";
            }
            currentIndent = 0;
        }
        
        if (currentChunk.length + line.length + 1 > 1500 && currentChunk.length > 0) {
            console.log('Creating new chunk due to size limit');
            chunks.push(`${fileHeader}${currentChunk}`);
            currentChunk = line;
        } else {
            currentChunk += (currentChunk ? "\n" : "") + line;
        }
    }
    
    if (currentChunk.length > 0) {
        chunks.push(`${fileHeader}${currentChunk}`);
    }
    
    console.log(`YAML processing complete. Generated ${chunks.length} chunks`);
    return chunks;
  };
  
  /**
   * Split Markdown files by headers
   */
  const splitMarkdownFile = (fileHeader: string, content: string): string[] => {
    console.log('\nProcessing Markdown file...');
    
    if (content.length <= 1500) {
        console.log('Content small enough for single chunk');
        return [`${fileHeader}${content}`];
    }
    
    const chunks: string[] = [];
    let currentChunk = "";
    const lines = content.split('\n');
    
    console.log(`Processing ${lines.length} lines`);
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // New section if we find a header
        if (line.startsWith('#')) {
            console.log(`Found header: ${line.trim()}`);
            
            if (currentChunk.length > 0) {
                chunks.push(`${fileHeader}${currentChunk}`);
                currentChunk = "";
            }
        }
        
        if (currentChunk.length + line.length + 1 > 1500 && currentChunk.length > 0) {
            console.log('Creating new chunk due to size limit');
            chunks.push(`${fileHeader}${currentChunk}`);
            currentChunk = line;
        } else {
            currentChunk += (currentChunk ? "\n" : "") + line;
        }
    }
    
    if (currentChunk.length > 0) {
        chunks.push(`${fileHeader}${currentChunk}`);
    }
    
    console.log(`Markdown processing complete. Generated ${chunks.length} chunks`);
    return chunks;
  };
  
  /**
   * Split configuration files like JSON and plist
   */
  const splitConfigFile = (fileHeader: string, content: string): string[] => {
    console.log('\nProcessing config file...');
    
    if (content.length <= 1500) {
        console.log('Content small enough for single chunk');
        return [`${fileHeader}${content}`];
    }
    
    const chunks: string[] = [];
    let currentChunk = "";
    const lines = content.split('\n');
    
    console.log(`Processing ${lines.length} lines`);
    
    for (const line of lines) {
        if (currentChunk.length + line.length + 1 > 1500 && currentChunk.length > 0) {
            // Don't split in the middle of a JSON object/array
            const balanced = isBalanced(currentChunk);
            if (balanced) {
                console.log('Creating new chunk due to size limit');
                chunks.push(`${fileHeader}${currentChunk}`);
                currentChunk = line;
            } else {
                currentChunk += '\n' + line;
            }
        } else {
            currentChunk += (currentChunk ? "\n" : "") + line;
        }
    }
    
    if (currentChunk.length > 0) {
        chunks.push(`${fileHeader}${currentChunk}`);
    }
    
    console.log(`Config processing complete. Generated ${chunks.length} chunks`);
    return chunks;
  };
  
  /**
   * Check if a JSON-like string has balanced braces and brackets
   */
  const isBalanced = (content: string): boolean => {
    const stack = [];
    let inString = false;
    let escape = false;
    
    for (let i = 0; i < content.length; i++) {
      const char = content[i];
      
      if (escape) {
        escape = false;
        continue;
      }
      
      if (char === '\\') {
        escape = true;
        continue;
      }
      
      if (char === '"' && !inString) {
        inString = true;
      } else if (char === '"' && inString) {
        inString = false;
      } else if (!inString) {
        if (char === '{' || char === '[') {
          stack.push(char);
        } else if (char === '}') {
          if (stack.length === 0 || stack.pop() !== '{') {
            return false;
          }
        } else if (char === ']') {
          if (stack.length === 0 || stack.pop() !== '[') {
            return false;
          }
        }
      }
    }
    
    return stack.length === 0;
  };
  
  /**
   * Default chunking by size while trying to preserve line boundaries
   */
  const splitBySize = (fileHeader: string, content: string): string[] => {
    console.log('\nProcessing with default chunking...');
    
    if (content.length <= 1500) {
        console.log('Content small enough for single chunk');
        return [`${fileHeader}${content}`];
    }
    
    const chunks: string[] = [];
    let currentChunk = "";
    const lines = content.split('\n');
    
    console.log(`Processing ${lines.length} lines`);
    
    for (const line of lines) {
        if (currentChunk.length + line.length + 1 > 1500 && currentChunk.length > 0) {
            console.log('Creating new chunk due to size limit');
            chunks.push(`${fileHeader}${currentChunk}`);
            currentChunk = line;
        } else {
            currentChunk += (currentChunk ? "\n" : "") + line;
        }
    }
    
    if (currentChunk.length > 0) {
        chunks.push(`${fileHeader}${currentChunk}`);
    }
    
    console.log(`Default chunking complete. Generated ${chunks.length} chunks`);
    return chunks;
  };