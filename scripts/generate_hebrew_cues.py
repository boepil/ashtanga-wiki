import os
import re

src_dir = r"d:\_PROJECTS\My\ai\Ashtanga_Wiki\wiki\Asana_Dictionary"
output_file = r"d:\_PROJECTS\My\ai\Ashtanga_Wiki\wiki\Asana_Dictionary\Hebrew_Translation_Cues.md"

asanas = []
for file in os.listdir(src_dir):
    if file.endswith('.md') and file != "Hebrew_Translation_Cues.md":
        asanas.append(file.replace('.md', ''))

# Basic transliteration rules
def transliterate(word):
    rules = {
        'sh': 'ש',
        'ch': 'צ\'',
        'th': 'ט',
        'bh': 'ב',
        'dh': 'ד',
        'gh': 'ג',
        'kh': 'ק',
        'ph': 'פ',
        'a': 'א',
        'e': 'א',
        'i': 'י',
        'o': 'ו',
        'u': 'ו',
        'b': 'ב',
        'c': 'צ\'',
        'd': 'ד',
        'g': 'ג',
        'h': 'ה',
        'j': 'ג\'',
        'k': 'ק',
        'l': 'ל',
        'm': 'מ',
        'n': 'נ',
        'p': 'פ',
        'r': 'ר',
        's': 'ס',
        't': 'ט',
        'v': 'ו',
        'w': 'ו',
        'y': 'י',
        'z': 'ז'
    }
    
    # Just a very rough placeholder, an LLM is better.
    return word

asanas.sort()

with open(output_file, 'w', encoding='utf-8') as f:
    f.write("---\n")
    f.write("type: dictionary\n")
    f.write("tags: [hebrew, karaoke, translation]\n")
    f.write("updated: 2026-05-09\n")
    f.write("---\n\n")
    f.write("# Hebrew Translation Cues (Karaoke)\n\n")
    f.write("| Asana (Sanskrit) | Transliteration (Hebrew) |\n")
    f.write("| :--- | :--- |\n")
    
    for asana in asanas:
        f.write(f"| {asana} |  |\n")

print(f"Generated dictionary template at {output_file}")
