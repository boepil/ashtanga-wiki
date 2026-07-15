import os
import re

def restore_h1(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split frontmatter and body
    parts = content.split('---', 2)
    if len(parts) < 3:
        # No frontmatter? Let's check if it just lacks the second ---
        if content.startswith('---'):
            # Try to find the second --- manually
            match = re.search(r'\n---\s*\n', content[3:])
            if match:
                fm_end = match.end() + 3
                frontmatter = content[3:fm_end-4]
                body = content[fm_end:]
            else:
                return # Can't fix easily
        else:
            return

    frontmatter = parts[1]
    body = parts[2].strip()

    # Get title from frontmatter
    title_match = re.search(r'title:\s*(.*)', frontmatter)
    if title_match:
        title = title_match.group(1).strip().strip('"').strip("'")
    else:
        # Fallback to filename
        title = os.path.splitext(os.path.basename(filepath))[0].replace('_', ' ')

    # Check if body already has this H1
    lines = body.split('\n')
    expected_h1 = f"# {title}"
    
    if not lines or not lines[0].startswith('# '):
        # Insert H1
        body = expected_h1 + "\n\n" + body
    elif lines[0].strip().lower() != expected_h1.lower():
        # If it has a different H1, we might want to replace it or just add ours
        # But the user wants "the H1 inside the content is the only title needed"
        # So we'll assume the one that's there is the one they want, or we standardize it.
        pass

    new_content = f"---{frontmatter}--- \n\n{body}\n"
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

def main():
    wiki_dir = 'wiki'
    for root, dirs, files in os.walk(wiki_dir):
        for file in files:
            if file.endswith('.md'):
                filepath = os.path.join(root, file)
                print(f"Restoring {filepath}...")
                restore_h1(filepath)

if __name__ == "__main__":
    main()
