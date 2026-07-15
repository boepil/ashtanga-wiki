import os
import re

wiki_dir = "wiki"

# Gather all files to check for orphans
orphan_candidates = []
all_files = []
for root, _, filenames in os.walk(wiki_dir):
    for f in filenames:
        if f.endswith(".md"):
            filepath = os.path.join(root, f)
            all_files.append(filepath)
            if f != "index.md":
                orphan_candidates.append(filepath)

# Find inbound links
inbound_links = {os.path.basename(f)[:-3]: 0 for f in orphan_candidates}

# Regex to find [[Link]]
link_pattern = re.compile(r'\[\[(.*?)\]\]')

# Also gather essay seeds (writing angles)
writing_angles = []

for f in all_files:
    with open(f, "r", encoding="utf-8") as file:
        content = file.read()
        
        # Check inbound links
        links = link_pattern.findall(content)
        for link in links:
            # Handle [[Link|Display]]
            target = link.split("|")[0]
            # Handle [[Path/To/File]]
            target_name = os.path.basename(target)
            if target_name in inbound_links:
                inbound_links[target_name] += 1
                
        # Get writing angles
        if "## Writing angles" in content:
            parts = content.split("## Writing angles")
            if len(parts) > 1:
                angles_section = parts[1].split("## Sources")[0].strip()
                lines = [line.strip("- *").strip() for line in angles_section.split("\n") if line.strip().startswith("-")]
                for line in lines:
                    writing_angles.append((os.path.basename(f)[:-3], line))

orphans = [k for k, v in inbound_links.items() if v == 0]

print("ORPHANS:")
for o in orphans:
    print(f"- {o}")

print("\nTOP ESSAY SEEDS (Random 5):")
import random
random.shuffle(writing_angles)
for file, angle in writing_angles[:5]:
    print(f"- From {file}: {angle}")
