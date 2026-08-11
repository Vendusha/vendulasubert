import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Each post lives at: src/content/blog/<column-slug>/<post-slug>/index.md
// (post text + its own images sit together in one folder — the "page bundle" pattern).
// The pattern below only matches two levels deep, so src/content/blog/_template/
// (one level deep) is automatically excluded and never published.
const blog = defineCollection({
	loader: glob({ pattern: '*/*/index.md', base: './src/content/blog' }),
	schema: z.object({
		title: z.string(),
		lang: z.enum(['cs', 'en']),
		pubDate: z.coerce.date(),
		description: z.string().optional(),
		draft: z.boolean().default(false),
	}),
});

// Standalone site pages (home, about, book, publications intro) — one
// markdown file per language, e.g. src/content/pages/about/cs/index.md and
// src/content/pages/about/en/index.md. Entry id is "<page-key>/<lang>",
// e.g. "about/cs", which is exactly how pages look them up.
const pages = defineCollection({
	loader: glob({ pattern: '*/*/index.md', base: './src/content/pages' }),
	schema: z.object({
		title: z.string(),
		lang: z.enum(['cs', 'en']),
		description: z.string().optional(),
	}),
});

export const collections = { blog, pages };
