import fs from "fs";
import path from "path";

const WIKI_INDEX = "D:\\_PROJECTS\\My\\ai\\Ashtanga_Wiki\\quartz-web\\content\\index.md";
const CONTENT_DIR = "D:\\_PROJECTS\\My\\ai\\Ashtanga_Wiki\\quartz-web\\content";

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(function(file) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

function run() {
  const indexContent = fs.readFileSync(WIKI_INDEX, "utf-8");
  const linkRegex = /\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g;
  const matches = [...indexContent.matchAll(linkRegex)];
  
  const orderedPages = []
  const seen = new Set()
  for (const match of matches) {
    const slug = match[1].trim()
    if (!seen.has(slug)) {
      orderedPages.push(slug)
      seen.add(slug)
    }
  }
  
  const allFiles = getAllFiles(CONTENT_DIR);
  
  orderedPages.forEach((slug, index) => {
    const seq = index + 1;
    
    const filePath = allFiles.find(f => {
      const rel = path.relative(CONTENT_DIR, f).replace(/\\/g, "/").replace(/\.md$/, "");
      return rel === slug || path.basename(rel) === slug;
    });
    
    if (filePath) {
      let content = fs.readFileSync(filePath, "utf-8");
      const seqRegex = /^sequence: \d+$/m;
      if (seqRegex.test(content)) {
        content = content.replace(seqRegex, `sequence: ${seq}`);
      } else {
        const firstTripleDash = content.indexOf("---");
        const secondTripleDash = content.indexOf("---", firstTripleDash + 3);
        if (firstTripleDash !== -1 && secondTripleDash !== -1) {
          const frontmatter = content.substring(firstTripleDash + 3, secondTripleDash);
          content = `---${frontmatter}\nsequence: ${seq}\n---${content.substring(secondTripleDash + 3)}`;
        }
      }
      fs.writeFileSync(filePath, content);
      console.log(`Assigned seq ${seq} to ${slug}`);
    } else {
      console.warn(`File not found for slug: ${slug}`);
    }
  });
}

run();
