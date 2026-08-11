import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getBlogPosts } from '../../lib/blog';
import { getColumn } from '../../lib/columns';
import { siteName, locales, type Locale } from '../../lib/i18n';

export function getStaticPaths() {
	return locales.map((lang) => ({ params: { lang } }));
}

export async function GET(context: APIContext) {
	const lang = context.params.lang as Locale;
	const base = import.meta.env.BASE_URL;
	const posts = await getBlogPosts(lang);

	return rss({
		title: siteName,
		description:
			lang === 'cs'
				? 'Sloupky o vědě, rodičovství, outdooru a životě mezi kontinenty.'
				: 'Columns about science, parenthood, the outdoors, and life between continents.',
		site: context.site!,
		items: posts.map((post) => {
			const column = getColumn(post.data.column);
			const slug = post.id.split('/')[1];
			return {
				title: post.data.title,
				description: post.data.summary,
				pubDate: post.data.date,
				link: `${base}${lang}/${post.data.column}/${slug}/`,
				categories: column ? [column.title[lang]] : undefined,
			};
		}),
	});
}
