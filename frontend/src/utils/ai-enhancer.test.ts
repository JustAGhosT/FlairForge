import { describe, it, expect } from 'vitest';
import { AIEnhancer } from './ai-enhancer';
import { OriginalContent } from '../types';

describe('AIEnhancer', () => {
  it('adds marketing flair to the title', () => {
    const enhancer = new AIEnhancer();
    const original: OriginalContent = {
      title: 'Pork Sausages',
      subtitle: '',
      description: 'Delicious farm sausages.'
    };
    const result = enhancer.enhanceContent(original, 'products');
    expect(result.title).not.toBe('Pork Sausages');
    expect(result.title).toMatch(/Pork Sausages/);
  });

  it('expands a short description', () => {
    const enhancer = new AIEnhancer();
    const original: OriginalContent = {
      title: 'Pork Sausages',
      subtitle: '',
      description: 'Tasty.'
    };
    const result = enhancer.enhanceContent(original, 'products');
    expect(result.description.length).toBeGreaterThan(10);
  });
}); 