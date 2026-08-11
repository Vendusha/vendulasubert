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

export const collections = { blog };
