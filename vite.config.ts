import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

/* THE PUBLIC ORIGIN LIVES HERE AND NOWHERE ELSE.
   index.html needs absolute URLs for canonical/og/JSON-LD, which cannot be
   relative, so they were duplicated in five places and would each have to be
   found by hand on a domain change. They are now %SITE_ORIGIN% placeholders
   filled in at build time. To move the site, change this one line (and set
   the matching custom domain or org name on GitHub). */
const SITE_ORIGIN = 'https://sharpfacerobotics.github.io';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'site-origin',
      transformIndexHtml: (html: string) => html.replaceAll('%SITE_ORIGIN%', SITE_ORIGIN),
    },
  ],
  define: { __SITE_ORIGIN__: JSON.stringify(SITE_ORIGIN) },
  resolve: { alias: { '@': path.resolve(import.meta.dirname, './src') } },
  /* The preview server was serving index.html from cache, so new builds kept
     pointing the browser at old asset hashes and fixes appeared not to land.
     index.html must never be cached; the hashed assets under /assets are
     content-addressed and safe to cache forever. */
  preview: {
    headers: {
      'Cache-Control': 'no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
    },
  },
  build: {
    /* Without this the CSS minifier downlevels for old targets: it DROPS the
       standard `backdrop-filter` and keeps only `-webkit-backdrop-filter`,
       which current Chrome no longer parses — so every glass surface on the
       site silently rendered with no blur at all. */
    cssTarget: ['chrome111', 'safari16', 'firefox121', 'edge111'],
  },
})
