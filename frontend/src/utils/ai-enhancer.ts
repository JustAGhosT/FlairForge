// AI content enhancement utilities
import { EnhancedContent, OriginalContent, FlyerType } from '../types';

export class AIEnhancer {
  enhanceContent(original: OriginalContent, flyerType: FlyerType): EnhancedContent {
    return {
      title: this.addMarketingFlair(original.title),
      description: this.expandDescription(original.description, flyerType)
    };
  }

  private addMarketingFlair(title: string): string {
    const prefixes = ['Premium', 'Artisanal', 'Farm-Fresh', 'Handcrafted', 'Gourmet'];
    
    if (title.includes('Premium') || title.includes('Artisan')) {
      return title;
    }
    
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    
    if (!title.includes(randomPrefix)) {
      return `${randomPrefix} ${title}`;
    }
    
    return title;
  }

  private expandDescription(description: string, type: FlyerType): string {
    if (!description || description.length < 10) {
      return this.getGenericDescription(type);
    }
    
    let enhanced = description;
    
    if (!enhanced.includes('quality') && !enhanced.includes('premium')) {
      enhanced += ' Our commitment to quality ensures you get the best pork products available.';
    }
    
    if (!enhanced.includes('farm') && !enhanced.includes('fresh')) {
      enhanced += ' Straight from our farm to your table for maximum freshness.';
    }
    
    return enhanced;
  }

  private getGenericDescription(type: FlyerType): string {
    switch (type) {
      case 'products':
        return 'Experience the exceptional quality of our heritage pork, ethically raised on market vegetables and crafted into delicious artisanal products your family will love.';
      case 'events':
        return 'Join us for an unforgettable farm experience where you\'ll learn about sustainable farming practices while enjoying our premium pork products in a beautiful countryside setting.';
      case 'catalog':
        return 'Browse our complete selection of farm-fresh pork products, all ethically raised, professionally packaged, and delivered with the quality and service you deserve.';
      default:
        return 'The Cheesy Pig brings you premium pork products made with dedication to quality and tradition. Try our delicious offerings today!';
    }
  }
}
