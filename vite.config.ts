import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': path.resolve(import.meta.dirname, './src') } },
  build: {
    /* Without this the CSS minifier downlevels for old targets: it DROPS the
       standard `backdrop-filter` and keeps only `-webkit-backdrop-filter`,
       which current Chrome no longer parses — so every glass surface on the
       site silently rendered with no blur at all. */
    cssTarget: ['chrome111', 'safari16', 'firefox121', 'edge111'],
  },
})
