import { defineConfig } from 'vitest/config'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  resolve: {
    alias: {
      'react': path.resolve(__dirname, '../../node_modules/react'),
      'react-dom': path.resolve(__dirname, '../../node_modules/react-dom'),
    }
  },
  test: {
    globals: true,
    include: [
      '../tests/unit/**/*.test.js',
      '../tests/unit/**/*.spec.js',
      '../tests/integration/**/*.test.js',
      '../tests/integration/**/*.spec.js'
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.test.js',
        '**/*.spec.js',
        'dist/',
        'coverage/',
        'netlify/'
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80
        }
      }
    }
  }
}) 