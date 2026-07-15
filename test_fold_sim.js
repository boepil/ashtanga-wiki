import fs from "fs";
import { JSDOM } from "jsdom";

// Check if jsdom is available or use basic HTML parsing
const html = fs.readFileSync("D:/_PROJECTS/My/ai/Ashtanga_Wiki/quartz-web/public/index.html", "utf8");

// Extract the fold script content
const script6 = `(()=>{let i=typeof window.addCleanup=="function"?window.addCleanup:l=>l();document.addEventListener("nav",()=>{try{let l=document.querySelector("article.popover-hint");if(!l)return;let a=Array.from(l.children),n=null,t=null;for(let r=0;r<a.length;r++){let e=a[r],s=e.tagName;if(s.startsWith("H")&&/^[1-6]$/.test(s.substring(1))){let c=parseInt(s.substring(1));n&&c<=n.level&&(n=null,t=null),n={element:e,level:c},t=document.createElement("div"),t.className="fold-content",e.after(t),e.classList.add("fold-heading");let o=d=>{d.target.closest("a[role=anchor]")||(e.classList.toggle("is-collapsed"),t.classList.toggle("is-collapsed"))};e.addEventListener("click",o),i(()=>e.removeEventListener("click",o))}else t&&t.appendChild(e)}}catch(l){console.debug("Fold plugin error:",l)}})})();`;

// Simple test: Run the fold script in a minimal DOM simulation
// First, extract just the article content
const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/);
if (articleMatch) {
  const articleContent = articleMatch[1];
  console.log("=== ARTICLE CHILDREN (tag names) ===");
  const childRegex = /<(\w+)[^>]*>/g;
  let childMatch;
  const tags = [];
  while ((childMatch = childRegex.exec(articleContent)) !== null) {
    tags.push(childMatch[1]);
  }
  console.log(tags);
}

// Print article children structure
console.log("\n=== ARTICLE EXCERPT ===");
const articleStart = html.indexOf('<article class="popover-hint">');
const articleEnd = html.indexOf('</article>', articleStart);
console.log(html.substring(articleStart, articleStart + 2000));

// Check if h2 headings have any wrapper elements around them
console.log("\n=== PHRASES BETWEEN <article> and <h2> ===");
const afterArticle = html.substring(articleStart + '<article class="popover-hint">'.length, articleEnd);
const h2Regex = /<h2[^>]*>[\s\S]*?<\/h2>/g;
console.log("H2s found:", afterArticle.match(h2Regex)?.length || 0);

// Now let's simulate the exact fold script logic on the HTML string
// by finding all <h2> tags and all <h3> tags and the content between them
console.log("\n=== STRUCTURAL ANALYSIS ===");
const sectionRegex = /(<\/?h[1-6][^>]*>)/g;
const sections = afterArticle.split(sectionRegex);
console.log("Number of structural pieces:", sections.length);
for (let i = 0; i < Math.min(sections.length, 30); i++) {
  if (!sections[i].trim()) continue;
  if (sections[i].startsWith('<h')) {
    console.log(`[${i}] HEADING: ${sections[i].substring(0, 80)}`);
  }
}
