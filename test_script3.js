import fs from "fs";

const html = fs.readFileSync("D:/_PROJECTS/My/ai/Ashtanga_Wiki/quartz-web/public/index.html", "utf8");
const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
let match;
let i = 1;
while ((match = scriptRegex.exec(html)) !== null) {
  const content = match[1].trim();
  if (i === 3) {
    console.log("=== Full Script 3 ===");
    console.log(content);
    console.log("=== End Script 3 ===");
  }
  if (i === 6) {
    console.log("=== Full Script 6 (Fold) ===");
    console.log(content);
    console.log("=== End Script 6 ===");
  }
  if (i === 4) {
    console.log("=== Full Script 4 ===");
    console.log(content);
    console.log("=== End Script 4 ===");
  }
  i++;
}
