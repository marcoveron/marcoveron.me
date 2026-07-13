// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://marcoveron.me',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      // Tema del resaltado de código; funciona bien en claro y oscuro.
      theme: 'github-dark-dimmed',
      wrap: true,
    },
  },
});
