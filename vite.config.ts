import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
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
