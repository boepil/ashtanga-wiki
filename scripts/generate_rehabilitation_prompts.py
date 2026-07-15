import os
import re

protocols_dir = r"d:\_PROJECTS\My\ai\Ashtanga_Wiki\wiki\Rehabilitation"
output_file = r"d:\_PROJECTS\My\ai\Ashtanga_Wiki\wiki\Meta\Rehabilitation_Prompts.md"

def get_protocol_files():
    return [f for f in os.listdir(protocols_dir) if f.endswith('_Protocol.md')]

def extract_section(text, section_name, stop_at_next_h2_or_h3=True):
    pattern = rf"##\s+[^\n]*{section_name}[^\n]*\n(.*?)(?=\n##\s|\Z)"
    match = re.search(pattern, text, re.DOTALL | re.IGNORECASE)
    if match:
        content = match.group(1).strip()
        # extract exercises
        exercises = []
        for block in content.split("###"):
            block = block.strip()
            if not block: continue
            lines = block.split('\n')
            title = lines[0].strip()
            how = ""
            for line in lines:
                if line.startswith("- How:"):
                    how = line.replace("- How:", "").strip()
            if title and how:
                exercises.append(f"- {title} ({how})")
        return exercises
    return []

def extract_key_principle(text):
    match = re.search(r"Principle:\s*(.*)", text)
    if match:
        return match.group(1).strip()
    return "Follow guidelines carefully."

def extract_pain_guide(text):
    match = re.search(r"## Pain\s*(.*?)(?=\n##|\Z)", text, re.DOTALL | re.IGNORECASE)
    if match:
        lines = match.group(1).strip().split('\n')
        guide = " | ".join([line.strip().lstrip('- ') for line in lines if line.strip() and not line.startswith('guide')])
        return guide
    return "0=train | 1-3=caution | 4+=stop"

def extract_freq_session(text):
    freq = "3-4x per week"
    session = "20-30 min"
    freq_m = re.search(r"Frequency:\s*(.*)", text)
    if freq_m: freq = freq_m.group(1).strip()
    sess_m = re.search(r"Session\s*time:\s*(.*)", text)
    if sess_m: session = sess_m.group(1).strip()
    return freq, session

# Hardcoded data for color coding and anatomy since it varies and needs AI interpretation
protocol_data = {
    "Shoulder Impingement": {
        "color": ["Coral: Serratus Anterior (target)", "Amber: Lower Trapezius (target)", "Teal: Rotator Cuff external rotators (target)"],
        "anatomy": "Anatomical view of the shoulder showing the three target muscles with arrows indicating their correct activation direction.",
        "subtitle": "Scapulohumeral rhythm requires the scapula to move the glenoid socket to keep peace with the humerus."
    },
    "Chaturanga Collapse": {
        "color": ["Coral: Serratus Anterior (target)", "Amber: Pectoralis Minor (release)", "Teal: Transversus Abdominis / Core (target)"],
        "anatomy": "Anatomical view of the torso and shoulder showing the Serratus Anterior and Core with arrows indicating upward and inward activation to prevent sagging.",
        "subtitle": "Rebuild structural integrity by connecting the core to the shoulder blade."
    },
    "Hamstring Overstretching": {
        "color": ["Coral: Proximal Hamstrings (target)", "Amber: Gluteus Maximus (target)", "Teal: Superficial Back Line / Fascia (target)"],
        "anatomy": "Anatomical view of the posterior leg and pelvis showing the hamstrings and glutes with arrows indicating upward engagement to protect the ischial tuberosity.",
        "subtitle": "Heal the tendon by building eccentric control under load."
    },
    "SI Joint Instability": {
        "color": ["Coral: Adductor Muscle Group (target)", "Amber: Gluteus Medius / Lateral stabilizers (target)", "Teal: Quadratus Lumborum (target)"],
        "anatomy": "Anatomical view of the pelvis and sacrum showing the adductors and glutes with arrows pulling the pelvic halves together to create joint congruence.",
        "subtitle": "Tune the guy-wires to create compression for stability."
    },
    "Hip Flexor Dominance": {
        "color": ["Coral: Psoas Major / Iliacus (release)", "Amber: Gluteus Maximus (target)", "Teal: Deep Front Line (fascial focus)"],
        "anatomy": "Anatomical view of the pelvis and lumbar spine showing the psoas and glutes with arrows indicating reciprocal inhibition.",
        "subtitle": "Release the front and awaken the posterior chain."
    },
    "Lumbar Compression": {
        "color": ["Coral: Multifidus / Deep spinal erectors (target)", "Amber: Quadratus Lumborum / Obliques (target)", "Teal: Gluteus Maximus (target)"],
        "anatomy": "Anatomical view of the lumbar spine and pelvis showing the deep core creating a 360-degree braced cylinder protecting the vertebrae.",
        "subtitle": "Build spinal stiffness to decompress the discs."
    },
    "Breath Holding": {
        "color": ["Coral: Diaphragm (target)", "Amber: Vagus Nerve (target pathway)", "Teal: Transversus Abdominis (core support)"],
        "anatomy": "Anatomical view of the torso showing the diaphragm expanding horizontally with arrows indicating 360-degree expansion without chest lifting.",
        "subtitle": "Increase CO2 tolerance to restore parasympathetic efficiency."
    },
    "Nervous System Dysregulation": {
        "color": ["Coral: Diaphragm (target)", "Amber: Nasal Passageways (target)", "Teal: Autonomic Nervous System (pathways)"],
        "anatomy": "Anatomical view of the head and torso showing the nasal airway, diaphragm, and vagus nerve pathway with soft, calming energy lines.",
        "subtitle": "Restore vagal tone and shift to rest-and-digest."
    }
}

