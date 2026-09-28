# Gena Hunsaker Counseling

Source for [genahunsakercounseling.com](https://genahunsakercounseling.com) — a single-page site built with
[Vite](https://vite.dev) and plain HTML/CSS/JS, deployed to GitHub Pages.

## Getting started

Requires Node 22+.

```bash
npm install
npm run dev      # local dev server with hot reload
```

| Command                   | What it does                                     |
| ------------------------- | ------------------------------------------------ |
| `npm run dev`             | Start the dev server                             |
| `npm run build`           | Build the production site into `dist/`           |
| `npm run preview`         | Serve the built `dist/` locally                  |
| `npm run check`           | Lint, check formatting, and build (CI runs this) |
| `npm run format`          | Auto-format everything with Prettier             |
| `npm run images -- <dir>` | Resize/compress photos into `src/assets/images/` |

## Project layout

```
index.html                 Page content (all text lives here)
src/
  main.js                  Entry point — loads styles and wires up scripts
  scripts/
    nav.js                 Mobile menu toggle
    slider.js              Photo carousels ([data-slider] elements)
  styles/
    main.css               Imports the files below
    tokens.css             Colors, fonts, spacing — change the theme here
    base.css               Resets, links, buttons
    navbar.css, hero.css, slider.css, sections.css, footer.css
  assets/images/           Optimized .webp photos (keep these small!)
public/
  CNAME                    Custom domain for GitHub Pages
scripts/
  optimize-images.mjs      Photo resizing tool
.github/workflows/
  deploy.yml               Builds and deploys on every push to main
```

## Editing content

All the words on the site are in `index.html`. Edit, run `npm run dev` to check it, then commit and push to `main` —
GitHub Actions builds and deploys automatically.

## Adding photos

**Do not commit photos straight off a phone.** They're 10+ MB each and make the repo slow to clone forever (git keeps
every version). Instead:

1. Put the originals in a folder _outside_ this repo.
2. Run `npm run images -- path/to/that/folder`.
3. Reference the new `.webp` from `index.html`, e.g. `src="/src/assets/images/new-photo.webp"`.

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to GitHub Pages. In
the repo's **Settings → Pages**, **Source** must be set to **GitHub Actions**.
