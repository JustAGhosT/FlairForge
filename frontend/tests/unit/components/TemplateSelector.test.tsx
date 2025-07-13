import { describe, expect, it, vi } from 'vitest'
import TemplateSelector from '../../../src/components/TemplateSelector/TemplateSelector'
import { fireEvent, mockTemplateData, render, screen } from '../../../src/test/utils'

// Mock the store
vi.mock('../../../src/store/useAppStore', () => ({
  useAppStore: vi.fn(() => ({
    selectedTemplate: null,
    setSelectedTemplate: vi.fn(),
    templates: [mockTemplateData]
  }))
}))

describe('TemplateSelector Component', () => {
  it('renders template options', () => {
    render(<TemplateSelector />)
    
    expect(screen.getByText('Cheesy Pig')).toBeInTheDocument()
    expect(screen.getByText('A fun and engaging template')).toBeInTheDocument()
  })

  it('displays template preview image', () => {
    render(<TemplateSelector />)
    
    const previewImage = screen.getByAltText(/cheesy pig preview/i)
    expect(previewImage).toBeInTheDocument()
    expect(previewImage).toHaveAttribute('src', '/templates/cheesy-pig-preview.png')
  })

  it('handles template selection', () => {
    const mockSetSelectedTemplate = vi.fn()
    vi.mocked(useAppStore).mockReturnValue({
      selectedTemplate: null,
      setSelectedTemplate: mockSetSelectedTemplate,
      templates: [mockTemplateData]
    })

    render(<TemplateSelector />)
    
    const templateOption = screen.getByRole('button', { name: /select cheesy pig/i })
    fireEvent.click(templateOption)
    
    expect(mockSetSelectedTemplate).toHaveBeenCalledWith(mockTemplateData)
  })

  it('shows selected template state', () => {
    vi.mocked(useAppStore).mockReturnValue({
      selectedTemplate: mockTemplateData,
      setSelectedTemplate: vi.fn(),
      templates: [mockTemplateData]
    })

    render(<TemplateSelector />)
    
    expect(screen.getByText(/selected/i)).toBeInTheDocument()
  })
}) 