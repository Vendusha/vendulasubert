import type { Locale } from '../lib/i18n';

/** A text field that may eventually have both languages — same idea as
 * ColumnDef in lib/columns.ts, except `en` is optional here because the
 * English music page doesn't exist yet. `pick()` below falls back to `cs`
 * when `en` is missing, so filling in `en` later (per song, per category)
 * is the only change needed to bring a piece of English online — nothing
 * to restructure. */
export interface Localized {
	cs: string;
	en?: string;
}

export function pick(field: Localized, lang: Locale): string {
	return field[lang] ?? field.cs;
}

export interface MusicCategory {
	id: string;
	title: Localized;
	/** Short intro shown under the category heading, before any songs. */
	intro: Localized;
	/** Optional outbound link related to the category (e.g. the book the
	 * songs are from) — shown as a small link under the intro. */
	link?: string;
	/** Categories with visible: false are never rendered (and their songs,
	 * if any, simply won't appear there) — a place to draft a category
	 * before it's ready, same spirit as a post's draft: true. */
	visible: boolean;
}

export type SongPlatform = 'youtube' | 'soundcloud';
export type SongStatus = 'published' | 'draft';

export interface Song {
	id: string;
	title: Localized;
	/** One short paragraph, 1–3 sentences. */
	description: Localized;
	/** Category ids this song belongs to. The FIRST one is where the song
	 * renders in full (player + description); in any other category it
	 * listed in, it's just a compact link back to that first occurrence. */
	categories: string[];
	/** draft songs never render anywhere — not as a card, not as a compact
	 * link — same convention as a blog post's draft: true. */
	status: SongStatus;
	platform: SongPlatform;
	/** Required when platform is 'youtube'. */
	youtubeId?: string;
	/** Required when platform is 'soundcloud' (the outbound link for the
	 * card) — also usable as a generic fallback link for other platforms. */
	url?: string;
	/** At most one song should have this set — it repeats at the top of the
	 * page, in addition to its normal appearance in its own category. */
	featured?: boolean;
	lyrics?: Localized;
}

// Order here is the order categories render on the page. Adding, reordering,
// or hiding (visible: false) a category is just editing this array.
export const MUSIC_CATEGORIES: MusicCategory[] = [
	{
		id: 'ze-zivota',
		title: { cs: 'Ze života' },
		intro: { cs: 'Písničky, které vznikaly pro různé příležitosti.' },
		visible: true,
	},
	{
		id: 'alefuj',
		title: { cs: 'Z knihy ALEFUJ!' },
		intro: {
			cs: 'V knize ALEFUJ! je skládá Veronika. Já jsem si je dovolila zhudebnit.',
		},
		link: 'https://alefuj.cz/cs/',
		visible: true,
	},
	{
		id: 'pro-deti',
		title: { cs: 'Pro děti' },
		intro: {
			cs: 'Nesnáším uklinkané dětské melodie. Tak se snažím dělat si svoje vlastní lidovky.',
		},
		visible: true,
	},
	{
		id: 's-bratrem',
		title: { cs: 'S bratrem' },
		intro: { cs: 'TODO – doplním.' },
		visible: false,
	},
	{
		id: 'hlasem',
		title: { cs: 'Hlasem místo orchestru' },
		intro: { cs: 'TODO – doplním.' },
		visible: false,
	},
];

export const SONGS: Song[] = [
	{
		id: 'zivotni-partner',
		title: { cs: 'Životní partner' },
		description: {
			cs: 'Mírně satirická písnička o mladistvém hledání partnera. Moje paní učitelka vždycky říkala, že by už mladá být nechtěla – vybírat si zaměstnání a životního partnera. Pomalu se dostávám do fáze, kdy si myslím totéž, a tohle je vzpomínka na ta léta snahy zaujmout někoho, kdo možná chce, ale možná taky nechce být zaujat.',
		},
		// Already shown once at the top as the featured song — kept out of
		// "Ze života" so it doesn't render there a second time right below
		// it; it still has a home (in full) under "Z knihy ALEFUJ!".
		categories: ['alefuj'],
		status: 'published',
		platform: 'youtube',
		youtubeId: 'X0lMcfhJ6LQ',
		featured: true,
	},
	{
		id: 'svatebni',
		title: { cs: 'Pár hvězd tmou' },
		description: {
			cs: 'Napsala jsem ji na svatbu přátel, u kterých se to hledání naopak završilo šťastným koncem. Doplněná o outdoorová videa, protože outdoor je vždycky hezký.',
		},
		categories: ['ze-zivota'],
		status: 'published',
		platform: 'youtube',
		youtubeId: 'Cj-3F9i3TMg',
	},
	{
		id: 'kocka-leze-dirou',
		title: { cs: 'Kočka leze dírou' },
		description: { cs: 'TODO – doplním.' },
		categories: ['pro-deti'],
		status: 'draft',
		platform: 'youtube',
		// No youtubeId yet — fine while status is 'draft', since draft songs
		// never render. Add one before flipping this to 'published'.
	},
];

export function getVisibleCategories(): MusicCategory[] {
	return MUSIC_CATEGORIES.filter((c) => c.visible);
}

export function getFeaturedSong(): Song | undefined {
	return SONGS.find((s) => s.status === 'published' && s.featured);
}

export interface CategorySongEntry {
	song: Song;
	/** True when this category is the song's first (primary) category —
	 * the one place it renders in full. */
	isPrimary: boolean;
}

/** Every published song listed under this category, in SONGS order, each
 * flagged for whether this is its primary (full-render) category or not
 * (compact-link-only). Draft songs are already excluded here. */
export function getCategorySongs(categoryId: string): CategorySongEntry[] {
	return SONGS.filter((s) => s.status === 'published' && s.categories.includes(categoryId)).map(
		(song) => ({ song, isPrimary: song.categories[0] === categoryId })
	);
}
