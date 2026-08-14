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
		blog: string;
		cv: string;
		book: string;
		langToggleTo: string; // e.g. "EN" shown while on the Czech site
	};
	home: {
		heading: string;
		columnsHeading: string;
	};
	footer: {
		newsletterHeading: string;
		newsletterBody: string;
		newsletterConfirmNote: string;
		newsletterSuccess: string;
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
			blog: 'Můj blog',
			cv: 'Můj životopis',
			book: 'ALEFUJ!',
			langToggleTo: 'EN',
		},
		home: {
			heading: 'Ahoj.',
			columnsHeading: 'Blog',
		},
		footer: {
			newsletterHeading: 'Zůstaňte v obraze',
			newsletterBody:
				'Nové sloupky a novinky o knize ALEFUJ! přímo do e-mailu, jednou za čas, žádný spam.',
			newsletterConfirmNote:
				'Po přihlášení vám přijde potvrzovací e-mail — klikněte na odkaz v něm, jinak se odběr nedokončí.',
			newsletterSuccess: 'Díky! Zkontrolujte e-mail a potvrďte přihlášení k odběru.',
			emailLabel: 'E-mail',
			emailPlaceholder: 'Váš e-mail',
			submitLabel: 'Přihlásit se k odběru',
			copyright: 'Vendula Šubert',
		},
		translationNotice: {
			onlyInCzech: 'Tento obsah je zatím jen v češtině.',
			onlyInEnglish: 'This content is only available in English.',
		},
		publications: {
			title: 'Můj životopis',
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
			blog: 'My blog',
			cv: 'My CV',
			book: 'ALEFUJ!',
			langToggleTo: 'CS',
		},
		home: {
			heading: 'Hi.',
			columnsHeading: 'Blog',
		},
		footer: {
			newsletterHeading: 'Stay in the loop',
			newsletterBody:
				'New columns and news about the novel ALEFUJ! straight to your inbox, now and then, no spam.',
			newsletterConfirmNote:
				"After signing up you'll get a confirmation email — click the link in it, or the subscription won't go through.",
			newsletterSuccess: "Thanks! Check your email and confirm your subscription.",
			emailLabel: 'Email',
			emailPlaceholder: 'Your email',
			submitLabel: 'Subscribe',
			copyright: 'Vendula Šubert',
		},
		translationNotice: {
			onlyInCzech: 'Tento obsah je zatím jen v češtině.',
			onlyInEnglish: 'This content is only available in English.',
		},
		publications: {
			title: 'My CV',
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
