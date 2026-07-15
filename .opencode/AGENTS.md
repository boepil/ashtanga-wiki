# Rules

**NotebookLM First, Always**: Before answering any question that requires external knowledge, physiology, anatomy, biomechanics, or yoga-specific information, you MUST re-authenticate NotebookLM (run `notebooklm_get_health`; if `authenticated: false`, run `notebooklm_re_auth`) and query the Yoga and Human Anatomy notebook first. Use local raw files only as supplementary context after NotebookLM has been exhausted.

**Fold Plugin Fix**: When the user reports that collapsible navigation (Fold plugin) does not render on the live site, first verify by running `npx quartz build` and checking `public/index.html` for the fold script and CSS. If present locally, the issue is deployment timing or cache — ask the user to hard-refresh with Ctrl+F5 and wait for GitHub Actions to complete.

**Direct Editing (Single Source of Truth)**: Edit files directly inside the `quartz-web/content/` directory. There is no longer a separate `wiki/` or root `content/` directory; they have been deleted to avoid duplication and sync issues. All content, images, and attachments live directly under `quartz-web/content/`. Point Obsidian or any local editor to `quartz-web/` to work.

**No Web Search**: Do NOT use `websearch` for knowledge gathering. All information must come from NotebookLM (`notebooklm_ask_question`) or local raw files in the `raw/` directory only. `webfetch` is allowed when you provide a specific URL.
