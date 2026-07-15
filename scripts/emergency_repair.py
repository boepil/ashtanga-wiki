import os
import re

def repair_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    if not lines:
        return

    # Case 1: Corrupted first line like "--- | :---"
    if '|' in lines[0] and lines[0].strip().startswith('---'):
        # Extract title from filename
        title = os.path.splitext(os.path.basename(filepath))[0].replace('_', ' ')
        # Reconstruct standard frontmatter
        new_header = f"---\ntitle: {title}\n---\n\n# {title}\n\n"
        # The rest of the file (skip the corrupted line)
        body = "".join(lines[1:])
        content = new_header + body.strip()
    else:
        # Case 2: Just missing H1 (the user's request)
        content = "".join(lines)
        if content.startswith('---'):
            parts = content.split('---', 2)
            if len(parts) >= 3:
                frontmatter = parts[1]
                body = parts[2].strip()
                
                # Get title
                title_match = re.search(r'title:\s*(.*)', frontmatter)
                if title_match:
                    title = title_match.group(1).strip().strip('"').strip("'")
                else:
                    title = os.path.splitext(os.path.basename(filepath))[0].replace('_', ' ')
                
                if not body.startswith('# '):
                    body = f"# {title}\n\n" + body
                
                content = f"---{frontmatter}--- \n\n{body}\n"
        else:
            # No frontmatter at all?
            title = os.path.splitext(os.path.basename(filepath))[0].replace('_', ' ')
            content = f"---\ntitle: {title}\n---\n\n# {title}\n\n" + content.strip()

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

def main():
    wiki_dir = 'wiki'
    for root, dirs, files in os.walk(wiki_dir):
        for file in files:
            if file.endswith('.md'):
                filepath = os.path.join(root, file)
                print(f"Repairing {filepath}...")
                repair_file(filepath)

if __name__ == "__main__":
    main()
