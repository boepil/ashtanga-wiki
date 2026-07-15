import os
import re

WIKI_DIR = r"d:\_PROJECTS\My\ai\Ashtanga_Wiki\wiki"

# 1. Map all files (basename -> relative path)
all_files = {}
for root, dirs, files in os.walk(WIKI_DIR):
    for file in files:
        if file.endswith('.md'):
            basename = os.path.splitext(file)[0]
            rel_path = os.path.relpath(os.path.join(root, file), WIKI_DIR)
            all_files[basename] = rel_path

# 2. Function to fix a link
def fix_link(match):
    link_content = match.group(1)
    if not link_content:
        return "[[]]"
        
    parts = link_content.split('|')
    target = parts[0].strip()
    display = parts[1].strip() if len(parts) > 1 else None
    
    original_target = target
    
    # a. Strip folder prefix if target contains / (e.g. Asana_Dictionary/Ubhaya Padangusthasana)
    if '/' in target:
        basename = target.split('/')[-1]
        if basename in all_files:
            target = basename
            
    # b. Try replacing spaces with underscores (e.g. Mula Bandha -> Mula_Bandha)
    if target not in all_files:
        underscore_target = target.replace(' ', '_')
        if underscore_target in all_files:
            target = underscore_target
            
    # c. Handle specific mappings
    mappings = {
        "Padmasana": "Padmasana & Utpluthih",
        "Tolasana": "Padmasana & Utpluthih",
        "Utpluthih": "Padmasana & Utpluthih",
        "Baddha Padmasana": "Baddha Padmasana & Yoga Mudra",
        "Yoga Mudra": "Baddha Padmasana & Yoga Mudra",
        "Dhanurasana": "Dhanurasana & Parsva Dhanurasana",
        "Dwi Pada Sirsasana": "Eka Pada Sirsasana & Dwi Pada Sirsasana",
        "Eka Pada Sirsasana": "Eka Pada Sirsasana & Dwi Pada Sirsasana",
        "Lolasana": "Navasana",
        "Kakasana": "Bakasana",
        "Hamsasana": "Mayurasana",
        "Nakhasana": "Mayurasana",
        "Bhujangasana": "Salabhasana",
        "Adho Mukha Vrksasana": "Pincha Mayurasana",
        "Prana": "Bandha_Overview",
        "Vinyasa": "Sanskrit_Mantras_and_Terminology",
        "Yoga_Nidra": "Savasana",
        "Meditation": "Savasana",
        "Twists": "Pasasana",
        "Pada Bandha": "Joint_Stability",
        "Virasana": "Joint_Stability",
        "Balasana": "Sirsasana",
        "Chakrasana": "Asana_Fundamentals",
        "Parsvakonasana": "Utthita Parsvakonasana",
        "Trikonasana": "Utthita Trikonasana",
        "Vajrasana": "Supta Vajrasana",
        "Garudasana": "Standing_Sequence",
        "Bohr_Effect_and_Kumbhaka": "The_Bohr_Effect_and_Kumbhaka",
        "Chaturanga Dandasana": "Surya_Namaskar",
        "Dwi Pada Viparita Dandasana": "Urdhva Dhanurasana"
    }
    
    if target in mappings:
        target = mappings[target]
        if display is None and target != original_target:
            display = original_target

    if display:
        return f"[[{target}|{display}]]"
    else:
        # If target changed from space to underscore, we might want to keep the space as display
        if target != original_target and '|' not in link_content and '_' in target and ' ' in original_target:
             return f"[[{target}|{original_target}]]"
        return f"[[{target}]]"

# 3. Process all files
for root, dirs, files in os.walk(WIKI_DIR):
    for file in files:
        if file.endswith('.md'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Using a lambda to pass the match to fix_link
            new_content = re.sub(r'\[\[(.*?)\]\]', fix_link, content)
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Fixed links in {os.path.relpath(filepath, WIKI_DIR)}")
