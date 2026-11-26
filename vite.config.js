import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { githubApiPlugin } from './scripts/github-api-plugin.mjs'

// https://vite.dev/config/
export default defineConfig({
  // `githubApiPlugin` serves /api/github locally; on Vercel `api/github.js` runs as a function.
  plugins: [vue(), tailwindcss(), githubApiPlugin()],
})
