import { defineConfig } from 'vite'

export default defineConfig({
  base: '/aiproj/',
  optimizeDeps: {
    exclude: ['@imgly/background-removal'],
  },
  build: {
    target: 'esnext',
  },
})
