import path from 'path'
import preact from '@preact/preset-vite'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/index.ts'),
      name: 'xmas',
      fileName: 'xmas',
      formats: ['es', 'umd']
    },
    rollupOptions: {
      output: {
        exports: 'named',
        globals: {
          xmas: 'xmas'
        }
      }
    },
    sourcemap: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  plugins: [
    preact()
  ]
})