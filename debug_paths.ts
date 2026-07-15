import fs from "fs";
import path from "path";

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

const allFiles = getAllFiles(CONTENT_DIR);
console.log("Sample files in CONTENT_DIR:");
allFiles.slice(0, 10).forEach(f => {
  const rel = path.relative(CONTENT_DIR, f).replace(/\\/g, "/").replace(/\.md$/, "");
  console.log(`Full: ${f} -> Rel: ${rel}`);
});
