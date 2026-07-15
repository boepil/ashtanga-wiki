import os
import re

def cleanup_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split frontmatter and body
    parts = content.split('---', 2)
    if len(parts) < 3:
        return # Not a standard frontmatter file

    frontmatter = parts[1]
    body = parts[2]

    # Remove redundant H1 at the top of the body
    # Standard Quartz/Obsidian H1 is "# Title"
    body_lines = body.strip().split('\n')
    if body_lines and body_lines[0].startswith('# '):
        body_lines.pop(0)
    
    # Re-strip
    body = '\n'.join(body_lines).strip()
    
    # Check if an infographic is at the top
    # Match Obsidian ![[...]] or Markdown ![]()
    body_lines = body.split('\n')
    image_regex = r'^!\[\[.*?\]\]|^!\[.*?\]\(.*?\)'
    
    if body_lines and re.match(image_regex, body_lines[0]):
        image_line = body_lines.pop(0)
        # Find first paragraph
        paragraph = ""
        other_lines = []
        found_paragraph = False
        
        for line in body_lines:
            if not found_paragraph and line.strip() and not line.startswith('#'):
                paragraph = line
                found_paragraph = True
            else:
                other_lines.append(line)
        
        if found_paragraph:
            # Reconstruct: Paragraph -> Image -> Rest
            new_body = paragraph + "\n\n" + image_line + "\n\n" + "\n".join(other_lines)
            body = new_body.strip()

    new_content = f"---{frontmatter}--- \n\n{body}\n"
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

def main():
    wiki_dir = 'wiki'
    for root, dirs, files in os.walk(wiki_dir):
        for file in files:
            if file.endswith('.md') and file != 'index.md':
                filepath = os.path.join(root, file)
                print(f"Cleaning {filepath}...")
                cleanup_file(filepath)

if __name__ == "__main__":
    main()
