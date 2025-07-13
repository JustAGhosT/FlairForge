import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}))

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}))

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))
})

// Mock HTML2Canvas
vi.mock('html2canvas', () => ({
  default: vi.fn().mockResolvedValue({
    toBlob: vi.fn().mockResolvedValue(new Blob(['test'], { type: 'image/png' })),
    toDataURL: vi.fn().mockResolvedValue('data:image/png;base64,test')
  })
}))

// Mock fetch for API calls
global.fetch = vi.fn()

// Setup test environment
beforeEach(() => {
  vi.clearAllMocks()
  document.body.innerHTML = ''
})

afterEach(() => {
  vi.restoreAllMocks()
}) 