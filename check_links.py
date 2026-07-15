import os
import re

wiki_dir = r"d:\_PROJECTS\My\ai\Ashtanga_Wiki\wiki"

file_basenames = []
for root, _, files in os.walk(wiki_dir):
    for f in files:
        # Add markdown files
        if f.endswith(".md"):
            file_basenames.append(os.path.splitext(f)[0])
        # Add image files from Attachments
        elif "Attachments" in root:
            file_basenames.append(f)

broken_links = []
# Match [[link]]
link_pattern = re.compile(r'\[\[(.*?)\]\]')
# Match ![[image]]
image_pattern = re.compile(r'!\[\[(.*?)\]\]')

for root, _, files in os.walk(wiki_dir):
    for filename in files:
        if not filename.endswith(".md"):
            continue
        filepath = os.path.join(root, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
            # Check wiki links
            links = link_pattern.findall(content)
            for link in links:
                # Handle escaped pipes \| and standard pipes |
                link_target = link.replace(r'\|', '|').split('|')[0]
                # Handle anchors
                target_page = link_target.split('#')[0].strip()
                
                if target_page and target_page not in file_basenames:
                    broken_links.append((filename, link))

if broken_links:
    print(f"Found {len(broken_links)} broken links:")
    for source, broken in broken_links:
        print(f"  - In '{source}': [[{broken}]]")
else:
    print("All internal links are valid! No broken links found.")
