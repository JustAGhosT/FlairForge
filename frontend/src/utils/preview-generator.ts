// Preview generation utilities
import { FlyerData } from '../types';

export class PreviewGenerator {
  // TODO: Dynamically import and render modular templates from src/templates/*
  // For now, fallback to basic preview only

  generatePreview(flyerData: FlyerData): string {
    return this.generateBasicPreview(flyerData);
  }

  private generateBasicPreview(flyerData: FlyerData): string {
    const { title, subtitle, description, products, selectedTemplate, colorScheme } = flyerData;
    return `
      <div class="flyer flyer-${selectedTemplate} color-scheme-${colorScheme}">
        <header class="flyer-header">
          <h1 class="flyer-title">${this.escapeHtml(title)}</h1>
          ${subtitle ? `<p class="flyer-subtitle">${this.escapeHtml(subtitle)}</p>` : ''}
        </header>
        <div class="flyer-content">
          ${description ? `<p class="flyer-description">${this.escapeHtml(description)}</p>` : ''}
          ${products.length > 0 ? `
            <div class="flyer-products">
              <h2>Our Products</h2>
              <ul class="product-list">
                ${products.map(product => `
                  <li class="product-item">
                    <div class="product-name">${this.escapeHtml(product.name)}</div>
                    ${product.price ? `<div class="product-price">${this.escapeHtml(product.price)}</div>` : ''}
                    ${product.description ? `<div class="product-desc">${this.escapeHtml(product.description)}</div>` : ''}
                  </li>
                `).join('')}
              </ul>
            </div>
          ` : ''}
        </div>
        <footer class="flyer-footer">
          <p>🐷 The Cheesy Pig • Premium Farm-Fresh Pork • Bela Bela</p>
          <p>WhatsApp orders: 060 375 0415</p>
        </footer>
      </div>
    `;
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  async generateFinalImage(_flyerData: FlyerData): Promise<string> {
    // This would use html2canvas or similar library to generate an image
    // For now, return a placeholder
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==';
  }
}
