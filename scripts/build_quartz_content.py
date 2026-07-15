import os
import shutil
import re

src_dir = r"d:\_PROJECTS\My\ai\Ashtanga_Wiki\wiki"
dst_dir = r"d:\_PROJECTS\My\ai\Ashtanga_Wiki\quartz-web\content"

# Clean dest
if os.path.exists(dst_dir):
    shutil.rmtree(dst_dir)
os.makedirs(dst_dir)

def process_markdown(content, filepath):
    frontmatter = ""
    body = content
    if content.startswith('---'):
        parts = content.split('---', 2)
        # parts[0] is empty string if it starts with ---
        if len(parts) >= 3 and parts[0].strip() == '':
            frontmatter = parts[1]
            body = parts[2]

    # Determine page type
    page_type_class = "is-asana" # default
    if "type: concept" in frontmatter and "bridge" in frontmatter:
        page_type_class = "is-bridge"
    elif "type: concept" in frontmatter:
        page_type_class = "is-bridge"
    elif "type: compensation" in frontmatter:
        page_type_class = "is-compensation"
    elif "type: rehabilitation" in frontmatter:
        page_type_class = "is-rehabilitation"

    # Inject sequence
    basename = os.path.splitext(os.path.basename(filepath))[0]
    seq = sequence_map.get(basename, 9999)
    if frontmatter:
        frontmatter = re.sub(r'\n\s*sequence:\s*\d+', '', frontmatter)
        frontmatter = frontmatter.rstrip() + f"\nsequence: {seq}\n"
    else:
        frontmatter = f"\nsequence: {seq}\n"
    if "type: concept" in frontmatter and "bridge" in frontmatter:
        page_type_class = "is-bridge"
    elif "type: concept" in frontmatter:
        page_type_class = "is-bridge"
    elif "type: compensation" in frontmatter:
        page_type_class = "is-compensation"
    elif "type: rehabilitation" in frontmatter:
        page_type_class = "is-rehabilitation"

    # Replace citations
    # Match *(text)* optionally followed by — text
    def cit_repl(m):
        inner = m.group(1)
        suffix = m.group(2) if m.group(2) else ""
        return f'<div class="citation-block">({inner}) {suffix}</div>'
    
    body = re.sub(r'\*\((.*?)\)\*(?:\s*—\s*([^*\n]+))?', cit_repl, body)
    
    # Wrap controversy flag
    body = body.replace('**CONTROVERSIAL CLAIM — cite both sides:**', '<div class="controversy-flag"><strong>CHALLENGES MAINSTREAM TEACHING</strong>')
    # This is a bit hacky but we'll close the div before the next section
    body = re.sub(r'(<div class="controversy-flag">.*?)(?=\n### |\n## )', r'\1\n</div>\n', body, flags=re.DOTALL)

    # Reconstruct
    if frontmatter:
        new_content = f"---{frontmatter}---\n<div class=\"page-wrapper {page_type_class}\">\n\n{body}\n\n</div>"
    else:
        new_content = f"<div class=\"page-wrapper {page_type_class}\">\n\n{body}\n\n</div>"
        
    return new_content

# Create a map of basename -> filepath for DFS
basename_to_filepath = {}
for root, dirs, files in os.walk(src_dir):
    for file in files:
        if file.endswith('.md'):
            basename = os.path.splitext(file)[0]
            basename_to_filepath[basename] = os.path.join(root, file)

sequence_map = {}
visited = set()
current_seq = 1

toc_pages = {
    'index'
}

def dfs(basename):
    global current_seq
    if basename in visited:
        return
    visited.add(basename)
    sequence_map[basename] = current_seq
    current_seq += 1
    
    # Only follow links if this page is a Table of Contents (TOC) page
    if basename not in toc_pages:
        return

    filepath = basename_to_filepath.get(basename)
    if filepath:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            # Only match links in the body, not frontmatter
            body = content.split('---', 2)[-1] if content.startswith('---') else content
            links = re.findall(r'\[\[(.*?)\]\]', body)
            for link in links:
                target = link.split('|')[0].strip()
                target = target.split('#')[0].strip()
                target = os.path.basename(target)
                dfs(target)

# Start DFS from index
dfs('index')

# Assign sequence 9999 to any remaining files
for basename in basename_to_filepath:
    if basename not in visited:
        sequence_map[basename] = 9999

for root, dirs, files in os.walk(src_dir):
    rel_path = os.path.relpath(root, src_dir)
    dst_root = os.path.join(dst_dir, rel_path)
    if not os.path.exists(dst_root):
        os.makedirs(dst_root)
    
    for file in files:
        src_path = os.path.join(root, file)
        dst_path = os.path.join(dst_root, file)
        if file.endswith('.md'):
            with open(src_path, 'r', encoding='utf-8') as f:
                content = f.read()
            new_content = process_markdown(content, src_path)
            with open(dst_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
        else:
            shutil.copy2(src_path, dst_path)

# Generate Asana Dictionary Index
asana_dir = os.path.join(dst_dir, 'Asana_Dictionary')
if os.path.exists(asana_dir):
    asana_files = [f for f in os.listdir(asana_dir) if f.endswith('.md') and f != 'index.md']
    asana_files.sort()
    asana_index_path = os.path.join(asana_dir, 'index.md')
    with open(asana_index_path, 'w', encoding='utf-8') as f:
        f.write("---\ntitle: Asana Dictionary\nsequence: 9998\n---\n# Asana Dictionary\n\n")
        for file in asana_files:
            name = os.path.splitext(file)[0]
            f.write(f"- [[{name}]]\n")

print("Content copied and transformed successfully.")
