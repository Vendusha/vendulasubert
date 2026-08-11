import type { ImageMetadata } from 'astro';
import materstviImg from '../assets/columns/materstvi.jpg';
import zvedavostImg from '../assets/columns/zvedavost.jpg';
import outdoorImg from '../assets/columns/outdoor.jpg';
import zivotImg from '../assets/columns/zivot.jpg';

export interface ColumnDef {
	slug: string;
	title: { cs: string; en: string };
	/** Muted, editorial hue — same lightness/saturation family as the base
	 * --accent, just a different one per column, per the design brief. */
	accent: string;
	heroImage: ImageMetadata;
	/** "zivot" gets a visibly quieter treatment: desaturated accent, smaller
	 * header. Not a permanent fixture — it may get folded into the other
	 * columns later, so nothing else in the app assumes 4 columns exist. */
	quiet?: boolean;
}

// Adding, renaming, or removing a column is just editing this array — no
// other file hardcodes "four columns" or any specific slug.
export const COLUMNS: ColumnDef[] = [
	{
		slug: 'materstvi',
		title: { cs: 'Fejetony o mateřství', en: 'Notes on parenthood' },
		accent: '#a24e63',
		heroImage: materstviImg,
	},
	{
		slug: 'zvedavost',
		title: { cs: 'CERN a jiná místa pro zvědavé', en: 'CERN and other places for the curious' },
		accent: '#2e5c8a',
		heroImage: zvedavostImg,
	},
	{
		slug: 'outdoor',
		title: {
			cs: 'Příběhy ze světa outdooru s dětmi i bez dětí',
			en: 'Outdoor stories, with kids and without',
		},
		accent: '#3b6142',
		heroImage: outdoorImg,
	},
	{
		slug: 'zivot',
		title: { cs: 'Odjinud', en: 'Dispatches' },
		accent: '#58514a',
		heroImage: zivotImg,
		quiet: true,
	},
];

export function getColumn(slug: string): ColumnDef | undefined {
	return COLUMNS.find((c) => c.slug === slug);
}
