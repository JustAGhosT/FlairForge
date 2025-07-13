// AI Image to Flyer Conversion Utility
import { FlyerData, TemplateType } from '../types';

export interface ImageAnalysisResult {
  detectedText: string[];
  products: Array<{
    name: string;
    price?: string;
    description?: string;
  }>;
  contact: {
    phone?: string;
    name?: string;
  };
  brandElements: {
    title?: string;
    colors: string[];
    style: 'casual' | 'professional' | 'premium';
  };
  suggestedTemplate: TemplateType;
}

export class AIImageConverter {
  // Future implementation will use OCR and AI services
  async analyzeUploadedImage(imageFile: File): Promise<ImageAnalysisResult> {
    // This is a mock implementation - in the future this would:
    // 1. Use OCR to extract text from the image
    // 2. Use AI to identify products, prices, and layout elements
    // 3. Determine the appropriate template style
    // 4. Extract contact information
    
    return this.mockAnalyzeImage(imageFile);
  }

  // Mock analysis for development
  private async mockAnalyzeImage(_imageFile: File): Promise<ImageAnalysisResult> {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock analysis results based on the example image you showed
    return {
      detectedText: [
        "The Cheesy Pig",
        "400g Pork rashers",
        "200g Bacon", 
        "500g Cheese Grillers",
        "R175",
        "Lizelle 0603750415"
      ],
      products: [
        {
          name: "Premium Pork Pack",
          price: "R175",
          description: "Mixed premium cuts including rashers, bacon, and cheese grillers"
        },
        {
          name: "Pork Rashers",
          price: "400g included",
          description: "Fresh pork rashers"
        },
        {
          name: "Bacon",
          price: "200g included", 
          description: "Premium bacon cuts"
        }
      ],
      contact: {
        phone: "060 375 0415",
        name: "Lizelle"
      },
      brandElements: {
        title: "The Cheesy Pig",
        colors: ["#e91e63", "#FF6B35", "#4CAF50"],
        style: 'casual'
      },
      suggestedTemplate: 'promo' as TemplateType
    };
  }

  // Convert analysis results to FlyerData
  convertToFlyerData(analysis: ImageAnalysisResult): FlyerData {
    return {
      title: analysis.brandElements.title || "The Cheesy Pig",
      subtitle: "Premium Farm-Fresh Products",
      type: analysis.suggestedTemplate === 'promo' ? 'promotion' : 'products',
      products: analysis.products,
      description: "Farm-fresh pork products made with quality ingredients",
      enhancedContent: null,
      selectedTemplate: this.mapToTemplateType(analysis.suggestedTemplate),
      colorScheme: this.determineColorScheme(analysis.brandElements.colors),
      finalImageUrl: null
    };
  }

  private mapToTemplateType(suggested: TemplateType): TemplateType {
    // Map AI suggestions to available templates
    switch (suggested) {
      case 'promo':
        return 'promo';
      case 'catalog':
        return 'catalog' as TemplateType;
      case 'premium':
        return 'premium';
      default:
        return 'modern';
    }
  }

  private determineColorScheme(colors: string[]): 'default' | 'green' | 'blue' | 'purple' {
    // Analyze dominant colors to suggest color scheme
    const hasGreen = colors.some(color => 
      color.toLowerCase().includes('#4caf50') || 
      color.toLowerCase().includes('green')
    );
    const hasBlue = colors.some(color => 
      color.toLowerCase().includes('#2196f3') || 
      color.toLowerCase().includes('blue')
    );
    const hasPurple = colors.some(color => 
      color.toLowerCase().includes('#9c27b0') || 
      color.toLowerCase().includes('purple') ||
      color.toLowerCase().includes('#e91e63')
    );

    if (hasGreen) return 'green';
    if (hasBlue) return 'blue';
    if (hasPurple) return 'purple';
    return 'default';
  }

  // Future method for actual OCR implementation
  async performOCR(_imageFile: File): Promise<string[]> {
    // This would integrate with services like:
    // - Google Cloud Vision API
    // - AWS Textract
    // - Azure Computer Vision
    // - Or local OCR libraries like Tesseract.js
    
    throw new Error("OCR not implemented yet - use mock analysis for now");
  }

  // Future method for AI content analysis
  async analyzeContentWithAI(_ocrText: string[]): Promise<Partial<ImageAnalysisResult>> {
    // This would use language models to:
    // - Extract structured product information
    // - Identify contact details
    // - Determine flyer style and suggest templates
    // - Generate enhanced descriptions
    
    throw new Error("AI analysis not implemented yet - use mock analysis for now");
  }

  // Validate and clean extracted data
  validateAndCleanData(analysis: ImageAnalysisResult): ImageAnalysisResult {
    return {
      ...analysis,
      products: analysis.products.filter(p => p.name && p.name.trim().length > 0),
      contact: {
        phone: this.cleanPhoneNumber(analysis.contact.phone),
        name: analysis.contact.name?.trim()
      },
      detectedText: analysis.detectedText.filter(text => text.trim().length > 0)
    };
  }

  private cleanPhoneNumber(phone?: string): string | undefined {
    if (!phone) return undefined;
    
    // Remove all non-digit characters except + at the start
    const cleaned = phone.replace(/[^\d+]/g, '');
    
    // Basic South African number validation
    if (cleaned.match(/^(\+27|0)\d{9}$/)) {
      return cleaned;
    }
    
    return phone; // Return original if doesn't match expected format
  }
}

// Type definitions for future API integrations
export interface OCRService {
  extractText(imageFile: File): Promise<string[]>;
}

export interface AIAnalysisService {
  analyzeFlyer(text: string[], imageMetadata?: any): Promise<ImageAnalysisResult>;
}

// Factory for creating AI converter with different service providers
export class AIConverterFactory {
  static createConverter(
    ocrService?: OCRService, 
    aiService?: AIAnalysisService
  ): AIImageConverter {
    const converter = new AIImageConverter();
    
    // In the future, inject actual services here
    if (ocrService) {
      // converter.ocrService = ocrService;
    }
    if (aiService) {
      // converter.aiService = aiService;
    }
    
    return converter;
  }
}
