import { beforeEach, describe, expect, it, vi } from 'vitest'
import { enhanceContent, enhanceImage } from '../../../frontend/src/utils/ai-enhancer'

// Mock fetch
global.fetch = vi.fn()

describe('AI Enhancer Utils', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('enhanceContent', () => {
    it('enhances text content successfully', async () => {
      const mockResponse = {
        success: true,
        data: {
          enhancedText: 'Enhanced test content with AI improvements',
          suggestions: ['Add more details', 'Include contact information']
        }
      }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      } as Response)

      const result = await enhanceContent('sale today')
      
      expect(result).toEqual(mockResponse.data)
      expect(fetch).toHaveBeenCalledWith('/api/enhance-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: 'sale today' })
      })
    })

    it('handles API errors gracefully', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error'
      } as Response)

      await expect(enhanceContent('test content')).rejects.toThrow('Failed to enhance content')
    })

    it('handles network errors', async () => {
      vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'))

      await expect(enhanceContent('test content')).rejects.toThrow('Network error')
    })

    it('validates input content', async () => {
      await expect(enhanceContent('')).rejects.toThrow('Content cannot be empty')
      await expect(enhanceContent('   ')).rejects.toThrow('Content cannot be empty')
    })
  })

  describe('enhanceImage', () => {
    it('enhances image successfully', async () => {
      const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' })
      const mockResponse = {
        success: true,
        data: {
          enhancedImageUrl: 'data:image/jpeg;base64,enhanced',
          improvements: ['Better lighting', 'Enhanced colors']
        }
      }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      } as Response)

      const result = await enhanceImage(mockFile)
      
      expect(result).toEqual(mockResponse.data)
      expect(fetch).toHaveBeenCalledWith(
        '/api/enhance-image',
        expect.objectContaining({
          method: 'POST',
          body: expect.any(FormData),
        })
      )
    })

    it('validates image file type', async () => {
      const invalidFile = new File(['test'], 'test.txt', { type: 'text/plain' })
      
      await expect(enhanceImage(invalidFile)).rejects.toThrow('Invalid image file type')
    })

    it('validates image file size', async () => {
      const largeFile = new File(['x'.repeat(10 * 1024 * 1024)], 'large.jpg', { type: 'image/jpeg' })
      
      await expect(enhanceImage(largeFile)).rejects.toThrow('Image file too large')
    })
  })
}) 