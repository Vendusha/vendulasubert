# vendulasubert.cz / vendulasubert.com

Personal site: professional/CV page + Czech-first humorous columns ("fejetony"), bilingual (cs/en), built with [Astro](https://astro.build), hosted on GitHub Pages, deployed automatically by GitHub Actions on every push to `main`.

**Status: Phase 2.** The publishing pipeline (Phase 0) and the bilingual site skeleton — Home, About/CV, Publications, ALEFUJ! (Phase 1) — are both done. The four real blog columns now exist too, each with its own index page, header image, and accent colour, sharing one post system: reading time, related posts, a newsletter signup at the end of every post, per-language RSS feeds, and a sitemap. One placeholder sample post exists per column in both languages so the layout and frontmatter are visible by example — replace them with real writing whenever you're ready (see "Publishing a post" below).

---

## Publishing a post (VS Code — do this one)

This is the only workflow you need for day-to-day writing. No terminal, no GitHub Desktop.

### 1. Start a new post from the template

1. In the **Explorer** panel (top icon in the left-hand Activity Bar — looks like two stacked pages), open `src/content/blog/`.
2. Inside it, open the folder for the column your post belongs to: `materstvi`, `zvedavost`, `outdoor`, or `zivot`.
3. Right-click the `_template` folder → **Copy**, then right-click your column folder → **Paste**.
4. Right-click the pasted folder (it'll be called `_template` or `_template (copy)`) → **Rename**, and give it today's date plus a short slug, e.g. `2026-09-03-nazev-clanku`. This folder name becomes the post's URL, so use lowercase, hyphens, no spaces or accents.
5. Open the `index.md` file inside your new folder.
6. Fill in the frontmatter at the top (between the `---` lines): `title`, `date`, `column` (must exactly match the folder name from step 2), `lang` (`cs` or `en`), `summary`. Leave `translationKey`, `heroImage`, and `draft` commented out unless you need them — see the comments in the file for what each one does.
7. Write your post below the second `---`, in plain Markdown.
8. Save (`Ctrl+S`).

If a post exists in both languages, that is **two separate files in two separate folders** (e.g. `2026-09-03-nazev-clanku/` for the Czech version and `2026-09-03-post-title/` for the English one), and both files need the same `translationKey` value so the language toggle can jump directly between them — not two languages in one file.

Want to work on a post without publishing it yet? Set `draft: true`. It'll show up when you run `npm run dev` locally, but is automatically left out of the live site — no need to remember to remove it before pushing, only before you actually want it live (flip it to `false` or delete the line).

### 2. Add photos

1. In your file manager, locate the photo you want.
2. Drag the photo file and drop it directly onto your post's folder in VS Code's Explorer panel (the same folder that contains that post's `index.md`).
3. In the text, reference it by filename only — no path, no slash:

   ```markdown
   ![Popisek fotky pro nevidomé / alt text for the photo](nazev-fotky.jpg)
   ```

   That's it — no special Astro syntax needed. Astro automatically finds, optimizes, and resizes any image referenced this way, as long as it lives in the same folder as the post (this is why each post gets its own folder). Because the path is a plain relative filename, it also just works in VS Code's built-in preview.

4. Preview your post with `Ctrl+Shift+V` (or click the preview icon in the top-right of the editor tab). Check the image shows up and formatting looks right. This preview is close to, but not pixel-identical to, the final styled site — its job is to catch typos and broken image paths before you push, not to show you the final design.

### 3. Publish (commit and push)

1. Open the **Source Control** panel: click its icon in the Activity Bar (left edge of the window — it looks like three dots connected by branching lines), or press `Ctrl+Shift+G`.
2. Under **Changes**, you'll see your new files listed — the `.md` file and the photo(s) — each with a **U** badge (untracked/new).
3. Hover over the word **Changes** and click the **+** that appears on the right to stage everything. (You can also stage files one at a time by hovering each one and clicking its own **+**.)
4. Click into the text box at the top of the panel (placeholder text says "Message") and type a short commit message, e.g. `Nový příspěvek: Název`.
5. Click the blue **checkmark (✓)** button above that text box — this commits your staged changes.
6. Click **Sync Changes** (a circular-arrows icon that appears in the same panel after committing, also mirrored in the bottom-left of the status bar) — this pushes your commit to GitHub. If it also offers to pull first, let it.
7. Wait about a minute, then check the **Actions** tab on the repository's GitHub.com page — a workflow run should appear and turn green. Once it's green, your post is live.

That's the whole loop: **copy template → rename → fill in → drag in photos → Source Control panel → stage → commit → sync.**

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

## Image syntax — confirmed

Always write images as a bare relative filename, no folder, no leading slash:

```markdown
![Alt text](photo1.jpg)
```

This works because every post is its own folder (`index.md` + its photos side by side), so `photo1.jpg` always means "the file called `photo1.jpg` sitting right next to this post." It resolves correctly in VS Code's Markdown preview *and* Astro automatically optimizes it into a resized/compressed `.webp` at build time — no extra component or import needed.

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

Currently deployed at the default GitHub Pages URL for this repo. Custom domains (`vendulasubert.cz` / `vendulasubert.com`) and their DNS setup haven't been wired up yet — `astro.config.mjs` will need `base` changed from `/vendulasubert/` back to `/` when that happens, since a custom domain serves from the root instead of a `/vendulasubert/` subpath.
