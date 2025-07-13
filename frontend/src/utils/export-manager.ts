// Export and sharing utilities
import { FlyerData } from '../types';
import html2canvas from 'html2canvas';

export class ExportManager {
  async downloadAsJpg(_flyerData: FlyerData): Promise<void> {
    try {
      const canvas = await this.generateCanvas();
      const link = document.createElement('a');
      link.download = `cheesy-pig-flyer-${Date.now()}.jpg`;
      link.href = canvas.toDataURL('image/jpeg', 0.9);
      link.click();
    } catch (error) {
      console.error('Error downloading JPG:', error);
      alert('Error downloading flyer. Please try again.');
    }
  }

  async downloadAsPdf(_flyerData: FlyerData): Promise<void> {
    try {
      const canvas = await this.generateCanvas();
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head><title>Cheesy Pig Flyer</title></head>
            <body style="margin:0;padding:20px;text-align:center;">
              <img src="${canvas.toDataURL()}" style="max-width:100%;height:auto;">
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  }

  async downloadAsHtml(flyerData: FlyerData): Promise<void> {
    try {
      const htmlContent = this.generateStandaloneHtml(flyerData);
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `cheesy-pig-flyer-${Date.now()}.html`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading HTML:', error);
      alert('Error downloading HTML. Please try again.');
    }
  }

  shareViaWhatsapp(flyerData: FlyerData): void {
    const text = this.generateShareText(flyerData);
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  }

  shareViaEmail(flyerData: FlyerData): void {
    const subject = `Check out our ${flyerData.title}`;
    const body = this.generateShareText(flyerData);
    const url = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
  }

  async copyShareLink(_flyerData: FlyerData): Promise<void> {
    try {
      const shareUrl = `${window.location.origin}/flyer/${Date.now()}`;
      await navigator.clipboard.writeText(shareUrl);
      alert('Share link copied to clipboard!');
    } catch (error) {
      console.error('Error copying link:', error);
      alert('Error copying link. Please try again.');
    }
  }

  generateFinalImage(_flyerData: FlyerData): string {
    // This would generate and return a data URL for the final image
    // For now, return a placeholder
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==';
  }

  private async generateCanvas(): Promise<HTMLCanvasElement> {
    const flyerElement = document.querySelector('.flyer') as HTMLElement;
    if (!flyerElement) {
      throw new Error('Flyer element not found');
    }
    return await html2canvas(flyerElement, {
      backgroundColor: '#ffffff',
      scale: 2,
      useCORS: true
    });
  }

  private generateShareText(flyerData: FlyerData): string {
    let text = `🐷 ${flyerData.title}\n\n`;
    if (flyerData.subtitle) {
      text += `${flyerData.subtitle}\n\n`;
    }
    if (flyerData.description) {
      text += `${flyerData.description}\n\n`;
    }
    if (flyerData.products.length > 0) {
      text += 'Our Products:\n';
      flyerData.products.forEach(product => {
        text += `• ${product.name}`;
        if (product.price) text += ` - ${product.price}`;
        text += '\n';
      });
      text += '\n';
    }
    text += '📍 The Cheesy Pig, Bela Bela\n📱 WhatsApp: 060 375 0415';
    return text;
  }

  private generateStandaloneHtml(flyerData: FlyerData): string {
    // TODO: Dynamically import and render modular templates from src/templates/*
    // For now, fallback to basic HTML export only
    const { title, subtitle, description, products, selectedTemplate, colorScheme } = flyerData;
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - The Cheesy Pig</title>
  <style>
    body { font-family: 'Inter', sans-serif; background: #fffbe6; }
    .flyer { background: #fff; border-radius: 16px; padding: 2rem; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
    .flyer h1 { color: #FF6B35; font-size: 2rem; margin-bottom: 0.5rem; }
    .flyer p { color: #8B4513; font-size: 1.1rem; }
    .flyer ul { margin-top: 1rem; padding-left: 1.5rem; }
    .flyer li { margin-bottom: 0.5rem; }
  </style>
</head>
<body>
  <div class="flyer flyer-${selectedTemplate} color-scheme-${colorScheme}">
    <header class="flyer-header">
      <h1 class="flyer-title">${title}</h1>
      ${subtitle ? `<p class="flyer-subtitle">${subtitle}</p>` : ''}
    </header>
    <div class="flyer-content">
      ${description ? `<p class="flyer-description">${description}</p>` : ''}
      ${products.length > 0 ? `
        <div class="flyer-products">
          <h2>Our Products</h2>
          <ul class="product-list">
            ${products.map(product => `
              <li class="product-item">
                <div class="product-name">${product.name}</div>
                ${product.price ? `<div class="product-price">${product.price}</div>` : ''}
                ${product.description ? `<div class="product-desc">${product.description}</div>` : ''}
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
</body>
</html>`;
  }
}
