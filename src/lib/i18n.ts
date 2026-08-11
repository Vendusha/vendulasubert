export const locales = ['cs', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'cs';

export const siteName = 'Vendula Šubert';

// Ecomail form action URL — replace once the real Ecomail signup form exists.
// Find it in Ecomail: Forms → your form → Embed code → the <form action="...">.
export const ECOMAIL_FORM_ENDPOINT_PLACEHOLDER =
	'https://REPLACE-ME.ecomailapp.cz/public/subscribe/FORM_ID/FORM_SIGNATURE';

interface Translations {
	nav: {
		about: string;
		publications: string;
		book: string;
		langToggleTo: string; // e.g. "EN" shown while on the Czech site
	};
	home: {
		heading: string;
		columnsHeading: string;
		columnsNote: string;
		columns: string[];
	};
	footer: {
		newsletterHeading: string;
		newsletterBody: string;
		emailLabel: string;
		emailPlaceholder: string;
		submitLabel: string;
		copyright: string;
	};
	translationNotice: {
		onlyInCzech: string;
		onlyInEnglish: string;
	};
	publications: {
		title: string;
		orcidLabel: string;
		groupJournal: string;
		groupProceedings: string;
		groupThesis: string;
		groupDeliverable: string;
		filterAll: string;
		firstAuthorBadge: string;
		significancePlaceholder: string;
		significanceHeading: string;
		linkDoi: string;
		linkArxiv: string;
		linkUrl: string;
		presentation: string;
		poster: string;
	};
	book: {
		statusLabel: string;
		ctaLabel: string;
	};
}

export const translations: Record<Locale, Translations> = {
	cs: {
		nav: {
			about: 'O mně',
			publications: 'Publikace',
			book: 'ALEFUJ!',
			langToggleTo: 'EN',
		},
		home: {
			heading: 'Fyzička. Spisovatelka. Někdo, kdo umí složité věci vysvětlit, aniž by vás vyděsil.',
			columnsHeading: 'Sloupky (brzy)',
			columnsNote:
				'Pravidelné sloupky spustím v další fázi webu. Zatím alespoň názvy budoucích rubrik.',
			columns: ['Fejetony', 'Glosy', 'Rozhovory', 'Recenze'],
		},
		footer: {
			newsletterHeading: 'Zůstaňte v obraze',
			newsletterBody:
				'Nové sloupky a novinky o knize ALEFUJ! přímo do e-mailu, jednou za čas, žádný spam.',
			emailLabel: 'E-mail',
			emailPlaceholder: 'vas@email.cz',
			submitLabel: 'Přihlásit k odběru',
			copyright: 'Vendula Šubert',
		},
		translationNotice: {
			onlyInCzech: 'Tento obsah je zatím jen v češtině.',
			onlyInEnglish: 'This content is only available in English.',
		},
		publications: {
			title: 'Publikace',
			orcidLabel: 'ORCID',
			groupJournal: 'Články v časopisech',
			groupProceedings: 'Konferenční příspěvky a přednášky',
			groupThesis: 'Kvalifikační práce',
			groupDeliverable: 'Technické výstupy',
			filterAll: 'Vše',
			firstAuthorBadge: 'první autorka',
			significancePlaceholder: 'proč to bylo zajímavé — doplním',
			significanceHeading: 'Proč je to zajímavé',
			linkDoi: 'DOI',
			linkArxiv: 'arXiv',
			linkUrl: 'odkaz',
			presentation: 'přednáška',
			poster: 'poster',
		},
		book: {
			statusLabel: 'Stav',
			ctaLabel: 'Více o knize na alefuj.cz',
		},
	},
	en: {
		nav: {
			about: 'About',
			publications: 'Publications',
			book: 'ALEFUJ!',
			langToggleTo: 'CS',
		},
		home: {
			heading: 'Physicist. Writer. Someone who can explain complicated things without frightening you.',
			columnsHeading: 'Columns (coming soon)',
			columnsNote:
				"Regular columns launch in the site's next phase. For now, just the names of the future sections.",
			columns: ['Fejetony', 'Glosy', 'Rozhovory', 'Recenze'],
		},
		footer: {
			newsletterHeading: 'Stay in the loop',
			newsletterBody:
				'New columns and news about the novel ALEFUJ! straight to your inbox, now and then, no spam.',
			emailLabel: 'Email',
			emailPlaceholder: 'you@example.com',
			submitLabel: 'Subscribe',
			copyright: 'Vendula Šubert',
		},
		translationNotice: {
			onlyInCzech: 'Tento obsah je zatím jen v češtině.',
			onlyInEnglish: 'This content is only available in English.',
		},
		publications: {
			title: 'Publications',
			orcidLabel: 'ORCID',
			groupJournal: 'Journal articles',
			groupProceedings: 'Conference proceedings & talks',
			groupThesis: 'Theses',
			groupDeliverable: 'Technical deliverables',
			filterAll: 'All',
			firstAuthorBadge: 'first author',
			significancePlaceholder: 'why this was interesting — to be added',
			significanceHeading: 'Why this matters',
			linkDoi: 'DOI',
			linkArxiv: 'arXiv',
			linkUrl: 'link',
			presentation: 'talk',
			poster: 'poster',
		},
		book: {
			statusLabel: 'Status',
			ctaLabel: 'More about the book at alefuj.cz',
		},
	},
};

export function t(locale: Locale): Translations {
	return translations[locale];
}

export function otherLocale(locale: Locale): Locale {
	return locale === 'cs' ? 'en' : 'cs';
}
