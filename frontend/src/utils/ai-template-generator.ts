// AI Template Generator - Creates custom templates based on user descriptions
import { FlyerData, TemplateType } from '../types';

export interface TemplateRequest {
  description: string;
  businessType?: string;
  targetAudience?: string;
  style?: string;
  colors?: string[];
  requirements?: string[];
}

export interface GeneratedTemplate {
  id: string;
  name: string;
  description: string;
  flyerData: FlyerData;
  templateType: TemplateType;
  cssCustomizations?: string;
  confidence: number;
}

export class AITemplateGenerator {
  
  // Main method to generate a template from user description
  async generateTemplate(request: TemplateRequest): Promise<GeneratedTemplate> {
    // Mock implementation - in the future this would use AI services
    return this.mockGenerateTemplate(request);
  }

  // Mock implementation for development
  private async mockGenerateTemplate(request: TemplateRequest): Promise<GeneratedTemplate> {
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Analyze the request and generate appropriate template
    const analysis = this.analyzeRequest(request);
    const flyerData = this.generateFlyerData(analysis);
    
    return {
      id: `custom-${Date.now()}`,
      name: `Custom ${analysis.businessType} Template`,
      description: `AI-generated template for ${analysis.businessType.toLowerCase()} business`,
      flyerData,
      templateType: analysis.suggestedTemplate,
      cssCustomizations: this.generateCSS(analysis),
      confidence: analysis.confidence
    };
  }

  // Analyze user request to determine template characteristics
  private analyzeRequest(request: TemplateRequest): {
    businessType: string;
    style: string;
    colorScheme: 'default' | 'green' | 'blue' | 'purple';
    suggestedTemplate: TemplateType;
    confidence: number;
  } {
    const description = request.description.toLowerCase();
    
    // Determine business type
    let businessType = 'Food & Beverage';
    if (description.includes('restaurant') || description.includes('food') || description.includes('cafe')) {
      businessType = 'Restaurant';
    } else if (description.includes('retail') || description.includes('shop') || description.includes('store')) {
      businessType = 'Retail';
    } else if (description.includes('service') || description.includes('professional')) {
      businessType = 'Service';
    }

    // Determine style
    let style = 'modern';
    if (description.includes('elegant') || description.includes('luxury') || description.includes('premium')) {
      style = 'premium';
    } else if (description.includes('casual') || description.includes('friendly') || description.includes('social')) {
      style = 'casual';
    } else if (description.includes('rustic') || description.includes('farm') || description.includes('natural')) {
      style = 'rustic';
    }

    // Determine color scheme
    let colorScheme: 'default' | 'green' | 'blue' | 'purple' = 'default';
    if (description.includes('green') || description.includes('natural') || description.includes('eco')) {
      colorScheme = 'green';
    } else if (description.includes('blue') || description.includes('professional') || description.includes('trust')) {
      colorScheme = 'blue';
    } else if (description.includes('purple') || description.includes('creative') || description.includes('luxury')) {
      colorScheme = 'purple';
    }

    // Suggest template type
    let suggestedTemplate: TemplateType = 'modern';
    if (description.includes('catalog') || description.includes('many products') || description.includes('comprehensive')) {
      suggestedTemplate = 'catalog';
    } else if (description.includes('promo') || description.includes('special offer') || description.includes('social')) {
      suggestedTemplate = 'promo';
    } else if (style === 'premium') {
      suggestedTemplate = 'premium';
    } else if (style === 'rustic') {
      suggestedTemplate = 'rustic';
    }

    return {
      businessType,
      style,
      colorScheme,
      suggestedTemplate,
      confidence: 0.85 // Mock confidence score
    };
  }

  // Generate flyer data based on analysis
  private generateFlyerData(analysis: any): FlyerData {
    const businessTemplates = this.getBusinessTemplates();
    const template = businessTemplates[analysis.businessType] || businessTemplates['Food & Beverage'];
    
    return {
      title: template.title,
      subtitle: template.subtitle,
      type: this.mapTemplateToType(analysis.suggestedTemplate),
      products: template.products,
      description: template.description,
      enhancedContent: null,
      selectedTemplate: analysis.suggestedTemplate,
      colorScheme: analysis.colorScheme,
      finalImageUrl: null
    };
  }

