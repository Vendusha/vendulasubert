// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

// Served at the root of the custom domain (see public/CNAME) — no `base`
// needed. If custom domain hosting is ever dropped in favour of the default
// github.io/<repo> project-page URL, `site` reverts to the github.io URL
// and `base` needs to come back as '/vendulasubert/'.
// https://astro.build/config

// Keep in sync with the slugs in src/lib/columns.ts.
const COLUMN_SLUGS = ['outdoor', 'zvedavost', 'zapisky'];

// English column indexes with no published post are noindex'd on the page
// itself (see [column]/index.astro), so they must also stay out of the sitemap.
function emptyEnglishColumns() {
	const blogDir = 'src/content/blog';
	/** @type {Map<string, number>} */
	const published = new Map(COLUMN_SLUGS.map((slug) => [slug, 0]));
	for (const column of readdirSync(blogDir)) {
		const columnDir = join(blogDir, column);
		if (!statSync(columnDir).isDirectory()) continue;
		for (const post of readdirSync(columnDir)) {
			const file = join(columnDir, post, 'index.md');
			/** @type {string} */
			let text;
			try {
				text = readFileSync(file, 'utf8');
			} catch {
				continue;
			}
			const frontmatter = text.split('---')[1] ?? '';
			const isEn = /^lang:\s*"?en"?/m.test(frontmatter);
			const isDraft = /^draft:\s*true/m.test(frontmatter);
			const col = frontmatter.match(/^column:\s*"?([^"\n]+)"?/m)?.[1] ?? '';
			const count = published.get(col);
			if (isEn && !isDraft && count !== undefined) published.set(col, count + 1);
		}
	}
	return new Set([...published].filter(([, count]) => count === 0).map(([slug]) => slug));
}

const REDIRECT_STUBS = [
	'/',
	'/cs/about/',
	'/en/about/',
	'/cs/o-mne/',
	'/en/o-mne/',
	'/cs/publications/',
	'/en/publications/',
	'/cs/materstvi/',
	'/en/materstvi/',
	'/cs/zivot/',
	'/en/zivot/',
];

const emptyEn = emptyEnglishColumns();

// https://astro.build/config
export default defineConfig({
	site: 'https://vendulasubert.cz',
	integrations: [
		sitemap({
			filter: (page) => {
				const path = new URL(page).pathname;
				if (REDIRECT_STUBS.includes(path)) return false;
				const enColumn = path.match(/^\/en\/([^/]+)\/$/);
				const slug = enColumn?.[1] ?? '';
				if (emptyEn.has(slug)) return false;
				return true;
			},
		}),
	],
});
