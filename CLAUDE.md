# CLAUDE.md

## Project Overview

This is a static personal portfolio / "About Me" website built with vanilla HTML5 and CSS3. It is a coding bootcamp prework assignment, currently hosted on GitHub Pages.

## Repository Structure

```
prework-about-me/
├── index.html          # Main (and only) HTML page
├── css/
│   └── style.css       # All styles for the site
├── img/
│   └── code.jpg        # Masthead background image (2000x1333 JPEG)
├── README.md           # Brief project description
├── .gitignore          # Ignores .DS_Store
└── CLAUDE.md           # This file
```

## Tech Stack

- **HTML5** with semantic tags (`<header>`, `<section>`, `<footer>`)
- **CSS3** (vanilla, no preprocessor)
- **No JavaScript**, build tools, package manager, or dependencies
- **No testing framework** or linter configured

## Development Workflow

This is a static site with no build step. To develop:

1. Edit `index.html` and/or `css/style.css` directly.
2. Open `index.html` in a browser to preview changes.
3. Commit and push to deploy via GitHub Pages.

There are no `npm` scripts, no compilation, and no dev server.

## Key Conventions

- **Semantic HTML**: The page uses `<header>`, `<section>`, and `<footer>` elements. Maintain this structure when adding content.
- **CSS class naming**: Uses descriptive hyphenated class names (e.g., `masthead-heading`, `masthead-intro`). Follow this convention for new classes.
- **Single-page layout**: The site is a single `index.html` file with three sections:
  1. `.masthead` — hero/header area with background image and name
  2. `.details` — Q&A-style content section
  3. `#footer` — social links footer
- **Font**: Uses "Open Sans" font family (loaded from system/browser defaults, no external font import).
- **Color scheme**: Dark text (`#222222`) on white background; white text on dark backgrounds (masthead image overlay, footer `#111111`).

## File Details

### `index.html`
- DOCTYPE: HTML5
- Contains a masthead header, a details section with headings and paragraphs, and a footer with social links.
- Several placeholder entries (`Details here...`) remain to be filled in.

### `css/style.css`
- Body: `#222222` text, `1em` base font size, Open Sans font stack.
- `.masthead`: Full-width hero with `background-size: cover` on `img/code.jpg`, `6em` vertical padding.
- `.details`: Centered with `max-width: 38em`.
- `#footer`: Dark background (`#111111`), white link text, inline social list items.

## Git Conventions

- Default branch: `master`
- Commit messages: lowercase, prefixed with a dash (e.g., `- updating our details`)
- `.gitignore`: Only `.DS_Store` is ignored
