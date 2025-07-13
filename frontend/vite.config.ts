import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ssr: resolve(__dirname, 'src/ssr/entry-server.tsx')
      },
      output: {
        dir: 'dist/ssr',
        format: 'esm'
      }
    },
    ssr: true,
    outDir: 'dist/ssr',
    emptyOutDir: false
  },
  ssr: {
    external: ['react', 'react-dom']
  }
})
