---
name: interesting-fonts
description: Applies distinctive, impactful typography principles to avoid boring, generic fonts. Use when designing interfaces, creating web pages, or making typographic decisions.
---

# Interesting Fonts Typography Skill

## Overview

Typography instantly signals quality. This skill provides guidelines for selecting distinctive, impactful fonts that elevate design quality.

**Keywords**: typography, fonts, design, visual design, web fonts, Google Fonts, font pairing, typographic hierarchy

## Core Principle

**Never use boring, generic fonts.**

### Fonts to Avoid
- Inter
- Roboto
- Open Sans
- Lato
- Default system fonts

## Recommended Font Choices

### Code Aesthetic
- **JetBrains Mono** - Modern monospace with ligatures
- **Fira Code** - Excellent code font with programming ligatures
- **Space Grotesk** - Geometric sans with technical feel

### Editorial
- **Playfair Display** - Elegant serif for headings
- **Crimson Pro** - Classic editorial serif

### Technical
- **IBM Plex family** - Professional technical typeface system
- **Source Sans 3** - Clean, versatile technical sans

### Distinctive
- **Bricolage Grotesque** - Unique geometric with character
- **Newsreader** - Modern take on traditional newsprint

## Font Pairing Principles

### High Contrast = Interesting

Successful pairings use contrasting styles:
- Display + Monospace
- Serif + Geometric Sans
- Variable font across weights

### Examples of Strong Pairings
- Playfair Display (headings) + JetBrains Mono (code/body)
- Bricolage Grotesque (headings) + IBM Plex Sans (body)
- Newsreader (editorial) + Space Grotesk (technical sections)

## Hierarchy Through Extremes

### Weight Contrast
- Use extremes: 100/200 vs 800/900
- Avoid middle weights: NOT 400 vs 600
- Create dramatic hierarchy

### Size Contrast
- Size jumps of 3x or more
- Avoid subtle differences: NOT 1.5x
- Make scale differences obvious

## Implementation Strategy

### Decision Framework
1. Pick ONE distinctive font
2. Use it decisively across the design
3. Load from Google Fonts for web projects
4. Pair with high contrast if needed

### Google Fonts Integration

```html
<!-- Example: Bricolage Grotesque + JetBrains Mono -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@200;800&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
```

### CSS Example

```css
:root {
  /* Distinctive heading font with extreme weights */
  --font-heading: 'Bricolage Grotesque', sans-serif;
  --weight-heading-light: 200;
  --weight-heading-bold: 800;

  /* Monospace for code aesthetic */
  --font-mono: 'JetBrains Mono', monospace;
  --weight-mono-regular: 400;
  --weight-mono-bold: 700;
}

h1, h2, h3 {
  font-family: var(--font-heading);
  font-weight: var(--weight-heading-bold);
}

.subtitle {
  font-family: var(--font-heading);
  font-weight: var(--weight-heading-light);
}

body, p {
  font-family: var(--font-mono);
  font-weight: var(--weight-mono-regular);
}

code, pre {
  font-family: var(--font-mono);
  font-weight: var(--weight-mono-bold);
}
```

## Design Philosophy

- **Distinctive over safe**: Bold choices create memorable experiences
- **Contrast creates interest**: Pairing opposites generates visual energy
- **Extremes over moderation**: Subtle differences are invisible; extremes are impactful
- **Decisive over flexible**: One great font used well beats many fonts used poorly

## Application Guidelines

### When to Use This Skill
- Designing web interfaces
- Creating landing pages
- Developing brand identity
- Building React/frontend components
- Making any typographic decisions

### Quick Selection Guide

**For technical/developer projects:**
→ Space Grotesk + JetBrains Mono

**For editorial/content-heavy projects:**
→ Newsreader + IBM Plex Sans

**For modern/geometric aesthetics:**
→ Bricolage Grotesque + Fira Code

**For classic/elegant feels:**
→ Playfair Display + Source Sans 3

## Remember

Typography is not decoration—it's the foundation of quality visual design. Generic fonts signal generic thinking. Distinctive fonts signal care, taste, and attention to detail.
