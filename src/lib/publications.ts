import { parse } from '@retorquere/bibtex-parser';
// Imported as raw text (Vite feature) rather than read via fs at build time:
// Astro relocates this module into dist/.prerender/ during the build, which
// breaks any path resolved relative to import.meta.url.
import publicationsBibSource from '../data/Publications.bib?raw';
import talksBibSource from '../data/Talks.bib?raw';

// Surnames Vendula has published under. Matched after stripping diacritics,
// so "Šubert" and "Subert" both match, likewise "Maulerova-Subert".
const VENDULA_SURNAMES = ['maulerova', 'maulerova-subert', 'subert'];

function stripDiacritics(s: string): string {
	return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function isVendula(lastName: string): boolean {
	return VENDULA_SURNAMES.includes(stripDiacritics(lastName).toLowerCase());
}

function isEtAl(lastName: string): boolean {
	return stripDiacritics(lastName).toLowerCase().replace(/\\/g, '') === 'etal';
}

// Unescapes the handful of LaTeX escapes that survive into URL/DOI fields
// (e.g. the EPL entry's doi.org link contains literal "\%2F").
function unescapeLatex(s: string): string {
	return s.replace(/\\%/g, '%').replace(/\\_/g, '_').replace(/\\&/g, '&').trim();
}

export type PubGroup = 'journal' | 'proceedings' | 'thesis' | 'deliverable';

export interface PubAuthor {
	name: string;
	isYou: boolean;
	isEtAl: boolean;
}

export interface PubLink {
	url: string;
	type: 'doi' | 'arxiv' | 'url';
}

export interface Publication {
	key: string;
	group: PubGroup;
	title: string;
	authors: PubAuthor[];
	venue: string;
	year: number;
	month?: number;
	note?: string;
	isFirstAuthor: boolean;
	link?: PubLink;
	significance?: string;
}

function fieldToString(value: unknown): string | undefined {
	if (value === undefined || value === null) return undefined;
	if (Array.isArray(value)) return value.join(', ');
	return String(value);
}

function classify(type: string, fields: Record<string, unknown>): PubGroup {
	const t = type.toLowerCase();
	if (t === 'article') return 'journal';
	if (t === 'inproceedings' || t === 'proceedings' || t === 'conference') return 'proceedings';

	const note = fieldToString(fields.note) ?? '';
	if (/thesis/i.test(note)) return 'thesis';

	const doi = fieldToString(fields.doi) ?? '';
	if (/brightness/i.test(doi)) return 'deliverable';

	// Any other @misc (e.g. an arXiv-only facility paper) reads most like
	// a proceedings/talk entry rather than a journal article.
	return 'proceedings';
}

function buildLink(fields: Record<string, unknown>): PubLink | undefined {
	const doi = fieldToString(fields.doi);
	if (doi) {
		const clean = unescapeLatex(doi);
		const url = /^https?:\/\//i.test(clean) ? clean : `https://doi.org/${clean}`;
		return { url, type: 'doi' };
	}

	const eprint = fieldToString(fields.eprint);
	if (eprint && /^arxiv:/i.test(eprint)) {
		const id = eprint.replace(/^arxiv:/i, '').trim();
		return { url: `https://arxiv.org/abs/${id}`, type: 'arxiv' };
	}

	const url = fieldToString(fields.url);
	if (url) {
		return { url: unescapeLatex(url), type: 'url' };
	}

	return undefined;
}

function buildAuthors(fields: Record<string, unknown>): PubAuthor[] {
	const raw = fields.author as Array<{ firstName?: string; lastName?: string }> | undefined;
	if (!Array.isArray(raw)) return [];
	return raw.map((a) => {
		const lastName = a.lastName ?? '';
		if (isEtAl(lastName)) {
			return { name: 'et al.', isYou: false, isEtAl: true };
		}
		const name = [a.firstName, lastName].filter(Boolean).join(' ').trim();
		return { name, isYou: isVendula(lastName), isEtAl: false };
	});
}

let cached: Publication[] | undefined;

export function getPublications(): Publication[] {
	if (cached) return cached;

	const sources = [publicationsBibSource, talksBibSource];

	const publications: Publication[] = [];

	for (const source of sources) {
		const { entries } = parse(source, { sentenceCase: false });
		for (const entry of entries) {
			const fields = entry.fields as Record<string, unknown>;
			const authors = buildAuthors(fields);
			const group = classify(entry.type, fields);
			const venue = fieldToString(fields.journal) ?? fieldToString(fields.booktitle) ?? '';
			const year = parseInt(fieldToString(fields.year) ?? '', 10);
			const monthRaw = fieldToString(fields.month);
			const month = monthRaw ? parseInt(monthRaw, 10) : undefined;

			publications.push({
				key: entry.key,
				group,
				title: fieldToString(fields.title) ?? '(untitled)',
				authors,
				venue,
				year: Number.isFinite(year) ? year : 0,
				month: Number.isFinite(month) ? month : undefined,
				note: fieldToString(fields.note),
				isFirstAuthor: group === 'journal' && authors.length > 0 && authors[0].isYou,
				link: buildLink(fields),
				significance: fieldToString(fields.significance),
			});
		}
	}

	publications.sort((a, b) => {
		if (b.year !== a.year) return b.year - a.year;
		return (b.month ?? 6) - (a.month ?? 6);
	});

	cached = publications;
	return publications;
}
