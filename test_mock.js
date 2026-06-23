class Element {
  constructor(tag) {
    this.tagName = tag.toUpperCase();
    this.classList = {
      classes: new Set(),
      add: (c) => this.classList.classes.add(c),
      toggle: (c) => {
        if (this.classList.classes.has(c)) this.classList.classes.delete(c);
        else this.classList.classes.add(c);
      }
    };
    this.children = [];
    this.parent = null;
    this.nextSibling = null;
  }
  appendChild(child) {
    if (child.parent) {
      child.parent.children = child.parent.children.filter(c => c !== child);
    }
    child.parent = this;
    this.children.push(child);
  }
  after(node) {
    if (!this.parent) return;
    const idx = this.parent.children.indexOf(this);
    if (node.parent) node.parent.children = node.parent.children.filter(c => c !== node);
    node.parent = this.parent;
    this.parent.children.splice(idx + 1, 0, node);
  }
}

const article = new Element("ARTICLE");
const h1 = new Element("H1"); h1.id = "h1";
const p1 = new Element("P"); p1.id = "p1";
const h2 = new Element("H2"); h2.id = "h2";
const p2 = new Element("P"); p2.id = "p2";

article.appendChild(h1);
article.appendChild(p1);
article.appendChild(h2);
article.appendChild(p2);

const children = [...article.children];
const stack = [];

for (let i = 0; i < children.length; i++) {
  const child = children[i];
  const tag = child.tagName;

  if (tag.startsWith("H") && /^[1-6]$/.test(tag.substring(1))) {
    const level = parseInt(tag.substring(1));
    while (stack.length > 0 && stack[stack.length - 1].level >= level) {
      stack.pop();
    }
    const currentWrapper = new Element("DIV");
    currentWrapper.id = "wrapper_" + tag;
    
    if (stack.length > 0) {
      stack[stack.length - 1].wrapper.appendChild(child);
      stack[stack.length - 1].wrapper.appendChild(currentWrapper);
    } else {
      child.after(currentWrapper);
    }
    child.addEventListener = (evt, fn) => {
      if (evt === 'click') child.onClick = fn;
    };
    child.classList.add("fold-heading");
    
    const toggle = (e) => {
      child.classList.toggle("is-collapsed");
      currentWrapper.classList.toggle("is-collapsed");
    };
    child.addEventListener("click", toggle);

    stack.push({ level, wrapper: currentWrapper });
  } else if (stack.length > 0) {
    stack[stack.length - 1].wrapper.appendChild(child);
  }
}

h1.onClick({ target: h1 });
console.log("H1 is collapsed: " + h1.classList.classes.has("is-collapsed"));
console.log("Wrapper H1 is collapsed: " + article.children[1].classList.classes.has("is-collapsed"));

h2.onClick({ target: h2 });
console.log("H2 is collapsed: " + h2.classList.classes.has("is-collapsed"));
console.log("Wrapper H2 is collapsed: " + article.children[1].children[2].classList.classes.has("is-collapsed"));