  // Get business-specific templates
  private getBusinessTemplates(): Record<string, any> {
    return {
      'Food & Beverage': {
        title: 'Premium Farm Products',
        subtitle: 'Fresh Quality You Can Trust',
        products: [
          { name: 'Signature Product', price: 'R99', description: 'Our most popular item' },
          { name: 'Premium Selection', price: 'R149', description: 'Top quality premium option' },
          { name: 'Value Pack', price: 'R199', description: 'Great value for families' }
        ],
        description: 'Experience the finest quality products, carefully selected and prepared with attention to detail.'
      },
      'Restaurant': {
        title: 'Delicious Dining Experience',
        subtitle: 'Authentic Flavors, Fresh Ingredients',
        products: [
          { name: 'Chef\'s Special', price: 'R165', description: 'Today\'s featured dish' },
          { name: 'House Favorite', price: 'R135', description: 'Customer favorite meal' },
          { name: 'Family Platter', price: 'R295', description: 'Perfect for sharing' }
        ],
        description: 'Join us for an unforgettable dining experience featuring authentic recipes and the freshest ingredients.'
      },
      'Retail': {
        title: 'Quality Products & Services',
        subtitle: 'Your Trusted Local Provider',
        products: [
          { name: 'Featured Item', price: 'R79', description: 'High-quality selection' },
          { name: 'Best Seller', price: 'R129', description: 'Most popular choice' },
          { name: 'Premium Option', price: 'R199', description: 'Top-tier quality' }
        ],
        description: 'Discover our wide range of quality products and services, backed by excellent customer support.'
      },
      'Service': {
        title: 'Professional Services',
        subtitle: 'Expert Solutions for Your Needs',
        products: [
          { name: 'Basic Service', price: 'R150', description: 'Essential service package' },
          { name: 'Premium Service', price: 'R250', description: 'Comprehensive solution' },
          { name: 'Full Package', price: 'R350', description: 'Complete service offering' }
        ],
        description: 'Professional services tailored to meet your specific needs with guaranteed satisfaction.'
      }
    };
  }

  // Map template type to flyer type
  private mapTemplateToType(templateType: TemplateType): 'products' | 'events' | 'catalog' | 'promotion' | 'custom' | '' {
    switch (templateType) {
      case 'catalog':
        return 'catalog';
      case 'promo':
        return 'promotion';
      default:
        return 'products';
    }
  }

  // Generate custom CSS for the template
  private generateCSS(analysis: any): string {
    const baseCSS = `
      /* AI-Generated Custom Template Styles */
      .ai-generated-template {
        background: linear-gradient(135deg, var(--primary-light), var(--primary));
        border-radius: var(--border-radius-lg);
        padding: var(--space-lg);
      }
    `;

    // Add style-specific customizations
    if (analysis.style === 'premium') {
      return `${baseCSS}
        .ai-generated-template {
          background: linear-gradient(135deg, #f8f9fa, #e9ecef);
          border: 2px solid var(--accent);
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        .ai-generated-template h1 {
          font-family: 'Georgia', serif;
          letter-spacing: 1px;
        }
      `;
    } else if (analysis.style === 'rustic') {
      return `${baseCSS}
        .ai-generated-template {
          background: linear-gradient(135deg, #f5f3f0, #e8e2d4);
          border: 3px solid #8b7355;
          box-shadow: inset 0 0 20px rgba(139, 115, 85, 0.1);
        }
        .ai-generated-template h1 {
          font-family: 'Arial', sans-serif;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }
      `;
    }

    return baseCSS;
  }

  // Validate user input
  validateRequest(request: TemplateRequest): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!request.description || request.description.trim().length < 10) {
      errors.push('Please provide a more detailed description (at least 10 characters)');
    }

    if (request.description && request.description.length > 1000) {
      errors.push('Description is too long (maximum 1000 characters)');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Get suggestions for user input
  getInputSuggestions(): { category: string; suggestions: string[] }[] {
    return [
      {
        category: 'Business Type',
        suggestions: [
          'Restaurant or food service',
          'Retail store or shop',
          'Professional service',
          'Farm or agricultural business',
          'Artisan or craft business'
        ]
      },
      {
        category: 'Style Preferences',
        suggestions: [
          'Modern and clean',
          'Elegant and premium',
          'Casual and friendly',
          'Rustic and natural',
          'Bold and eye-catching'
        ]
      },
      {
        category: 'Target Audience',
        suggestions: [
          'Local community',
          'Families with children',
          'Young professionals',
          'Premium market',
          'Budget-conscious customers'
        ]
      }
    ];
  }
}

// Export utility functions
export function createTemplateRequest(
  description: string,
  options: Partial<TemplateRequest> = {}
): TemplateRequest {
  return {
    description,
    businessType: options.businessType,
    targetAudience: options.targetAudience,
    style: options.style,
    colors: options.colors || [],
    requirements: options.requirements || []
  };
}

export function isGeneratedTemplate(template: any): template is GeneratedTemplate {
  return template && typeof template.id === 'string' && template.id.startsWith('custom-');
}
