---
name: image-organizer
description: Use when the user asks to organize, rename, or place images from a clipping/Downloads folder into the wiki. Views each image, renames it descriptively, finds or creates the best wiki page, searches NotebookLM for related content, and inserts the image.
---

# Image Organizer

Organizes images from a source directory into the Ashtanga Yoga wiki with proper names and placement.

## Workflow

### Step 1: Scan source directory

List all image files (png, jpg, jpeg, gif, webp) in the source directory (default: `Clippings/`).

```
Read the directory listing
Identify all image files
```

### Step 2: View and analyze each image

For each image file:
1. **Read the image** using the Read tool to view its visual content
2. **Describe the content** — identify anatomy, pathology, biomechanics, or yoga concepts shown
3. **Generate a descriptive filename** using snake_case:
   - Use anatomical terms (e.g., `shoulder_impingement_subacromial.png`)
   - Include the body region and specific structure
   - Keep names under 60 characters
   - Preserve the original extension

### Step 3: Search existing wiki pages

For each image, find the best placement:

1. **Grep the wiki directory** for keywords related to the image content:
   ```
   Search wiki/*.md for relevant terms (body region, pathology, concept)
   ```
2. **Check existing pages** by reading their content to find the right section
3. **Score matches** — prefer pages where the image directly illustrates a discussed concept

### Step 4: Search NotebookLM for supplementary content

For each image, if the wiki page exists:
1. Use `notebooklm_ask_question` to search the Yoga and Human Anatomy notebook
2. Ask about the specific anatomy/pathology shown in the image
3. Use any additional context found to enrich the image caption or surrounding text

If no appropriate wiki page exists (Step 3 found no match):
1. Use `notebooklm_ask_question` to research the topic
2. Gather enough content to create a new wiki page
3. Create the page with proper frontmatter, content from NotebookLM, and the image

### Step 5: Copy and rename

For each image:
1. Copy from source to `wiki/Attachments/` with the new descriptive name
2. If a file with the same name exists, compare them — keep the better version

### Step 6: Insert into wiki pages

For each image, add it to the appropriate wiki page:

**Image syntax:**
```markdown
![Descriptive alt text](Attachments/filename.png)
```

**Placement rules:**
- Insert images near the relevant discussion text
- Add a blank line before and after the image
- Write alt text that describes what the image shows
- If the image illustrates a specific concept, place it in the same section

**If creating a new page:**
1. Use NotebookLM research to write the page content
2. Follow existing wiki conventions (see other pages for style)
3. Add proper frontmatter: `title`, `tags`, `date`
4. Update `wiki/index.md` to include the new page in the appropriate section
5. Run `renumber.ts` to sync sequence numbers

### Step 7: Report results

After processing all images, report:
- Files renamed (old → new)
- Pages modified or created
- Any images that were skipped (duplicates, unclear content)

## Naming conventions

| Body region | Prefix example |
|---|---|
| Shoulder | `shoulder_impingement_`, `rotator_cuff_`, `acromioclavicular_` |
| Spine | `cervical_stenosis_`, `lumbar_disc_`, `thoracic_mobility_` |
| Hip | `hip_labral_`, `femoral_head_`, `piriformis_` |
| Knee | `knee_meniscus_`, `patellofemoral_`, `acl_` |
| Foot/Ankle | `plantar_fascia_`, `achilles_`, `ankle_sprain_` |
| Brain/Nervous | `pain_pathway_`, `gate_control_`, `vagal_tone_` |
| General | `skeletal_system_`, `fascial_lines_`, `muscular_system_` |

## Error handling

- If an image cannot be read, skip it and report the error
- If NotebookLM is rate-limited, proceed with wiki search only
- If a page creation fails, save the content to a temporary file for manual placement
- Never delete original files from the source directory — only copy

## Example invocation

```
User: "Organize the images in Clippings/"
Agent:
1. Lists Clippings/ — finds 8 images
2. Views each image, generates names
3. Greps wiki/ for matching pages
4. Searches NotebookLM for each topic
5. Copies renamed images to wiki/Attachments/
6. Inserts images into appropriate pages
7. Creates new pages if needed
8. Reports summary
```
