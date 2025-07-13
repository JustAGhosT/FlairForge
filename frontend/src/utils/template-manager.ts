// Template management utilities
import { TemplateType, ColorScheme } from '../types';

export class TemplateManager {
  getTemplateCSS(template: TemplateType, colorScheme: ColorScheme): string {
    const baseCSS = this.getBaseTemplateCSS();
    const templateCSS = this.getTemplateSpecificCSS(template);
    const colorCSS = this.getColorSchemeCSS(colorScheme);
    
    return `${baseCSS}\n${templateCSS}\n${colorCSS}`;
  }

  private getBaseTemplateCSS(): string {
    return `
      .flyer {
        width: 100%;
        max-width: 800px;
        margin: 0 auto;
        font-family: var(--font-family-base);
        padding: var(--space-lg);
        border-radius: var(--border-radius-md);
        box-shadow: var(--shadow-md);
      }
      
      .flyer-header {
        text-align: center;
        margin-bottom: var(--space-xl);
      }
      
      .flyer-title {
        font-size: 2.5rem;
        font-weight: bold;
        margin-bottom: var(--space-sm);
      }
      
      .flyer-subtitle {
        font-size: 1.25rem;
        color: var(--gray-600);
        margin-bottom: var(--space-md);
      }
      
      .flyer-content {
        margin-bottom: var(--space-xl);
      }
      
      .flyer-description {
        font-size: 1.125rem;
        line-height: 1.6;
        margin-bottom: var(--space-lg);
        text-align: center;
      }
      
      .flyer-products h2 {
        text-align: center;
        margin-bottom: var(--space-lg);
        font-size: 1.75rem;
      }
      
      .product-list {
        list-style: none;
        padding: 0;
        display: grid;
        gap: var(--space-md);
      }
      
      .product-item {
        background-color: rgba(255, 255, 255, 0.8);
        padding: var(--space-md);
        border-radius: var(--border-radius-sm);
        border-left: 4px solid var(--primary);
      }
      
      .product-name {
        font-weight: bold;
        font-size: 1.125rem;
        margin-bottom: var(--space-xs);
      }
      
      .product-price {
        color: var(--primary);
        font-weight: bold;
        font-size: 1rem;
        margin-bottom: var(--space-xs);
      }
      
      .product-desc {
        color: var(--gray-600);
        font-size: 0.875rem;
      }
      
      .flyer-footer {
        text-align: center;
        padding-top: var(--space-lg);
        border-top: 2px solid var(--primary);
        font-weight: 500;
      }
      
      .flyer-footer p {
        margin-bottom: var(--space-xs);
      }
    `;
  }

  private getTemplateSpecificCSS(template: TemplateType): string {
    switch (template) {
      case 'modern':
        return `
          .flyer-modern {
            background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
          }
          
          .flyer-modern .flyer-title {
            background: linear-gradient(45deg, var(--primary), var(--accent));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .flyer-modern .product-item {
            box-shadow: var(--shadow-sm);
            transition: transform var(--transition-fast);
          }
          
          .flyer-modern .product-item:hover {
            transform: translateY(-2px);
          }
        `;
        
      case 'rustic':
        return `
          .flyer-rustic {
            background-color: #f8f4e9;
            background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSI+CjxyZWN0IHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgZmlsbD0iI2Y4ZjRlOSI+PC9yZWN0Pgo8Y2lyY2xlIGN4PSI3LjUiIGN5PSI3LjUiIHI9IjAuNSIgZmlsbD0icmdiYSgxNzAsMTQyLDExMSwwLjEpIj48L2NpcmNsZT4KPC9zdmc+');
            border: 3px solid #8B4513;
          }
          
          .flyer-rustic .flyer-title {
            font-family: 'Georgia', serif;
            color: #8B4513;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
          }
          
          .flyer-rustic .product-item {
            background-color: rgba(255, 248, 233, 0.9);
            border-left-color: #8B4513;
          }
        `;
        
      case 'premium':
        return `
          .flyer-premium {
            background-color: #f9f9f9;
            background-image: linear-gradient(135deg, rgba(0,0,0,0.05) 25%, transparent 25%, transparent 50%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.05) 75%, transparent 75%, transparent);
            background-size: 20px 20px;
            border: 2px solid #gold;
          }
          
          .flyer-premium .flyer-title {
            font-family: 'Times New Roman', serif;
            color: #2c3e50;
            position: relative;
          }
          
          .flyer-premium .flyer-title::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 100px;
            height: 2px;
            background: linear-gradient(90deg, transparent, #gold, transparent);
          }
          
          .flyer-premium .product-item {
            background-color: rgba(255, 255, 255, 0.95);
            border: 1px solid #ddd;
            border-left: 4px solid #gold;
          }
        `;
        
      case 'promo':
        return `
          .flyer-promo {
            background-color: #fff9c4;
            position: relative;
            border: 3px dashed var(--primary);
          }
          
          .flyer-promo::before {
            content: 'SPECIAL OFFER!';
            position: absolute;
            top: 15px;
            right: 15px;
            background-color: var(--primary);
            color: white;
            padding: var(--space-xs) var(--space-sm);
            border-radius: var(--border-radius-sm);
            font-weight: bold;
            font-size: 0.875rem;
            transform: rotate(15deg);
            z-index: 1;
          }
          
          .flyer-promo .flyer-title {
            color: var(--primary);
            text-transform: uppercase;
            letter-spacing: 2px;
          }
          
          .flyer-promo .product-item {
            background-color: rgba(255, 255, 255, 0.9);
            border: 2px solid var(--primary);
            border-radius: var(--border-radius-md);
          }
          
          .flyer-promo .product-price {
            font-size: 1.25rem;
            background-color: var(--primary);
            color: white;
            padding: var(--space-xs);
            border-radius: var(--border-radius-sm);
            display: inline-block;
          }
        `;
        
      default:
        return '';
    }
  }

  private getColorSchemeCSS(colorScheme: ColorScheme): string {
    switch (colorScheme) {
      case 'green':
        return `
          .color-scheme-green {
            --primary: #4CAF50;
            --primary-dark: #388E3C;
          }
        `;
        
      case 'blue':
        return `
          .color-scheme-blue {
            --primary: #2196F3;
            --primary-dark: #0B79D0;
          }
        `;
        
      case 'purple':
        return `
          .color-scheme-purple {
            --primary: #9C27B0;
            --primary-dark: #6A1B9A;
          }
        `;
        
      default:
        return '';
    }
  }
}
