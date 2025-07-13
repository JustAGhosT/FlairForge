import fs from 'fs/promises'
import path from 'path'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { generateFlyer, getTemplates, validateTemplate } from '../../src/utils/template-manager.js'

// Mock fs and path
vi.mock('fs/promises')
vi.mock('path')

describe('Template Manager', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getTemplates', () => {
    it('returns list of available templates', async () => {
      const mockTemplates = [
        { id: 'cheesy-pig', name: 'Cheesy Pig', category: 'food' },
        { id: 'business-classic', name: 'Business Classic', category: 'business' }
      ]

      vi.mocked(fs.readFile).mockResolvedValue(JSON.stringify(mockTemplates))
      vi.mocked(path.join).mockReturnValue('/templates/templates.json')

      const result = await getTemplates()

      expect(result).toEqual(mockTemplates)
      expect(fs.readFile).toHaveBeenCalledWith('/templates/templates.json', 'utf8')
    })

    it('handles file read errors', async () => {
      vi.mocked(fs.readFile).mockRejectedValue(new Error('File not found'))

      await expect(getTemplates()).rejects.toThrow('File not found')
    })

    it('handles invalid JSON', async () => {
      vi.mocked(fs.readFile).mockResolvedValue('invalid json')

      await expect(getTemplates()).rejects.toThrow('Invalid JSON')
    })
  })

  describe('validateTemplate', () => {
    it('validates template data structure', () => {
      const validTemplate = {
        id: 'test-template',
        name: 'Test Template',
        category: 'test',
        fields: ['title', 'description']
      }

      expect(() => validateTemplate(validTemplate)).not.toThrow()
    })

    it('throws error for missing required fields', () => {
      const invalidTemplate = {
        id: 'test-template',
        name: 'Test Template'
        // missing category and fields
      }

      expect(() => validateTemplate(invalidTemplate)).toThrow('Template missing required fields')
    })

    it('throws error for invalid field types', () => {
      const invalidTemplate = {
        id: 123, // should be string
        name: 'Test Template',
        category: 'test',
        fields: 'not-an-array'
      }

      expect(() => validateTemplate(invalidTemplate)).toThrow('Invalid template structure')
    })
  })

  describe('generateFlyer', () => {
    it('generates flyer with valid template and data', async () => {
      const templateId = 'cheesy-pig'
      const flyerData = {
        title: 'Test Flyer',
        description: 'Test description',
        businessName: 'Test Business'
      }

      const mockTemplate = `
        <div class="flyer">
          <h1><%= title %></h1>
          <p><%= description %></p>
          <div class="business"><%= businessName %></div>
        </div>
      `

      vi.mocked(fs.readFile).mockResolvedValue(mockTemplate)
      vi.mocked(path.join).mockReturnValue('/templates/cheesy-pig.ejs')

      const result = await generateFlyer(templateId, flyerData)

      expect(result).toHaveProperty('flyerId')
      expect(result).toHaveProperty('previewUrl')
      expect(result).toHaveProperty('downloadUrl')
      expect(result.flyerId).toMatch(/^[a-f0-9-]+$/)
    })

    it('handles template not found', async () => {
      vi.mocked(fs.readFile).mockRejectedValue(new Error('File not found'))

      await expect(generateFlyer('non-existent', {})).rejects.toThrow('Template not found')
    })

    it('handles template rendering errors', async () => {
      const invalidTemplate = `
        <div class="flyer">
          <h1><%= undefinedVariable %></h1>
        </div>
      `

      vi.mocked(fs.readFile).mockResolvedValue(invalidTemplate)

      await expect(generateFlyer('invalid-template', {})).rejects.toThrow('Template rendering failed')
    })

    it('validates required flyer data', async () => {
      await expect(generateFlyer('test-template', {})).rejects.toThrow('Flyer data is required')
      await expect(generateFlyer('test-template', null)).rejects.toThrow('Flyer data is required')
    })
  })
}) 