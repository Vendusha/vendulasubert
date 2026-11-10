import type { Locale } from '../lib/i18n';
import { type Localized, pick } from './music';

export { pick };

// Everything for the /lotr/ subpage lives in this one file — page copy,
// the Prologue video, the playlist link, and the tracklist — so updating
// the project (a new track finished, a status flipped to published) is a
// one-file edit, same spirit as src/data/music.ts.

export const PAGE_TITLE: Localized = {
	cs: 'Pán prstenů a-capella',
	en: 'The Lord of the Rings, a cappella',
};

/** Used as both the meta description and the teaser text on the two small
 * cards (Hudba/Music page, homepage) that link through to this page. */
export const CARD_TEXT: Localized = {
	cs: 'Zpívám a nahrávám celou filmovou hudbu ke Společenstvu prstenu – jen svým hlasem, vrstvu po vrstvě.',
	en: "I'm singing and recording the entire Fellowship of the Ring score — using nothing but my voice, one layer at a time.",
};

export const INTRO: Localized = {
	cs:
		'Kdo mě zná, ví, že jsem skalní fanoušek Tolkiena. Tolkien vložil do Středozemě nepředstavitelné množství práce – jazyky, mapy, staletí historie. Po něm do toho samé nepředstavitelné množství práce vložil Peter Jackson, aby to přenesl na plátno, Howard Shore k tomu napsal hodiny hudby a stovky lidí roky ručně stavěly „bigatures“. Tak jsem se rozhodla přidat se svým vlastním nesmyslně pracným úkolem: nazpívat celou hudbu ke Společenstvu prstenu jen svým hlasem, vrstvu po vrstvě (uvidíme, jestli se dostanu za třetí písničku, potící se smajlík).',
	en:
		'If you know me, you know I’m a diehard Tolkien fan. Tolkien put an impossible amount of work into Middle-earth – languages, maps, centuries of history. Then Peter Jackson put an impossible amount of work into bringing it to the screen, Howard Shore wrote hours of music for it, and hundreds of people spent years hand-building "bigatures". So I decided to join in with my own absurdly laborious task: singing the whole Fellowship of the Ring score with nothing but my voice, one layer at a time (we’ll see if I even make it past song three, sweating-smile emoji).',
};

export const HOW_I_MAKE_IT: Localized = {
	cs:
		'Celou nahrávku stavím po vrstvách – jeden hlas, znovu a znovu, dokud nevznikne celý orchestr. Hlasem se snažím spíše než co nejvěrněji napodobit jednotlivé nástroje zachytit danou náladu, kterou má hudba navozovat ve filmu. Nahrávám doma v Ardouru na Linuxu, bez studia. Z jednotlivých stop pak skládám mřížková videa, aby bylo vidět, kolik hlasů v tom vlastně hraje.',
	en:
		'I build the whole recording layer by layer — one voice, over and over, until it adds up to a full orchestra. Rather than trying to imitate each instrument as faithfully as I can, I aim to capture the mood the music is meant to create in the film. I record at home in Ardour on Linux, no studio. Then I stitch the individual tracks into grid videos, so you can actually see how many voices are singing at once.',
};

export const CREDITS: Localized = {
	cs: 'Hudba: Howard Shore. Aranžuju z velké části podle klavírního přepisu od Alcaeru.',
	en: "Music: Howard Shore. Arrangement based in large part on Alcaeru's piano transcription.",
};
export const CREDITS_LINK_LABEL = 'alcaeru.weebly.com';
export const CREDITS_LINK_URL = 'https://alcaeru.weebly.com/';

export const DISCLAIMER: Localized = {
	cs: 'Fanouškovský projekt, nijak spojený s New Line Cinema, Warner Bros. ani s dědictvím J. R. R. Tolkiena.',
	en: 'Fan project, not affiliated with New Line Cinema, Warner Bros., or the Tolkien Estate.',
};

// TODO: placeholder URL from Vendula — looked truncated (YouTube playlist
// ids are normally ~34 characters after "list="; this one is much
// shorter), so it isn't linked anywhere yet. Confirm the full URL before
// wiring up the "watch the playlist" link.
export const PLAYLIST_URL = 'https://www.youtube.com/playlist?list=PLPEF8GyM6VZo';

export type TrackStatus = 'published' | 'done' | 'planned';

export interface LotrTrack {
	/** Track titles are the original English names from The Complete
	 * Recordings — not translated, same as song titles in music.ts. */
	title: string;
	status: TrackStatus;
	/** Only set once status is 'published'. */
	youtubeId?: string;
}

// Only the two tracks Vendula actually named are here — the rest of The
// Complete Recordings tracklist needs to come from her, not be guessed.
export const LOTR_TRACKS: LotrTrack[] = [
	{ title: 'Prologue', status: 'published', youtubeId: 'WPlCfO59Q1U' },
	{ title: 'The Shire', status: 'done' },
];

export function trackStatusLabel(status: TrackStatus, lang: Locale): string {
	const labels: Record<TrackStatus, Localized> = {
		published: { cs: 'publikováno', en: 'published' },
		done: { cs: 'hotovo, čeká na zveřejnění', en: 'done, awaiting release' },
		planned: { cs: 'v plánu', en: 'planned' },
	};
	return pick(labels[status], lang);
}
