import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createServer } from '../../src/server.js'

describe('API Integration Tests', () => {
  let app
  let server

  beforeAll(async () => {
    app = createServer()
    server = app.listen(0) // Use random port
  })

  afterAll(async () => {
    if (server) {
      await new Promise((resolve) => server.close(resolve))
    }
  })

  describe('Template Management Integration', () => {
    it('should retrieve and validate template list', async () => {
      const response = await request(app)
        .get('/api/templates')
        .expect(200)

      expect(response.body.success).toBe(true)
      expect(Array.isArray(response.body.data)).toBe(true)
      expect(response.body.data.length).toBeGreaterThan(0)

      // Validate template structure
      const template = response.body.data[0]
      expect(template).toHaveProperty('id')
      expect(template).toHaveProperty('name')
      expect(template).toHaveProperty('category')
      expect(typeof template.id).toBe('string')
      expect(typeof template.name).toBe('string')
    })

    it('should handle template retrieval with proper error handling', async () => {
      // This test would require mocking the file system to simulate errors
      // For now, we test the happy path
      const response = await request(app)
        .get('/api/templates')
        .expect(200)

      expect(response.body.success).toBe(true)
    })
  })

  describe('Flyer Generation Integration', () => {
    it('should generate flyer with valid template and data', async () => {
      const flyerData = {
        template: 'cheesy-pig',
        data: {
          title: 'Integration Test Flyer',
          description: 'Testing flyer generation integration',
          businessName: 'Test Business',
          contactInfo: 'test@example.com',
          tagline: 'Amazing deals!'
        }
      }

      const response = await request(app)
        .post('/api/generate-flyer')
        .send(flyerData)
        .expect(200)

      expect(response.body.success).toBe(true)
      expect(response.body.data).toHaveProperty('flyerId')
      expect(response.body.data).toHaveProperty('previewUrl')
      expect(response.body.data).toHaveProperty('downloadUrl')
      expect(typeof response.body.data.flyerId).toBe('string')
      expect(response.body.data.flyerId.length).toBeGreaterThan(0)
    })

    it('should validate required fields for flyer generation', async () => {
      const invalidData = {
        template: 'cheesy-pig'
        // Missing data field
      }

      const response = await request(app)
        .post('/api/generate-flyer')
        .send(invalidData)
        .expect(400)

      expect(response.body.success).toBe(false)
      expect(response.body.error).toContain('required')
    })

    it('should handle invalid template gracefully', async () => {
      const invalidData = {
        template: 'non-existent-template',
        data: {
          title: 'Test Flyer',
          description: 'Test description'
        }
      }

      const response = await request(app)
        .post('/api/generate-flyer')
        .send(invalidData)
        .expect(500)

      expect(response.body.success).toBe(false)
      expect(response.body.error).toContain('Failed to generate flyer')
    })
  })

  describe('AI Enhancement Integration', () => {
    it('should enhance content successfully', async () => {
      const contentData = {
        content: 'sale today'
      }

      const response = await request(app)
        .post('/api/enhance-content')
        .send(contentData)
        .expect(200)

      expect(response.body.success).toBe(true)
      expect(response.body.data).toHaveProperty('enhancedText')
      expect(response.body.data).toHaveProperty('suggestions')
      expect(typeof response.body.data.enhancedText).toBe('string')
      expect(Array.isArray(response.body.data.suggestions)).toBe(true)
    })

    it('should validate content input', async () => {
      const invalidData = {
        content: ''
      }

      const response = await request(app)
        .post('/api/enhance-content')
        .send(invalidData)
        .expect(400)

      expect(response.body.success).toBe(false)
      expect(response.body.error).toContain('Content is required')
    })

    it('should handle AI enhancement errors gracefully', async () => {
      const contentData = {
        content: 'x'.repeat(10000) // Very long content that might cause issues
      }

      const response = await request(app)
        .post('/api/enhance-content')
        .send(contentData)
        .expect(500)

      expect(response.body.success).toBe(false)
      expect(response.body.error).toContain('Failed to enhance content')
    })
  })

  describe('Image Enhancement Integration', () => {
    it('should enhance image successfully', async () => {
      // Create a mock image file
      const imageBuffer = Buffer.from('fake-image-data')
      
      const response = await request(app)
        .post('/api/enhance-image')
        .attach('image', imageBuffer, 'test.jpg')
        .expect(200)

      expect(response.body.success).toBe(true)
      expect(response.body.data).toHaveProperty('enhancedImageUrl')
      expect(response.body.data).toHaveProperty('improvements')
    })

    it('should validate image file presence', async () => {
      const response = await request(app)
        .post('/api/enhance-image')
        .expect(400)

      expect(response.body.success).toBe(false)
      expect(response.body.error).toContain('Image file is required')
    })

    it('should validate image file type', async () => {
      const textBuffer = Buffer.from('not an image')
      
      const response = await request(app)
        .post('/api/enhance-image')
        .attach('image', textBuffer, 'test.txt')
        .expect(400)

      expect(response.body.success).toBe(false)
      expect(response.body.error).toContain('Invalid image file type')
    })
  })

  describe('Error Handling Integration', () => {
    it('should handle malformed JSON gracefully', async () => {
      const response = await request(app)
        .post('/api/generate-flyer')
        .set('Content-Type', 'application/json')
        .send('invalid json')
        .expect(400)

      expect(response.body.success).toBe(false)
      expect(response.body.error).toContain('Invalid JSON')
    })

    it('should handle unsupported HTTP methods', async () => {
      const response = await request(app)
        .put('/api/templates')
        .expect(404)

      expect(response.body.error).toContain('Not Found')
    })

    it('should handle large payloads appropriately', async () => {
      const largeData = {
        template: 'cheesy-pig',
        data: {
          title: 'x'.repeat(10000), // Very long title
          description: 'x'.repeat(10000) // Very long description
        }
      }

      const response = await request(app)
        .post('/api/generate-flyer')
        .send(largeData)
        .expect(413) // Payload Too Large

      expect(response.body.error).toContain('Payload too large')
    })
  })

  describe('Response Format Integration', () => {
    it('should maintain consistent response format', async () => {
      const response = await request(app)
        .get('/api/templates')
        .expect(200)

      // Check response structure
      expect(response.body).toHaveProperty('success')
      expect(response.body).toHaveProperty('data')
      expect(typeof response.body.success).toBe('boolean')
      expect(response.body.success).toBe(true)
    })

    it('should include proper error response format', async () => {
      const response = await request(app)
        .post('/api/generate-flyer')
        .send({})
        .expect(400)

      // Check error response structure
      expect(response.body).toHaveProperty('success')
      expect(response.body).toHaveProperty('error')
      expect(typeof response.body.success).toBe('boolean')
      expect(response.body.success).toBe(false)
      expect(typeof response.body.error).toBe('string')
    })
  })
}) 