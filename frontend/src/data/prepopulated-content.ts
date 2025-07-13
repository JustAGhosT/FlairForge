// Prepopulated content for the existing flyer templates
import { FlyerData } from '../types';

export interface PrepopulatedFlyer {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  flyerData: FlyerData;
}

export const prepopulatedFlyers: PrepopulatedFlyer[] = [
  {
    id: 'featured-products',
    title: 'Featured Products Showcase',
    description: 'Premium pork products with featured highlights and special offers',
    thumbnail: '🥩',
    flyerData: {
      title: 'Premium Pork Products',
      subtitle: 'Farm-Fresh Quality from Bela Bela',
      type: 'products',
      products: [
        {
          name: 'Cheese Grillers',
          price: 'R80/500g',
          description: '100% pork with real cheese - breakfast or braai favourite'
        },
        {
          name: 'Premium Bacon',
          price: 'R35/200g', 
          description: 'Thick-cut rashers, naturally cured from heritage pork'
        },
        {
          name: 'Pork Steaks',
          price: 'R130/kg',
          description: 'Juicy chops and cuts - trimmed to your specification'
        }
      ],
      description: 'Experience the exceptional quality of our heritage pork, ethically raised on market vegetables and crafted into delicious artisanal products your family will love.',
      enhancedContent: null,
      selectedTemplate: 'modern',
      colorScheme: 'default',
      finalImageUrl: null
    }
  },
  {
    id: 'complete-catalog',
    title: 'Complete Product Catalog',
    description: 'Comprehensive product range with pre-orders and special offers',
    thumbnail: '📋',
    flyerData: {
      title: 'The Cheesy Pig',
      subtitle: 'Complete Product Range & Ordering Info',
      type: 'catalog',
      products: [
        {
          name: 'Cheese Grillers',
          price: 'R80/500g',
          description: '100% pork & real cheese — breakfast or braai favourite'
        },
        {
          name: 'Premium Bacon',
          price: 'R35/200g',
          description: 'Thick-cut rashers, naturally cured from heritage pork'
        },
        {
          name: 'Pork Steaks & Cuts',
          price: 'R130/kg',
          description: 'Juicy chops, roasts & more — trimmed to your spec'
        },
        {
          name: 'Pork Soup Bones',
          price: 'R20/kg',
          description: 'Rich marrow bones — perfect for broths & potjie'
        },
        {
          name: 'Free-range Eggs',
          price: 'R90/tray',
          description: 'Farm-fresh eggs from happy hens (seasonal)'
        },
        {
          name: 'Custom Processing',
          price: 'Quote',
          description: 'Specialty cuts & whole-hog processing on request'
        }
      ],
      description: 'Premium market-veg-fed pork with professional packaging and artisan quality.',
      enhancedContent: null,
      selectedTemplate: 'catalog',
      colorScheme: 'default',
      finalImageUrl: null
    }
  },
  {
    id: 'social-promo',
    title: 'Social Media Promo',
    description: 'Casual, photo-focused flyer perfect for WhatsApp and social sharing',
    thumbnail: '📱',
    flyerData: {
      title: 'The Cheesy Pig',
      subtitle: 'Special Combo Deal',
      type: 'promotion',
      products: [
        {
          name: 'Premium Pork Pack',
          price: 'R175',
          description: 'Mixed premium cuts including rashers, bacon, and cheese grillers'
        },
        {
          name: 'Pork Rashers',
          price: '400g included',
          description: 'Fresh pork rashers'
        },
        {
          name: 'Bacon',
          price: '200g included',
          description: 'Premium bacon cuts'
        }
      ],
      description: 'Great value combo pack perfect for family meals and special occasions.',
      enhancedContent: null,
      selectedTemplate: 'promo',
      colorScheme: 'default',
      finalImageUrl: null
    }
  }
];

export const templateOptions = [
  {
    id: 'modern',
    name: 'Modern Showcase',
    description: 'Clean, contemporary design with featured products and rich styling',
    thumbnail: '🎨',
    preview: 'assets/templates/modern.jpg',
    features: ['Featured product highlights', 'Special offers section', 'Professional typography', 'Rich gradients and shadows']
  },
  {
    id: 'catalog',
    name: 'Complete Catalog',
    description: 'Comprehensive product listing with pre-orders and dual contact info',
    thumbnail: '📚',
    preview: 'assets/templates/catalog.jpg',
    features: ['6+ product grid', 'Pre-order banner', 'Bilingual content', 'Bulk order pricing']
  },
  {
    id: 'promo',
    name: 'Social Media Promo',
    description: 'Casual, photo-focused design perfect for WhatsApp and social sharing',
    thumbnail: '📱',
    preview: 'assets/templates/promo.jpg',
    features: ['Photo-centric layout', 'Bold pricing display', 'Mobile optimized', 'Quick contact info']
  },
  {
    id: 'premium',
    name: 'Premium Elegant',
    description: 'Luxury-focused design with elegant typography and sophisticated styling',
    thumbnail: '💎',
    preview: 'assets/templates/premium.jpg',
    features: ['Elegant typography', 'Luxury styling', 'Premium positioning', 'Sophisticated layout']
  },
  {
    id: 'rustic',
    name: 'Farm-Style Rustic',
    description: 'Earthy, farm-style design with natural textures and warm colors',
    thumbnail: '🌾',
    preview: 'assets/templates/rustic.jpg',
    features: ['Natural textures', 'Warm color palette', 'Farm-style elements', 'Organic feel']
  }
];

export const templateCreationOptions = [
  {
    id: 'use-existing',
    title: 'Use Existing Template',
    description: 'Choose from our professionally designed templates',
    icon: '🎨',
    action: 'select-template'
  },
  {
    id: 'upload-example',
    title: 'Upload Example Flyer',
    description: 'Upload a photo of your existing flyer for AI conversion',
    icon: '📸',
    action: 'upload-flyer'
  },
  {
    id: 'ai-generate',
    title: 'AI Generate Template',
    description: 'Describe your needs and let AI create a custom template',
    icon: '🤖',
    action: 'ai-template'
  },
  {
    id: 'blank-template',
    title: 'Start from Scratch',
    description: 'Create a new flyer with just your content',
    icon: '📄',
    action: 'blank-start'
  }
];
