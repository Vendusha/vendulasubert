import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Each post lives at: src/content/blog/<column-slug>/<post-slug>/index.md
// (post text + its own images sit together in one folder — the "page bundle" pattern).
// The pattern below only matches two levels deep, so src/content/blog/_template/
// (one level deep) is automatically excluded and never published.
const blog = defineCollection({
	loader: glob({ pattern: '*/*/index.md', base: './src/content/blog' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			date: z.coerce.date(),
			// The column a post belongs to (also the folder it lives in — kept as
			// its own field, rather than derived from the path, so authors can see
			// and set it directly in the frontmatter). Not a strict enum of the
			// four current columns: that would break if a column is ever renamed,
			// merged, or retired (see src/lib/columns.ts) and would fail the whole
			// collection's validation for one typo. Which columns actually get a
			// nav entry, index page, and header image is entirely driven by the
			// COLUMNS registry, not by this schema.
			column: z.string(),
			lang: z.enum(['cs', 'en']),
			// Shared between a Czech post and its English counterpart so the
			// language toggle can link directly between them even though their
			// slugs differ. Omit if this post has no translation.
			translationKey: z.string().optional(),
			summary: z.string(),
			// Optional: falls back to the column's default header image when
			// omitted. Just a filename, same as inline images — see the template.
			heroImage: image().optional(),
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
