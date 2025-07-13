// Form utilities
import { DOMElements, Product, FlyerType } from '../types';
import { showMessage } from './dom';

export function validateForm(DOM: DOMElements): boolean {
  const requiredFields = [
    { element: DOM.flyerTitle, name: 'title' },
    { element: DOM.flyerType, name: 'flyer type' }
  ];
  
  for (const field of requiredFields) {
    if (!field.element?.value?.trim()) {
      showMessage(`Please enter a ${field.name}`, 'error');
      field.element?.focus();
      return false;
    }
  }
  
  return true;
}

export function saveFormData(DOM: DOMElements) {
  const products = parseProducts(DOM.flyerProducts?.value || '');
  
  return {
    title: DOM.flyerTitle?.value?.trim() || '',
    subtitle: DOM.flyerSubtitle?.value?.trim() || '',
    type: (DOM.flyerType?.value || '') as FlyerType,
    description: DOM.flyerDescription?.value?.trim() || '',
    products
  };
}

function parseProducts(productsText: string): Product[] {
  if (!productsText.trim()) return [];
  
  return productsText
    .split('\n')
    .filter(line => line.trim())
    .map(line => {
      const parts = line.split('|').map(part => part.trim());
      return {
        name: parts[0] || '',
        price: parts[1] || '',
        description: parts[2] || ''
      };
    });
}

export function clearForm(DOM: DOMElements): void {
  if (DOM.flyerTitle) DOM.flyerTitle.value = '';
  if (DOM.flyerSubtitle) DOM.flyerSubtitle.value = '';
  if (DOM.flyerType) DOM.flyerType.value = '';
  if (DOM.flyerProducts) DOM.flyerProducts.value = '';
  if (DOM.flyerDescription) DOM.flyerDescription.value = '';
}
