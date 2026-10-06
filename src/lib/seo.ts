export const SITE_ORIGIN = 'https://vendulasubert.cz';

export function absUrl(path: string): string {
	return new URL(path, SITE_ORIGIN).href;
}

/** Schema.org Person for the site's author. Only profiles that really belong
 * to her — the book co-editor's LinkedIn is linked in running text, not here. */
export function personJsonLd() {
	return {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Vendula Šubert',
		alternateName: 'Vendula Maulerová',
		url: absUrl('/'),
		sameAs: [
			'https://orcid.org/0000-0002-2791-0659',
			'https://alefuj.cz/cs/',
			'https://www.youtube.com/@vendulasubert',
		],
	};
}
