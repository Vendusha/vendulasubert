# vendulasubert.cz / vendulasubert.com

Personal site: professional/CV page + Czech-first humorous columns ("fejetony"), bilingual (cs/en), built with [Astro](https://astro.build), hosted on GitHub Pages, deployed automatically by GitHub Actions on every push to `main`.

**Status: Phase 0.** The real bilingual site (language toggle, newsletter form, styling, custom domains) hasn't been built yet. What exists right now is only the publishing pipeline — proven end-to-end with one throwaway test post — so that writing and publishing works before anything else is built on top of it.

---

## Publishing a post (VS Code — do this one)

This is the only workflow you need for day-to-day writing. No terminal, no GitHub Desktop.

### 1. Start a new post from the template

1. In the **Explorer** panel (top icon in the left-hand Activity Bar — looks like two stacked pages), open `src/content/blog/`.
2. Inside it, find the column folder your post belongs to (e.g. `fejetony`), or right-click `blog` → **New Folder** to start a new column.
3. Right-click the `_template` folder → **Copy**, then right-click your column folder → **Paste**.
4. Right-click the pasted folder (it'll be called `_template` or `_template (copy)`) → **Rename**, and give it today's date plus a short slug, e.g. `2026-09-03-nazev-clanku`. This folder name becomes the post's URL, so use lowercase, hyphens, no spaces or accents.
5. Open the `index.md` file inside your new folder.
6. Fill in the frontmatter at the top (between the `---` lines): `title`, `lang` (`cs` or `en`), `pubDate`. Leave `description` and `draft` commented out unless you need them — see the comments in the file for what each field does.
7. Write your post below the second `---`, in plain Markdown.
8. Save (`Ctrl+S`).

If a post exists in both languages, that is **two separate files in two separate folders** (e.g. `2026-09-03-nazev-clanku/` for the Czech version and `2026-09-03-post-title/` for the English one) — not two languages in one file.

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
1. In the repo, navigate into `src/content/blog/<column-folder>/`.
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
      <column-slug>/
        <date-slug>/
          index.md         ← the post itself
          photo1.jpg        ← its images, alongside it
  content.config.ts         ← typed frontmatter schema for the blog collection
  pages/
    index.astro              ← PHASE 0 placeholder post list (replaced in Phase 1)
    blog/[...slug].astro      ← PHASE 0 placeholder post renderer (replaced in Phase 1)
.github/workflows/deploy.yml  ← builds and deploys to GitHub Pages on push to main
```

`_template/` sits one folder level shallower than real posts (`blog/_template/` vs. `blog/<column>/<post>/`), so the collection loader's `*/*/index.md` pattern never matches it — copying it is always safe, it will never accidentally get published.

## Commands

| Command | Action |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Local dev server at `localhost:4321` |
| `npm run build` | Build the production site to `./dist/` |
| `npm run preview` | Preview the production build locally |

## Deployment

Every push to `main` triggers `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages. In the repository's **Settings → Pages**, the source must be set to **GitHub Actions** (not "Deploy from a branch") for this to work.

Currently deployed at the default GitHub Pages URL for this repo. Custom domains (`vendulasubert.cz` / `vendulasubert.com`) and their DNS setup are a Phase 1 task, done once this Phase 0 workflow is confirmed working.
