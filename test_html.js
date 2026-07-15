import fs from "fs";

const html = fs.readFileSync("D:/_PROJECTS/My/ai/Ashtanga_Wiki/quartz-web/public/index.html", "utf8");
console.log("Includes class=\"fold-heading\":", html.includes('class="fold-heading"'));
console.log("Includes class='fold-heading':", html.includes("class='fold-heading'"));
console.log("Includes fold-heading:", html.includes("fold-heading"));
console.log("Includes fold-content:", html.includes("fold-content"));
