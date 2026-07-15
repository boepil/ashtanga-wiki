import fs from "fs";

const html = fs.readFileSync("D:/_PROJECTS/My/ai/Ashtanga_Wiki/quartz-web/public/index.html", "utf8");
const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
let match;
let i = 1;
while ((match = scriptRegex.exec(html)) !== null) {
  const tagAttr = match[0].match(/<script\b[^>]*>/i)?.[0] || "";
  const content = match[1].trim();
  console.log(`Script ${i}: ${tagAttr}`);
  if (content.length > 0) {
    console.log(`  Content length: ${content.length}`);
    console.log(`  Snippet: ${content.substring(0, 100)}...`);
  }
  i++;
}
