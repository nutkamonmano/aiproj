import { defineConfig } from 'vite'

export default defineConfig({
  base: '/aiproj/',
  build: {
    target: 'esnext',
    outDir: 'docs', // Build to docs for single-branch deployment
    emptyOutDir: true,
  },
})
