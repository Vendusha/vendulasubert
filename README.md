# vendulasubert.cz / vendulasubert.com

Personal site: professional/CV page + Czech-first humorous columns, bilingual (cs/en), built with [Astro](https://astro.build), hosted on GitHub Pages, deployed automatically by GitHub Actions on every push to `main`.

**Status: Phase 3.** Publishing pipeline (Phase 0), bilingual site skeleton — Home, About/CV, Publications, ALEFUJ! (Phase 1) — and the four blog columns with their shared post system (Phase 2) are all done. Phase 3 was photography and polish: real photos placed throughout (see "Images" below for how hero-image cropping works), responsive WebP images with fallbacks everywhere, and this README's "How to update this site" section rewritten as a single, complete, example-driven walkthrough. One placeholder sample post exists per column in both languages so the layout and frontmatter are visible by example — replace them with real writing whenever you're ready (see "How to update this site" below).

---

## How to update this site

Written for future-you, having forgotten all of this. Four things you'll ever need to do: write a post, translate a post, add a photo, and publish. No terminal, no GitHub Desktop — everything below uses VS Code's built-in panels, plus a browser fallback if you're away from your laptop.

If you get properly stuck, you can also just ask Claude Code (or another AI coding assistant) to do any of this for you — describe what you want in plain language ("add a new post to the outdoor column about X") and point it at this repo.

### 1. Write a new post

1. In the **Explorer** panel (top icon in the left-hand Activity Bar — looks like two stacked pages), open `src/content/blog/`.
2. Open the folder for the column your post belongs to: `materstvi`, `zvedavost`, `outdoor`, or `zivot`.
3. Right-click the `_template` folder → **Copy**, then right-click your column folder → **Paste**.
4. Right-click the pasted folder (called `_template` or `_template (copy)`) → **Rename**, and give it today's date plus a short slug, e.g. `2026-09-03-nazev-clanku`. This folder name becomes the post's URL — lowercase, hyphens, no spaces or accents.
5. Open the `index.md` file inside your new folder.
6. Fill in the frontmatter at the top (between the `---` lines): `title`, `date`, `column` (must exactly match the folder name from step 2), `lang` (`cs` or `en`), `summary`. Leave `translationKey`, `heroImage`, and `draft` alone for now — see steps 2–3 below and the comments in the file itself.
7. Write the post below the second `---`, in plain Markdown: `**bold**`, `_italics_`, `[link text](https://example.com)`, `## a heading`, `- a bullet`.
8. Save (`Ctrl+S`).

Not ready to publish yet? Add `draft: true` to the frontmatter. It shows up when you run `npm run dev` to preview locally, but is automatically left out of the live site — you can commit and push a draft with zero risk of it going live by accident. Flip it to `draft: false` (or delete the line) whenever you actually want it live.

### 2. Add a translation of a post

A translation is a **second, separate post file** — not a second language inside the same file.

1. Do everything in "Write a new post" above, but with `lang` set to the other language, in a **new folder** (same column, different slug — e.g. the Czech post might be `2026-09-03-nazev-clanku/` and the English one `2026-09-03-post-title/`).
2. Open **both** the Czech file and the English file, and give them the exact same `translationKey` value in the frontmatter — anything you like, e.g. `translationKey: "nazev-clanku"`, as long as it's identical in both files.
3. That's it. The language toggle button in the header will now jump straight between the two, instead of falling back to the column's front page.

Not every post needs a translation — it's entirely fine for a post to exist in only one language. If a reader lands on the untranslated language anyway (e.g. someone shares a link), the site shows the version that *does* exist with a small "only available in Czech/English" notice, rather than a broken or empty page.

### 3. Add a photo

**A photo inside a post's text:**
1. Drag the photo file from your file manager and drop it directly onto that post's folder in VS Code's Explorer panel — the same folder as its `index.md`.
2. Reference it in the text by filename only, no path, no slash:
   ```markdown
   ![Popisek fotky pro nevidomé / alt text for the photo](nazev-fotky.jpg)
   ```
3. Preview with `Ctrl+Shift+V` to check it shows up and the description reads well. This preview is close to, but not pixel-identical to, the final styled site — it's there to catch typos and broken image paths, not to show you the final design.

No special syntax, no Astro component to remember — the site automatically finds, optimizes, and resizes every image referenced this way (as WebP, at several sizes for different screens), as long as it lives in the same folder as the post. If a source photo is huge (a modern phone photo easily runs 10+ MB), you don't need to shrink it yourself first — the site does that at build time — though if you have a batch of very large originals, resizing the long edge down to ~2000px before adding them keeps the repository itself smaller.

**As a post's main header image (optional):** add `heroImage: "nazev-fotky.jpg"` to the frontmatter, filename only, same folder as above. Skip this and the post just uses its column's default header photo instead.

**Changing a column's own default header photo, or its accent colour:** that's a code change, not a content change — it lives in `src/lib/columns.ts`, not in any Markdown file. Ask Claude Code (or another developer) to update it, or if you're comfortable editing TypeScript, open that file directly.

### 4. Publish (go live)

1. Open the **Source Control** panel: click its icon in the Activity Bar (left edge of the window — three dots connected by branching lines), or press `Ctrl+Shift+G`.
2. Under **Changes**, you'll see your new/edited files listed — the `.md` file, any photos — each with a **U** (untracked/new) or **M** (modified) badge.
3. Hover over the word **Changes** and click the **+** that appears to stage everything. (Or stage files one at a time by hovering each and clicking its own **+**.)
4. Click into the text box at the top of the panel (placeholder text says "Message") and type a short commit message, e.g. `Nový příspěvek: Název`.
5. Click the blue **checkmark (✓)** above that text box — this commits your staged changes.
6. Click **Sync Changes** (circular-arrows icon, appears in the same panel after committing, also mirrored bottom-left in the status bar) — this pushes to GitHub. Let it pull first if it offers to.
7. Wait about a minute, then check the **Actions** tab on the repository's GitHub.com page — a workflow run should appear and turn green. Once green, it's live at the real URL.

That's the whole loop, every time: **write/edit in VS Code → Source Control panel → stage → commit message → checkmark → Sync Changes → wait for the green checkmark on GitHub.**

---

## Publishing from github.com (fallback, no laptop)

Use this only for small edits when you're away from your machine — it's clumsier for adding new posts with several photos.

**Editing an existing file:**
1. Go to the repository on github.com and browse to the file.
2. Click the pencil (✏️) icon at the top-right of the file view.
3. Edit the text directly in the browser.
4. Scroll down to **Commit changes**, add a short message, choose **Commit directly to the `main` branch**, click **Commit changes**.

**Creating a new post:**
1. In the repo, navigate into `src/content/blog/<column-folder>/` (`materstvi`, `zvedavost`, `outdoor`, or `zivot`).
2. Click **Add file → Create new file**.
3. In the filename box, type the new folder and file in one go, e.g. `2026-09-03-nazev-clanku/index.md` — GitHub creates the folder automatically.
4. Paste in the frontmatter and text (copy the contents of `_template/index.md` as a starting point), then commit as above.

**Adding a photo:**
1. Navigate into the post's folder.
2. Click **Add file → Upload files**, drag the photo in, commit.

---

## Project structure

```
src/
  content/
    blog/
      _template/
        index.md          ← copy this to start a new post (never published — see below)
      materstvi/zvedavost/outdoor/zivot/   ← the four real columns
        <date-slug>/
          index.md         ← the post itself
          photo1.jpg        ← its images, alongside it
      fejetony/            ← leftover Phase 0 test posts — untouched, no longer linked from
                              anywhere (not a registered column, see lib/columns.ts), safe to
                              delete whenever
    pages/                   ← standalone site + column intro pages, one folder per page per language
      home/{cs,en}/, about/{cs,en}/, book/{cs,en}/, publications/{cs,en}/
      materstvi/{cs,en}/, zvedavost/{cs,en}/, outdoor/{cs,en}/, zivot/{cs,en}/  ← column intro text
  content.config.ts          ← typed frontmatter schemas (blog + pages collections)
  data/
    Publications.bib, Talks.bib  ← source of truth for the Publications page — never hardcode entries
  assets/
    columns/                 ← each column's default header image (materstvi.jpg etc.)
  lib/
    i18n.ts                  ← all UI strings (nav, footer, buttons) — not scattered through components
    pages.ts                 ← loads a `pages` entry with cs/en fallback (never a 404 or empty page)
    publications.ts           ← parses the .bib files at build time, groups/sorts/highlights entries
    columns.ts                ← the four columns: slug, title, accent colour, header image — see below
    blog.ts                   ← post queries (draft/column filtering), reading time, related posts
  layouts/Layout.astro        ← shared HTML shell: fonts, Header, Footer, OG/Twitter meta tags
  components/                 ← Header (nav + language toggle), Footer, Newsletter, TranslationNotice
  pages/
    index.astro                    ← root: redirects to /cs/ or /en/ by browser language
    [lang]/index.astro             ← Home
    [lang]/about/index.astro       ← About/CV
    [lang]/publications/index.astro ← Publications
    [lang]/book/index.astro        ← ALEFUJ!
    [lang]/[column]/index.astro    ← a column's index page (header image, intro, post list)
    [lang]/[column]/[slug].astro   ← a single post
    [lang]/rss.xml.ts              ← RSS feed, one per language
.github/workflows/deploy.yml   ← builds and deploys to GitHub Pages on push to main
```

`_template/` sits one folder level shallower than real posts (`blog/_template/` vs. `blog/<column>/<post>/`), so the collection loader's `*/*/index.md` pattern never matches it — copying it is always safe, it will never accidentally get published.

### Columns

The four columns are entirely defined in `src/lib/columns.ts` — slug, Czech/English title, accent colour, and header image. Nothing else in the site hardcodes "four columns": the header nav, the Home page's column list, the RSS feed, and routing all just iterate that array. To add, rename, or retire a column, edit that one file (and add a header image to `src/assets/columns/` if adding one). A post's `column` frontmatter field must match a slug in that array to show up anywhere — posts with an unrecognized column (like the leftover `fejetony` test posts) are simply never rendered, rather than breaking the build.

`zivot` ("Odjinud") has `quiet: true` in the registry, which is the *only* thing that gives it its deliberately quieter treatment (smaller, desaturated header image; muted ink-coloured accent instead of a saturated hue) — nothing else about it is structurally different from the other three, so folding it into another column later is just a content move, not a rearchitecting.

### Images

Every hero/header image (column headers, post headers, the Home page's portrait and column cards) goes through Astro's `<Picture>` component: it's served as WebP with a same-format fallback for browsers that don't support WebP, at multiple sizes via `srcset` so phones don't download desktop-sized images, and lazy-loaded (`loading="lazy"`) everywhere except the two above-the-fold hero slots (column index header, post header), which load eagerly so they don't hurt perceived load time.

Cropping: hero images use `aspect-ratio: 16/9` (or `4/3` for `zivot`'s quieter, narrower treatment) rather than a fixed pixel height, and each column has a hand-picked `heroPosition` (a CSS `object-position` value) in `columns.ts` so the actual subject — not just the geometric centre — stays in frame. Most of the source photos are tall portrait shots being cropped into a wide banner, so getting the vertical position right matters more than the horizontal. If you swap in a new column header photo, check how it crops at both mobile and desktop widths and adjust `heroPosition` if a face ends up too close to the edge — there's no automatic face detection (deliberately: it looked worse, not better, when tried).

Images embedded directly in Markdown body text (inline in a post or in an About/Publications-style page) aren't cropped at all — they display at their full composition, scaled to fit the reading column. Large source photos (multi-megabyte phone photos) are resized down before being added to the repository rather than shipped at full resolution and merely scaled down by CSS, which would download the full file anyway.

### Publications page

The list on `/publications/` is generated entirely from `src/data/Publications.bib` and `Talks.bib` — nothing is hardcoded. To add the plain-language "why this is interesting" note to an entry, add a `significance` field to it in the `.bib` file, e.g.:

```bibtex
significance = {Vysvětlení pro laika, jednou až dvě věty.},
```

Until that field is added, the entry shows a styled placeholder on the live page so it's obvious which of the 27 entries still need one. Note: this field isn't split by language — whatever you write in it appears on both the `/cs/` and `/en/` Publications pages as-is.

### Newsletter signup

The footer form (`src/components/Newsletter.astro`) posts to `ECOMAIL_FORM_ENDPOINT_PLACEHOLDER` in `src/lib/i18n.ts` — a placeholder. Once you've created the real form in Ecomail, copy its embed code's `<form action="...">` URL in there, and check whether Ecomail's own snippet includes extra hidden fields (list id, signature, redirect) that need copying into the form too. The same form also appears at the end of every blog post.

### RSS and sitemap

`/cs/rss.xml` and `/en/rss.xml` each list that language's published posts, newest first (linked from the page `<head>` for feed readers, and from the footer for people). A single sitemap covering every page in both languages is generated automatically at build time by the `@astrojs/sitemap` integration in `astro.config.mjs` — nothing to maintain by hand.

## Commands

| Command | Action |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Local dev server at `localhost:4321` |
| `npm run build` | Build the production site to `./dist/` |
| `npm run preview` | Preview the production build locally |

## Deployment

Every push to `main` triggers `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages. In the repository's **Settings → Pages**, the source must be set to **GitHub Actions** (not "Deploy from a branch") for this to work.

Deployed at the custom domain `vendulasubert.cz`, served from the root (no `base` in `astro.config.mjs`). The domain is set two places, both required: `public/CNAME` (copied verbatim into every build by Astro, so GitHub Pages knows which domain to serve) and the repository's **Settings → Pages → Custom domain**, which is also where the HTTPS certificate lives. If the domain is ever changed, update both, along with `site` in `astro.config.mjs`.

`vendulasubert.com` isn't wired up. GitHub Pages only serves one primary custom domain via `CNAME`; making `.com` also work means either a DNS-level redirect to `.cz` at wherever the `.com` domain is registered, or a separate small redirect page — not something this repo can do on its own.
