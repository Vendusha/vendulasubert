import { siteName, type Locale } from './i18n';

export const SITE_ORIGIN = 'https://vendulasubert.cz';

export function absUrl(path: string): string {
	return new URL(path, SITE_ORIGIN).href;
}

// Stable identifier for Vendula-the-person across both her sites. ALEFUJ!'s
// Book.author on alefuj.cz reuses this exact string so a crawler can tell
// it's the same entity as the Person defined here, not a namesake.
export const PERSON_ID = absUrl('/#person');

/** Schema.org Person for the site's author — emitted once, on the homepage,
 * by Layout.astro (not copied into every page). `imageUrl` is passed in
 * from there since it's already resolved the cropped OG image for the page;
 * no reason to redo that work here. */
export function personJsonLd(lang: Locale, imageUrl: string) {
	const jobTitle = lang === 'cs' ? 'Fyzička a spisovatelka' : 'Physicist and author';
	const description =
		lang === 'cs'
			? 'Česká fyzička (CERN, European Spallation Source), autorka humoristické knihy ALEFUJ!, hudebnice a písničkářka.'
			: 'Czech physicist (CERN, European Spallation Source), author of the comic novel ALEFUJ!, musician and songwriter.';
	const knowsAbout =
		lang === 'cs'
			? ['Neutronika', 'Křemíkové detektory', 'Radiační poškození materiálů', 'Fyzika částic']
			: ['Neutronics', 'Silicon detectors', 'Radiation damage in materials', 'Particle physics'];

	return {
		'@context': 'https://schema.org',
		'@type': 'Person',
		'@id': PERSON_ID,
		name: 'Vendula Šubert',
		alternateName: 'Vendula Maulerová',
		url: absUrl('/'),
		image: imageUrl,
		jobTitle,
		description,
		knowsAbout,
		// Both are past affiliations, not current employment — alumniOf fits
		// a finished stint better than worksFor, which implies "currently".
		alumniOf: [
			{ '@type': 'Organization', name: 'CERN', url: 'https://home.cern/' },
			{
				'@type': 'Organization',
				name: 'European Spallation Source',
				url: 'https://europeanspallationsource.se/',
			},
		],
		sameAs: [
			'https://orcid.org/0000-0002-2791-0659',
			'https://www.linkedin.com/in/vendula-subert-425a9184',
			'https://www.researchgate.net/profile/Vendula-Subert',
			'https://www.youtube.com/@vendulasubert',
			'https://alefuj.cz/cs/',
		],
	};
}

/** Schema.org WebSite — emitted on every page by Layout.astro. */
export function websiteJsonLd(lang: Locale) {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: siteName,
		url: absUrl(`/${lang}/`),
		inLanguage: lang === 'cs' ? 'cs-CZ' : 'en-US',
	};
}
