---
version: alpha
name: Ashtanga Wiki
description: >
  A cross-disciplinary yoga knowledge base combining
  traditional Ashtanga teaching with modern anatomy,
  rehabilitation science, and contemplative practice.
  Aesthetic: warm, scholarly, embodied. Not clinical,
  not corporate. Think quality yoga book meets
  medical reference.

colors:
  primary: "#1C1917"
  secondary: "#57534E"
  tertiary: "#B45309"
  neutral: "#FAFAF9"
  surface: "#F5F5F4"
  danger: "#B91C1C"
  success: "#15803D"
  info: "#1D4ED8"
  sanskrit: "#92400E"

typography:
  h1:
    fontFamily: Georgia, serif
    fontSize: 2.5rem
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.01em
  h2:
    fontFamily: Georgia, serif
    fontSize: 1.75rem
    fontWeight: 600
    lineHeight: 1.3
  h3:
    fontFamily: Georgia, serif
    fontSize: 1.25rem
    fontWeight: 600
    lineHeight: 1.4
  body-lg:
    fontFamily: Inter, sans-serif
    fontSize: 1.0625rem
    fontWeight: 400
    lineHeight: 1.8
  body-md:
    fontFamily: Inter, sans-serif
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.75
  caption:
    fontFamily: Inter, sans-serif
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
  sanskrit:
    fontFamily: Georgia, serif
    fontSize: 1rem
    fontWeight: 400
    fontStyle: italic
  citation:
    fontFamily: Inter, sans-serif
    fontSize: 0.8rem
    fontWeight: 400
    lineHeight: 1.5

rounded:
  sm: 4px
  md: 8px
  lg: 16px
  full: 9999px

spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 32px
  xl: 64px
  content-max: 800px
  section-gap: 48px

components:
  compensation-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"
  rehabilitation-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"
  bridge-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"
  citation-block:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.secondary}"
    rounded: "{rounded.sm}"
    padding: "{spacing.sm} {spacing.md}"
  controversy-flag:
    backgroundColor: "#FFFBEB"
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: "{spacing.md}"
  warning-block:
    backgroundColor: "#FEF2F2"
    textColor: "{colors.danger}"
    rounded: "{rounded.sm}"
    padding: "{spacing.md}"
  asana-tag:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.neutral}"
    rounded: "{rounded.full}"
    padding: "2px 10px"
  phase-header-a:
    backgroundColor: "{colors.danger}"
    textColor: "{colors.neutral}"
    rounded: "{rounded.sm}"
    padding: "{spacing.sm} {spacing.md}"
  phase-header-b:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.neutral}"
    rounded: "{rounded.sm}"
    padding: "{spacing.sm} {spacing.md}"
  phase-header-c:
    backgroundColor: "{colors.success}"
    textColor: "{colors.neutral}"
    rounded: "{rounded.sm}"
    padding: "{spacing.sm} {spacing.md}"
---

## Overview

Warm scholarly aesthetic — a high-quality yoga book
meets clinical reference. Every page should feel
embodied and intelligent, not digital or sterile.
Worth printing. Worth reading slowly.

The emotional register: the gravitas of a well-worn
anatomy textbook combined with the warmth of a
handwritten practice journal.

## Colors

The palette is rooted in warm stone neutrals with
amber as the single accent — evoking aged paper,
natural materials, and the warmth of physical practice.

- **Primary (#1C1917):** Deep warm black for headlines.
  Not pure black — warm undertone essential.
- **Secondary (#57534E):** Warm stone for body text
  and supporting content.
- **Tertiary (#B45309):** Amber for links, highlights,
  bridge page accents, and Sanskrit terms.
- **Neutral (#FAFAF9):** Warm white background.
  Never pure white.
- **Surface (#F5F5F4):** Light stone for card backgrounds,
  callout boxes, and code blocks.
- **Danger (#B91C1C):** Red for injury warnings,
  compensation patterns, what's-wrong panels.
- **Success (#15803D):** Green for corrected patterns,
  rehabilitation progress, what's-right panels.
- **Sanskrit (#92400E):** Deep amber for Sanskrit terms —
  distinct from link amber but harmonious.

## Typography

Georgia serif for all headings — scholarly weight and
warmth. Inter sans-serif for body — clean and readable
at length. Sanskrit terms always in Georgia italic.
Citations always smaller and muted.

- **Headings:** Georgia serif. Hierarchy from h1 (2.5rem)
  to h3 (1.25rem). Never use more than three heading
  levels on one page.
- **Body:** Inter at 1rem, line-height 1.75. Generous
  leading for long reading. Maximum 800px wide.
- **Sanskrit:** Georgia italic, same size as surrounding
  body text. Never translated inline — translation
  in parentheses or tooltip.
- **Citations:** Inter 0.8rem, secondary color.
  Should feel like footnotes — present but not dominant.

## Layout & Spacing

Single column, centered, max-width 800px. Generous
whitespace. Content breathes. No sidebars.

- **Content max-width:** 800px centered
- **Section spacing:** 48px between major sections
- **Paragraph spacing:** 1em
- **Images:** Full width within content column
- **Mobile:** Single column, 16px horizontal padding

## Elevation & Depth

Flat design. Depth through color and border accents,
not shadows. Page type identity communicated through
left border color:

- **Compensation map pages:** 4px left border, danger red
- **Rehabilitation protocol pages:** 4px left border, success green
- **Bridge pages:** 4px left border, tertiary amber
- **Asana dictionary pages:** No border — clean minimal

## Shapes

Subtle rounding. Functional, not decorative.

- **Cards and callouts:** 8px radius
- **Tags and pills:** Full radius (9999px)
- **Phase headers:** 4px radius
- **Images:** No rounding — full bleed within column

## Components

### Compensation map cards
Red left border (4px solid danger). Surface background.
Used for the LACK / COMPENSATION / WHERE IT SHOWS UP
sections.

### Rehabilitation cards
Green left border (4px solid success). Surface background.
Used for Phase A / B / C exercise sections.

### Bridge page cards
Amber left border (4px solid tertiary). Surface background.
Used for the core thesis and writing angles sections.

### Citation blocks
Surface background. Left border 2px secondary color.
Small text (0.8rem). Used after any sourced claim.
Format: (Author, Title, p.XX)

### Controversy flags
Warm yellow background (#FFFBEB). Used for
CHALLENGES MAINSTREAM TEACHING callouts.
Should be noticeable but not alarming.

### Warning blocks
Light red background (#FEF2F2). Used for injury
warnings and pain guide entries of 4+.

### Phase headers
Phase A = danger red background.
Phase B = amber background.
Phase C = success green background.
All white text. 4px radius.

### Sanskrit terms
Georgia italic. Color: sanskrit (#92400E).
Never bold. Always followed by English in parentheses
on first use on a page.

## Do's and Don'ts

- Do use warm white (#FAFAF9) for backgrounds — never pure white
- Do keep all content within 800px max-width
- Don't use more than two font families (Georgia + Inter)
- Do use red/green color coding consistently —
  red = problem, green = solution, amber = insight
- Don't use shadows — use border accents for depth
- Do preserve Hebrew teaching cues in their own
  styled block (direction: rtl, font-family: inherit)
- Don't translate Sanskrit inline — use parentheses
  or tooltips
- Do maintain WCAG AA contrast ratios (4.5:1 minimum)
- Don't use pure black (#000000) anywhere —
  always warm dark (#1C1917)