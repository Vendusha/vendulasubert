import { getCollection, type CollectionEntry } from 'astro:content';
import { getColumn } from './columns';
import type { Locale } from './i18n';

const WORDS_PER_MINUTE = 200;

function isPublished(data: CollectionEntry<'blog'>['data']): boolean {
	// Drafts render in `astro dev` so they can be previewed locally, but are
	// excluded whenever the site is actually built (local `npm run build` or
	// the CI build that deploys to GitHub Pages) — import.meta.env.PROD is
	// true in both of those, false only under the dev server.
	return import.meta.env.DEV || !data.draft;
}

function isRealColumn(column: string): boolean {
	return !!getColumn(column);
}

/** All published posts, in the given language, belonging to a registered
 * column — sorted newest first. Excludes leftover/orphaned test content
 * whose `column` isn't in the COLUMNS registry. */
export async function getBlogPosts(lang: Locale): Promise<CollectionEntry<'blog'>[]> {
	const posts = await getCollection(
		'blog',
		(entry) => entry.data.lang === lang && isPublished(entry.data) && isRealColumn(entry.data.column)
	);
	return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getColumnPosts(
	columnSlug: string,
	lang: Locale
): Promise<CollectionEntry<'blog'>[]> {
	const posts = await getBlogPosts(lang);
	return posts.filter((p) => p.data.column === columnSlug);
}

export async function getRelatedPosts(
	current: CollectionEntry<'blog'>,
	limit = 3
): Promise<CollectionEntry<'blog'>[]> {
	const posts = await getColumnPosts(current.data.column, current.data.lang);
	return posts.filter((p) => p.id !== current.id).slice(0, limit);
}

// Strips the handful of Markdown constructs that would otherwise inflate
// the word count (image/link syntax, heading markers, emphasis markers)
// before counting words. Doesn't need to be exact — it's an estimate.
export function estimateReadingTime(markdownBody: string): number {
	const text = markdownBody
		.replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
		.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
		.replace(/[#>*_`~-]/g, ' ');
	const words = text.split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