def generate():
    files = get_protocol_files()
    output = []
    output.append("# AI Image Generation Prompts for Rehabilitation Protocols\n")
    output.append("Below is the complete set of customized AI image generation prompts for every rehabilitation protocol in your wiki. They perfectly match the layout, color coding, and structure of your reference infographic series.\n")
    output.append("To avoid text layout hallucinations in ChatGPT, copy these structured prompts exactly. They use a strict 3-panel layout (Left, Central, Right) where Phase B is placed below the Anatomy in the Central Panel.\n")
    output.append("---\n")
    
    count = 1
    for f in files:
        path = os.path.join(protocols_dir, f)
        with open(path, 'r', encoding='utf-8') as f_in:
            text = f_in.read()
            
        match = re.search(r"condition:\s*(.*)", text)
        condition = match.group(1).strip() if match else "Unknown"
        
        # fix match name to data dictionary
        key = condition
        if condition.startswith("Hamstring Overstretching"):
            key = "Hamstring Overstretching"
        if condition.startswith("Breath Holding"):
            key = "Breath Holding"
            
        data = protocol_data.get(key, {
            "color": ["Color 1", "Color 2", "Color 3"],
            "anatomy": "Anatomical view of...",
            "subtitle": "Subtitle explaining anatomy..."
        })
        
        phase_a = extract_section(text, "Phase A")
        phase_b = extract_section(text, "Phase B")
        phase_c = extract_section(text, "Phase C")
        
        freq, session = extract_freq_session(text)
        pain = extract_pain_guide(text)
        principle = extract_key_principle(text)
        
        output.append(f"### {count}. {condition}\n```text")
        output.append(f"Generate a rehabilitation protocol infographic for {condition} in Yoga, using a 3-panel layout (Left, Central, Right).\n")
        output.append(f"Title: \"{condition} — Rehabilitation Protocol\"")
        output.append(f"Subtitle: \"{data['subtitle']}\"\n")
        output.append("Color coding:")
        for c in data['color']:
            output.append(f"- {c}")
        output.append("")
        output.append("Left panel: Phase A — Prep/Mobility")
        for ex in phase_a:
            output.append(ex)
        output.append("2 sets each, illustrated with practitioner.\n")
        
        output.append("Central panel (Top): Anatomy")
        output.append(f"- View: {data['anatomy']}")
        output.append(f"- Subtitle: \"{data['subtitle']}\"\n")
        
        output.append("Central panel (Bottom): Phase B — Strength")
        for ex in phase_b:
            output.append(ex)
        output.append("3 sets each, illustrated.\n")
        
        output.append("Right panel: Phase C — Control/Endurance")
        for ex in phase_c:
            output.append(ex)
        output.append("3 sets each, illustrated.\n")
        
        output.append("Bottom footer:")
        output.append(f"- Frequency: {freq} | Session: {session} | Pain guide: {pain}")
        output.append(f"- Key Takeaway: \"{principle}\"")
        output.append("```\n---\n")
        
        count += 1
        
    with open(output_file, 'w', encoding='utf-8') as f_out:
        f_out.write("\n".join(output))

if __name__ == "__main__":
    generate()
    print("Done generating.")
