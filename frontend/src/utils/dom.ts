// DOM utilities
import { DOMElements } from '../types';

export function initializeDOM(): DOMElements {
  return {
    workflowSteps: document.querySelectorAll('.workflow-step'),
    workflowContent: document.querySelectorAll('.workflow-content'),
    inputForm: document.getElementById('flyer-input-form') as HTMLFormElement,
    flyerTitle: document.getElementById('flyer-title') as HTMLInputElement,
    flyerSubtitle: document.getElementById('flyer-subtitle') as HTMLInputElement,
    flyerType: document.getElementById('flyer-type') as HTMLSelectElement,
    flyerProducts: document.getElementById('flyer-products') as HTMLTextAreaElement,
    flyerDescription: document.getElementById('flyer-description') as HTMLTextAreaElement,
    btnAiEnhance: document.getElementById('btn-ai-enhance') as HTMLButtonElement,
    btnSkipAi: document.getElementById('btn-skip-ai') as HTMLButtonElement,
    aiProcessing: document.getElementById('ai-processing') as HTMLElement,
    aiResults: document.getElementById('ai-results') as HTMLElement,
    tabButtons: document.querySelectorAll('.tab-btn'),
    tabContents: document.querySelectorAll('.tab-content'),
    originalTitle: document.getElementById('original-title') as HTMLElement,
    originalDescription: document.getElementById('original-description') as HTMLElement,
    enhancedTitle: document.getElementById('enhanced-title') as HTMLElement,
    enhancedDescription: document.getElementById('enhanced-description') as HTMLElement,
    btnAcceptCopy: document.getElementById('btn-accept-copy') as HTMLButtonElement,
    btnRevertCopy: document.getElementById('btn-revert-copy') as HTMLButtonElement,
    btnToTemplates: document.getElementById('btn-to-templates') as HTMLButtonElement,
    templateCards: document.querySelectorAll('.template-card'),
    colorOptions: document.querySelectorAll('.color-option'),
    btnGeneratePreview: document.getElementById('btn-generate-preview') as HTMLButtonElement,
    flyerPreview: document.getElementById('flyer-preview') as HTMLElement,
    btnEditContent: document.getElementById('btn-edit-content') as HTMLButtonElement,
    btnChangeTemplate: document.getElementById('btn-change-template') as HTMLButtonElement,
    btnFinalize: document.getElementById('btn-finalize') as HTMLButtonElement,
    finalFlyerImage: document.getElementById('final-flyer-image') as HTMLImageElement,
    btnDownloadJpg: document.getElementById('btn-download-jpg') as HTMLButtonElement,
    btnDownloadPdf: document.getElementById('btn-download-pdf') as HTMLButtonElement,
    btnDownloadHtml: document.getElementById('btn-download-html') as HTMLButtonElement,
    btnShareWhatsapp: document.getElementById('btn-share-whatsapp') as HTMLButtonElement,
    btnShareEmail: document.getElementById('btn-share-email') as HTMLButtonElement,
    btnShareLink: document.getElementById('btn-share-link') as HTMLButtonElement,
    btnSaveFlyer: document.getElementById('btn-save-flyer') as HTMLButtonElement,
    btnCreateNew: document.getElementById('btn-create-new') as HTMLButtonElement
  };
}

export function showMessage(text: string, type: 'success' | 'error' | 'warning' | 'info'): void {
  const existingMessage = document.querySelector('.message');
  if (existingMessage) {
    existingMessage.remove();
  }

  const message = document.createElement('div');
  message.className = `message ${type} fade-in`;
  message.textContent = text;
  
  const container = document.querySelector('.container');
  if (container) {
    container.prepend(message);
  }
  
  setTimeout(() => {
    message.remove();
  }, 5000);
}

export function showLoading(element: HTMLElement, show: boolean): void {
  if (show) {
    element.classList.add('loading');
  } else {
    element.classList.remove('loading');
  }
}
