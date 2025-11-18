import React from 'react';
import creationOptions from './data/creationOptions.json';
import './global.css';
import { useAppStore } from './store/useAppStore';
// Zustand for local UI state (selected creation option)
import { useQuery } from '@tanstack/react-query';
import { create } from 'zustand';
import styles from './App.module.css';
import Header from './components/Header';

const useTemplateStepStore = create<{ selectedOption: string | null; setSelectedOption: (option: string) => void }>((set: any) => ({
  selectedOption: null,
  setSelectedOption: (option: string) => set({ selectedOption: option }),
}));



function MainLayout() {
  const [showFlyerCreator, setShowFlyerCreator] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  return (
    <main className={styles.appMain}>
      <div className={styles.container}>
        <div className={styles.spacer} />
        <Header />
        <button data-testid="create-flyer-button" className={styles.primary} onClick={() => setShowFlyerCreator(true)}>
          Create Flyer
        </button>
        <button data-testid="mobile-menu-button" className={styles.mobileMenuBtn} onClick={() => setMobileMenuOpen(v => !v)}>
          ☰
        </button>
        {mobileMenuOpen && (
          <nav data-testid="mobile-menu" className={styles.mobileMenu}>
            <ul>
              <li><button data-testid="templates-tab">Templates</button></li>
              <li><button data-testid="ai-enhancement-tab">AI Enhancement</button></li>
            </ul>
          </nav>
        )}
        {showFlyerCreator && <FlyerCreator onClose={() => setShowFlyerCreator(false)} />}
      </div>
    </main>
  );
}

function FlyerCreator({ onClose }: { onClose: () => void }) {
  const [step, setStep] = React.useState<'template'|'content'|'ai'|'preview'|'export'>('template');
  const [selectedTemplate, setSelectedTemplate] = React.useState<string|null>(null);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [contact, setContact] = React.useState('');
  const [error, setError] = React.useState<string|null>(null);
  const [aiInput, setAiInput] = React.useState('');
  const [aiOutput, setAiOutput] = React.useState('');
  const [showPreview, setShowPreview] = React.useState(false);
  const [exportMsg, setExportMsg] = React.useState('');

  // Simulate AI enhancement
  const handleEnhance = () => {
    setTimeout(() => setAiOutput(aiInput ? `${aiInput} (Enhanced)` : ''), 500);
  };

  // Simulate export
  const handleExport = (type: string) => {
    setExportMsg(`Exported as ${type.toUpperCase()}`);
    setTimeout(() => setExportMsg(''), 1500);
  };

  return (
    <div data-testid="flyer-creator" className={styles.flyerCreatorPanel}>
      <button onClick={onClose} className={styles.closeBtn}>X</button>
      <div className={styles.tabs}>
        <button data-testid="templates-tab" className={step==='template'?styles.activeTab:''} onClick={()=>setStep('template')}>Templates</button>
        <button data-testid="ai-enhancement-tab" className={step==='ai'?styles.activeTab:''} onClick={()=>setStep('ai')}>AI Enhancement</button>
      </div>
      {step==='template' && (
        <div>
          <h2>Select a Template</h2>
          <div data-testid="templates-grid" className={styles.templatesGrid}>
            <button data-testid="template-cheesy-pig" className={selectedTemplate==='cheesy-pig'?styles.selectedTemplate:''} onClick={()=>setSelectedTemplate('cheesy-pig')}>Cheesy Pig</button>
            <button data-testid="template-business-classic" className={selectedTemplate==='business-classic'?styles.selectedTemplate:''} onClick={()=>setSelectedTemplate('business-classic')}>Business Classic</button>
          </div>
          <div data-testid="selected-template">{selectedTemplate}</div>
          <div data-testid="template-preview" className={styles.templatePreview}>Template Preview: {selectedTemplate}</div>
          <button data-testid="generate-flyer-button" className={styles.primary} onClick={() => {
            if (!selectedTemplate) {
              setError('Please select a template');
              return;
            }
            setStep('content');
            setError(null);
          }}>Next</button>
        </div>
      )}
      {step==='content' && (
        <div>
          <h2>Enter Flyer Details</h2>
          <input data-testid="title-input" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
          {error && <div data-testid="title-error" className={styles.error}>{error}</div>}
          <input data-testid="description-input" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
          <input data-testid="contact-input" placeholder="Contact" value={contact} onChange={e=>setContact(e.target.value)} />
          <button data-testid="generate-flyer-button" className={styles.primary} onClick={() => {
            if (!title) {
              setError('Title is required');
              return;
            }
            setShowPreview(true);
            setStep('preview');
            setError(null);
          }}>Generate Flyer</button>
        </div>
      )}
      {step==='ai' && (
        <div data-testid="ai-enhancement-panel">
          <h2>AI Enhancement</h2>
          <input data-testid="content-input" placeholder="Content to enhance" value={aiInput} onChange={e=>setAiInput(e.target.value)} />
          <button data-testid="enhance-content-button" onClick={handleEnhance}>Enhance</button>
          <div data-testid="enhanced-content">{aiOutput}</div>
        </div>
      )}
      {step==='preview' && showPreview && (
        <div data-testid="flyer-preview" className={styles.flyerPreview}>
          <h3 data-testid="flyer-title">{title}</h3>
          <p data-testid="flyer-description">{description}</p>
          <p>Contact: {contact}</p>
          <button data-testid="export-png-button" onClick={()=>handleExport('png')}>Export as PNG</button>
          <button data-testid="export-pdf-button" onClick={()=>handleExport('pdf')}>Export as PDF</button>
          {exportMsg && <div>{exportMsg}</div>}
        </div>
      )}
      {error && <div data-testid="error-message" className={styles.error}>{error}</div>}
    </div>
  );
}
    </section>
  );
}

export function App() {
  return <MainLayout />;
} 