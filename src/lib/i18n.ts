export const locales = ['cs', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'cs';

export const siteName = 'Vendula Šubert';

// MailerLite embedded-form action URL — the plain HTML POST endpoint (not
// the JS/AJAX embed). Find/change it in MailerLite: Forms → this form →
// Embed → HTML code → the <form action="...">.
export const NEWSLETTER_FORM_ENDPOINT =
	'https://assets.mailerlite.com/jsonp/2569527/forms/195688773516789161/subscribe';

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
		bookIntro: string;
		bookLinkLabel: string;
		professionalIntro: string;
		professionalLinkLabel: string;
	};
	footer: {
		newsletterHeading: string;
		newsletterBody: string;
		newsletterConfirmNote: string;
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
	blog: {
		readingTime: (minutes: number) => string;
		relatedHeading: string;
		backToColumn: string;
		publishedOn: string;
		rssLabel: string;
		noPostsYet: string;
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
			heading: 'Ahoj.',
			columnsHeading: 'Sloupky',
			bookIntro: 'Zrovna dokončuju svůj první komický román,',
			bookLinkLabel: 'Víc o knize',
			professionalIntro: 'Dřív jsem pracovala v CERNu a v European Spallation Source. Co konkrétně, je',
			professionalLinkLabel: 'tady',
		},
		footer: {
			newsletterHeading: 'Zůstaňte v obraze',
			newsletterBody:
				'Nové sloupky a novinky o knize ALEFUJ! přímo do e-mailu, jednou za čas, žádný spam.',
			newsletterConfirmNote:
				'Po přihlášení vám přijde potvrzovací e-mail — klikněte na odkaz v něm, jinak se odběr nedokončí.',
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
		blog: {
			readingTime: (minutes) => `${minutes} min čtení`,
			relatedHeading: 'Související příspěvky',
			backToColumn: '← zpět na rubriku',
			publishedOn: 'Vydáno',
			rssLabel: 'RSS',
			noPostsYet: 'V téhle rubrice zatím nic není — brzy.',
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
			heading: 'Hi.',
			columnsHeading: 'Columns',
			bookIntro: "I'm currently finishing my first comic novel,",
			bookLinkLabel: 'More about the book',
			professionalIntro: 'I used to work at CERN and the European Spallation Source. The details are',
			professionalLinkLabel: 'here',
		},
		footer: {
			newsletterHeading: 'Stay in the loop',
			newsletterBody:
				'New columns and news about the novel ALEFUJ! straight to your inbox, now and then, no spam.',
			newsletterConfirmNote:
				"After signing up you'll get a confirmation email — click the link in it, or the subscription won't go through.",
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
		blog: {
			readingTime: (minutes) => `${minutes} min read`,
			relatedHeading: 'Related posts',
			backToColumn: '← back to column',
			publishedOn: 'Published',
			rssLabel: 'RSS',
			noPostsYet: 'Nothing in this column yet — soon.',
		},
	},
};

export function t(locale: Locale): Translations {
	return translations[locale];
}

export function otherLocale(locale: Locale): Locale {
	return locale === 'cs' ? 'en' : 'cs';
}
