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
		id: 'pro-deti',
		title: { cs: 'Pro děti', en: 'For kids' },
		intro: {
			cs: 'Snažím se předělávat tradičně české dětské lidovky tak, aby je mohli poslouchat i dospělí.',
			en:
				'I try to rework traditional Czech children’s songs so adults can listen to them too. ' +
				"This is the one part of my music I'm not planning to translate into English :)",
		},
		visible: true,
	},
	{
		id: 'ze-zivota',
		title: { cs: 'Ze života', en: 'From life' },
		intro: {
			cs: 'Písničky, které vznikaly pro různé příležitosti.',
			en: 'Songs written for various occasions.',
		},
		visible: true,
	},
	{
		id: 'alefuj',
		title: { cs: 'Z knihy ALEFUJ!', en: 'From the book ALEFUJ!' },
		intro: {
			cs: 'V knize ALEFUJ! je skládá Veronika. Já jsem si je dovolila zhudebnit.',
			en: 'In the book ALEFUJ!, these are written by the character Veronika. I took the liberty of setting them to music.',
		},
		link: 'https://alefuj.cz/cs/',
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
			cs:
				'Satirická písnička o hledání životního partnera. Moje paní učitelka vždycky říkala, že by už mladá být nechtěla – vybírat si zaměstnání a životního partnera. Pomalu se dostávám do fáze, kdy si myslím totéž, a tohle je vzpomínka na ta léta snahy zaujmout někoho, kdo možná chce, ale možná taky nechce být zaujat. A že je někdy možná lepší být sám sebou.',
			en:
				"A Czech satirical song (I've got the English version written, recorded and ready — it'll go up here in two weeks) about looking for a life partner. My teacher always used to say she wouldn't want to be young again — choosing a career and a life partner. I'm slowly getting to the stage where I think the same, and this is a memory of those years spent trying to catch the interest of someone who might want to be caught, or might not. And that maybe it's sometimes better to just be yourself.",
		},
		categories: ['alefuj'],
		status: 'published',
		platform: 'youtube',
		youtubeId: 'X0lMcfhJ6LQ',
	},
	{
		id: 'svatebni',
		title: { cs: 'Pár hvězd tmou' },
		description: {
			cs: 'Jedna z vážnějších písní mého repertoáru: napsala jsem ji na svatbu svých přátel. Doplněná o outdoorová videa, protože outdoor je vždycky hezký.',
			en:
				"One of the more serious songs in my repertoire (an English version will be added here eventually): I wrote it for my friends' wedding. With some outdoor footage mixed in, because the outdoors always looks nice.",
		},
		categories: ['ze-zivota'],
		status: 'published',
		platform: 'youtube',
		youtubeId: 'Cj-3F9i3TMg',
	},
	{
		id: 'kocka-leze-dirou',
		title: { cs: 'Kočka leze dírou (jazz)' },
		description: {
			cs:
				'Jednoho dne za mnou přišel zoufalý Eda: „Vendy, mám pro tebe hudební projekt. Nesnáším dětské nahrávky, mám pocit, že mi z nich praskne hlava. Můžeš nahrát dětskou lidovku, ale nějak normálně?“\n\n' +
				'Tak jsem se snažila. „Tohle jsem přesně nemyslel“ řekl Eda, když uslyšel můj hudební počin a dodal, že si myslí, že tentokrát je sice hudba poslouchatelná pro dospělé, ale už ne pro děti.\n\n' +
				'Náš syn to ale nevěděl a i když nemám kdovíjakou radost poslouchat svoje amatérské nahrávky pořád dokola, možná, že to přece jen bylo, alespoň částečné řešení (trochu se stydící smajlík.)',
			en:
				'One day, a desperate Eda came to me: “Vendy, I’ve got a music project for you. I can’t stand children’s recordings — I feel like my head’s about to split open. Could you record a kids’ folk song, but, like, normally?”\n\n' +
				'So I tried. “That’s not quite what I meant,” Eda said once he heard what I’d made, adding that this time the music was listenable for adults, sure — just not for kids anymore.\n\n' +
				'Our son had no idea, though, and even though I’m not thrilled about listening to my own amateur recordings on repeat, maybe it was at least a partial solution (a slightly embarrassed smiley).',
		},
		categories: ['pro-deti'],
		status: 'published',
		platform: 'youtube',
		youtubeId: 'KUqBtbBJJk4',
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
