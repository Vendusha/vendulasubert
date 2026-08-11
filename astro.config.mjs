// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Served at the root of the custom domain (see public/CNAME) — no `base`
// needed. If custom domain hosting is ever dropped in favour of the default
// github.io/<repo> project-page URL, `site` reverts to the github.io URL
// and `base` needs to come back as '/vendulasubert/'.
// https://astro.build/config
export default defineConfig({
	site: 'https://vendulasubert.cz',
	integrations: [sitemap()],
});
