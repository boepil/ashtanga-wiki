---
type: [concept|asana|practice|lineage|text|essay-seed|compensation-map|rehabilitation-protocol|asana-modification]
tags: []
sources: []
updated: YYYY-MM-DD
---
<div class="page-wrapper is-asana">



# [Title]

## Summary
2-3 sentence synthesis.

## Detail
Main content. Substantive, not superficial.

## Connections
- [[linked page]] — why it connects
- [[linked page]] — why it connects

## Writing angles
1-3 essay-worthy threads or unresolved tensions this topic raises.

## Sources
List of raw files this page draws from.

---

## NotebookLM Source Convention
- Instead of raw/ files, we increasingly rely on NotebookLM for primary source extraction.
- Citations embedded in wiki pages MUST use the format: `(Author, Title, p.XX)`
- At the bottom of each page, list the full source under `## Sources:`
  - `- Author, Source Title [via NotebookLM notebook name]`
  - If part of the text extracted from NotebookLM originally came from the local `raw/` files (e.g., ASHTANGA_YOGA_KNOWLEDGE_BASE.pdf), it MUST be explicitly mentioned with the exact raw file path if known, or a general reference if not, like: `- \`raw/06_ANATOMY/נקודות אנטאטומיות מרכזיות ביוגה.md\``
- Queries to NotebookLM must be extraction-style: "Give me all relevant passages on [TOPIC]. For each: close paraphrase or exact quote, source title, author, page number. Do not summarize — extract."
- No separate `raw/` files are needed for NotebookLM content.

---

## index.md format
Each entry: `- [[page]] — one line summary — (type) — N sources`
Organized by category matching the source folder structure.

## log.md format
Each entry: `## [YYYY-MM-DD] operation | description`

## Ingest workflow
1. Read the source file(s)
2. Extract key information
3. Write or update relevant wiki pages
4. Update index.md
5. Append to log.md
One ingest may touch 10-15 wiki pages.

## Lint triggers
- Contradictions between pages
- Orphan pages (no inbound links)
- Concepts mentioned but lacking their own page
- Stale claims superseded by newer sources
- Missing writing angles on rich topics

## Category map
01_ASANA → type: asana
02_PRANAYAMA → type: practice
03_BANDHA → type: concept
04_MUDRA → type: concept
05_SHATKARMAS → type: practice
06_ANATOMY → type: concept
07_PHILOSOPHY → type: concept + text
08_TEACHING_METHODOLOGY → type: practice
10_AYURVEDA_AND_DIET → type: concept
11_Resources → type: text

</div>