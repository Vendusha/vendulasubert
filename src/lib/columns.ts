import type { ImageMetadata } from 'astro';
import outdoorImg from '../assets/columns/outdoor.jpg';
import zvedavostImg from '../assets/columns/zvedavost.jpg';
import zapiskyImg from '../assets/columns/zapisky.jpg';

export interface ColumnDef {
	slug: string;
	title: { cs: string; en: string };
	/** One-line teaser shown on the homepage card. Deliberately separate
	 * from the column's own page intro (src/content/pages/<slug>/) — that
	 * intro can run longer or include an image (zvedavost's does), which
	 * wouldn't fit in a small homepage card. */
	description: { cs: string; en: string };
	/** Muted, editorial hue — same lightness/saturation family as the base
	 * --accent, just a different one per column, per the design brief. */
	accent: string;
	heroImage: ImageMetadata;
	/** CSS object-position for the header crop — hand-picked per photo so
	 * the actual subject (not just the geometric centre) stays in frame. */
	heroPosition?: string;
	quiet?: boolean;
}

// Order here is nav order and homepage order — currently outdoor, zvedavost,
// zapisky (zapisky deliberately last: it's the open-ended one, the other two
// make a specific promise). Adding, renaming, reordering, or removing a
// column is just editing this array — no other file hardcodes "N columns"
// or any specific slug.
export const COLUMNS: ColumnDef[] = [
	{
		slug: 'outdoor',
		title: {
			cs: 'Outdoor s dětmi i před dětmi',
			en: 'Outdoors, with kids and before them',
		},
		description: {
			cs: 'Zde se střídají články o tom, co nás nadchlo, když jsme ještě děti neměli, a o tom, jak se jim snažíme lásku k outdooru předat.',
			en: "Here you'll find pieces about what excited us before we had kids, alongside ones about how we're trying to pass on our love of the outdoors to them now.",
		},
		accent: '#3b6142',
		heroImage: outdoorImg,
		heroPosition: 'center 38%',
	},
	{
		slug: 'zvedavost',
		title: { cs: 'Fyzika a jiné zvědavosti', en: 'Physics and other curiosities' },
		description: {
			cs: 'Zde se snažím lidskou formou povídat o fyzice. Články jsou převážně z doby, kdy jsem pracovala v zahraničí.',
			en: 'Here I try to talk about physics in human terms. Most of these pieces are from my years working abroad.',
		},
		accent: '#2e5c8a',
		heroImage: zvedavostImg,
		heroPosition: 'center 22%',
	},
	{
		slug: 'zapisky',
		title: { cs: 'Zápisky', en: 'Notes' },
		description: {
			cs: 'Krátké věci, o které se chci podělit. Občas tip k dětem, občas něco úplně jiného.',
			en: 'Short things I want to share. Sometimes a tip about kids, sometimes something completely different.',
		},
		accent: '#a24e63',
		heroImage: zapiskyImg,
		heroPosition: 'center 12%',
	},
];

export function getColumn(slug: string): ColumnDef | undefined {
	return COLUMNS.find((c) => c.slug === slug);
}
