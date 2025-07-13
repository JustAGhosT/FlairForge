import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom';
import { RenderOptions, render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// Create a custom render function that includes providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity
      }
    }
  })

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </QueryClientProvider>
  )
}

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

// Re-export everything
export * from '@testing-library/react';
export { customRender as render };

// Test data helpers
export const mockFlyerData = {
  title: 'Test Flyer',
  description: 'This is a test flyer description',
  template: 'cheesy-pig',
  content: {
    businessName: 'Test Business',
    tagline: 'Amazing deals!',
    contactInfo: 'test@example.com'
  }
}

export const mockTemplateData = {
  id: 'cheesy-pig',
  title: 'Cheesy Pig',
  description: 'A fun and engaging template',
  image: '/templates/cheesy-pig-preview.png'
};

// Mock API responses
export const mockApiResponses = {
  generateFlyer: {
    success: true,
    data: {
      flyerId: 'test-flyer-123',
      previewUrl: 'data:image/png;base64,test',
      downloadUrl: '/api/download/test-flyer-123'
    }
  },
  enhanceContent: {
    success: true,
    data: {
      enhancedText: 'Enhanced test content with AI improvements',
      suggestions: ['Add more details', 'Include contact information']
    }
  }
} 