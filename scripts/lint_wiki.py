import os
import re

WIKI_DIR = r"d:\_PROJECTS\My\ai\Ashtanga_Wiki\wiki"

all_files = {}
all_links = set()
inbound_links = {}
essay_seeds = []
bridge_pages = []

def get_word_count(text):
    return len(re.findall(r'\b\w+\b', text))

def parse_markdown_files():
    # 1. Gather all markdown files
    for root, dirs, files in os.walk(WIKI_DIR):
        for file in files:
            if file.endswith('.md'):
                rel_path = os.path.relpath(os.path.join(root, file), WIKI_DIR)
                basename = os.path.splitext(file)[0]
                all_files[basename] = rel_path
                inbound_links[basename] = 0

    # 2. Also include attachments in all_files so they aren't reported as broken links
    ATTACHMENTS_DIR = os.path.join(WIKI_DIR, "Attachments")
    if os.path.exists(ATTACHMENTS_DIR):
        for file in os.listdir(ATTACHMENTS_DIR):
            all_files[file] = os.path.join("Attachments", file)

    # 3. Scan markdown files for links and metadata
    for basename, rel_path in list(all_files.items()):
        # rel_path could be a string or a dict (if we already processed it, but here it's still strings)
        if not isinstance(rel_path, str) or not rel_path.endswith('.md'):
            continue
            
        full_path = os.path.join(WIKI_DIR, rel_path)
        with open(full_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
            # Step 1: Links
            links = re.findall(r'\[\[(.*?)\]\]', content)
            for link in links:
                # Handle Display Name and Sections (splitting by | or escaped \|)
                target = re.split(r'\\?\|', link)[0].split('#')[0].strip()
                if target in inbound_links:
                    inbound_links[target] += 1
                all_links.add((basename, target))
            
            # Metadata
            word_count = get_word_count(content)
            frontmatter_match = re.search(r'^---\n(.*?)\n---', content, re.DOTALL)
            frontmatter = frontmatter_match.group(1) if frontmatter_match else ""
            has_sources = 'sources:' in frontmatter.lower()
            
            if 'essay-seed' in frontmatter.lower():
                essay_seeds.append(basename)
            if 'bridge' in frontmatter.lower():
                bridge_pages.append(basename)
                
            all_files[basename] = {
                'path': rel_path,
                'word_count': word_count,
                'has_sources': has_sources
            }

def generate_report():
    print(f"## Lint Report")
    print(f"- Total pages: {len([f for f in all_files.values() if isinstance(f, dict)])}")
    
    # Broken links
    broken = [(src, target) for src, target in all_links if target not in all_files]
    print(f"- Broken links: {len(broken)}")
    for src, target in broken:
        print(f"  - [{src}] -> [{target}]")
        
    # Orphans
    orphans = [name for name, count in inbound_links.items() if count == 0 and name != "index" and name != "MAINTENANCE" and name != "WIKI_SCHEMA"]
    print(f"- Orphans: {len(orphans)}")
    for o in orphans:
        print(f"  - {o}")
    
    # Stubs
    stubs = [name for name, data in all_files.items() if isinstance(data, dict) and data['word_count'] < 200]
    print(f"- Stubs: {len(stubs)}")
    
    # Uncited
    uncited = [name for name, data in all_files.items() if isinstance(data, dict) and not data['has_sources']]
    print(f"- Uncited pages: {len(uncited)}")
    for u in uncited:
        print(f"  - {u}")
    
    print(f"- Essay seeds: {len(essay_seeds)}")
    print(f"- Bridge pages complete: {len(bridge_pages)}/5")

if __name__ == "__main__":
    parse_markdown_files()
    generate_report()
