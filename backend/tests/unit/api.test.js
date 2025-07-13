import request from 'supertest'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createServer } from '../src/server.js'

// Mock dependencies
vi.mock('../src/utils/template-manager.js', () => ({
  generateFlyer: vi.fn(),
  getTemplates: vi.fn()
}))

vi.mock('../src/utils/ai-enhancer.js', () => ({
  enhanceContent: vi.fn(),
  enhanceImage: vi.fn()
}))

describe('API Endpoints', () => {
  let app

  beforeEach(() => {
    app = createServer()
    vi.clearAllMocks()
  })

  describe('GET /api/templates', () => {
    it('returns list of available templates', async () => {
      const mockTemplates = [
        { id: 'cheesy-pig', name: 'Cheesy Pig', category: 'food' },
        { id: 'business-classic', name: 'Business Classic', category: 'business' }
      ]

      const { getTemplates } = await import('../src/utils/template-manager.js')
      getTemplates.mockResolvedValue(mockTemplates)

      const response = await request(app)
        .get('/api/templates')
        .expect(200)

      expect(response.body).toEqual({
        success: true,
        data: mockTemplates
      })
      expect(getTemplates).toHaveBeenCalled()
    })

    it('handles template retrieval errors', async () => {
      const { getTemplates } = await import('../src/utils/template-manager.js')
      getTemplates.mockRejectedValue(new Error('Database error'))

      const response = await request(app)
        .get('/api/templates')
        .expect(500)

      expect(response.body).toEqual({
        success: false,
        error: 'Failed to retrieve templates'
      })
    })
  })

  describe('POST /api/generate-flyer', () => {
    it('generates flyer successfully', async () => {
      const mockFlyerData = {
        flyerId: 'test-123',
        previewUrl: 'data:image/png;base64,test',
        downloadUrl: '/api/download/test-123'
      }

      const { generateFlyer } = await import('../src/utils/template-manager.js')
      generateFlyer.mockResolvedValue(mockFlyerData)

      const requestData = {
        template: 'cheesy-pig',
        data: {
          title: 'Test Flyer',
          description: 'Test description'
        }
      }

      const response = await request(app)
        .post('/api/generate-flyer')
        .send(requestData)
        .expect(200)

      expect(response.body).toEqual({
        success: true,
        data: mockFlyerData
      })
      expect(generateFlyer).toHaveBeenCalledWith('cheesy-pig', requestData.data)
    })

    it('validates required fields', async () => {
      const response = await request(app)
        .post('/api/generate-flyer')
        .send({})
        .expect(400)

      expect(response.body).toEqual({
        success: false,
        error: 'Template and data are required'
      })
    })

    it('handles generation errors', async () => {
      const { generateFlyer } = await import('../src/utils/template-manager.js')
      generateFlyer.mockRejectedValue(new Error('Template not found'))

      const response = await request(app)
        .post('/api/generate-flyer')
        .send({
          template: 'invalid-template',
          data: { title: 'Test' }
        })
        .expect(500)

      expect(response.body).toEqual({
        success: false,
        error: 'Failed to generate flyer'
      })
    })
  })

  describe('POST /api/enhance-content', () => {
    it('enhances content successfully', async () => {
      const mockEnhancedData = {
        enhancedText: 'Enhanced content with AI improvements',
        suggestions: ['Add more details']
      }

      const { enhanceContent } = await import('../src/utils/ai-enhancer.js')
      enhanceContent.mockResolvedValue(mockEnhancedData)

      const response = await request(app)
        .post('/api/enhance-content')
        .send({ content: 'sale today' })
        .expect(200)

      expect(response.body).toEqual({
        success: true,
        data: mockEnhancedData
      })
      expect(enhanceContent).toHaveBeenCalledWith('sale today')
    })

    it('validates content input', async () => {
      const response = await request(app)
        .post('/api/enhance-content')
        .send({ content: '' })
        .expect(400)

      expect(response.body).toEqual({
        success: false,
        error: 'Content is required'
      })
    })
  })

  describe('POST /api/enhance-image', () => {
    it('enhances image successfully', async () => {
      const mockEnhancedData = {
        enhancedImageUrl: 'data:image/jpeg;base64,enhanced',
        improvements: ['Better lighting']
      }

      const { enhanceImage } = await import('../src/utils/ai-enhancer.js')
      enhanceImage.mockResolvedValue(mockEnhancedData)

      const response = await request(app)
        .post('/api/enhance-image')
        .attach('image', Buffer.from('test'), 'test.jpg')
        .expect(200)

      expect(response.body).toEqual({
        success: true,
        data: mockEnhancedData
      })
    })

    it('validates image file', async () => {
      const response = await request(app)
        .post('/api/enhance-image')
        .expect(400)

      expect(response.body).toEqual({
        success: false,
        error: 'Image file is required'
      })
    })
  })
}) 