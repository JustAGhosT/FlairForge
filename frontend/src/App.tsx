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


function TemplateStep() {
  const { selectedOption, setSelectedOption } = useTemplateStepStore();

  return (
    <section className={`${styles.workflowContent} active`}>
      <div className={styles.contentHeader}>
        <h2>How would you like to create your flyer?</h2>
        {/* BackToGalleryButton removed */}
      </div>
      <div className={styles.templateCreationOptions}>
        <div className={styles.creationGrid}>
          {creationOptions.map(option => (
            <div
              key={option.id}
              className={`${styles.creationOption}${selectedOption === option.action ? ` ${styles.selected}` : ''}`}
              onClick={() => setSelectedOption(option.action)}
              tabIndex={0}
              role="button"
              aria-pressed={selectedOption === option.action}
            >
              <div className={styles.creationIcon}>{option.icon}</div>
              <h4>{option.title}</h4>
              <p>{option.description}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Sub-panels based on selection */}
      {selectedOption === 'select-template' && (
        <div className={styles.sectionSpacer}>
          <h3 className={styles.sectionTitleAlt}>Select a Template (Gallery Placeholder)</h3>
        </div>
      )}
      {selectedOption === 'upload-flyer' && (
        <div>
          <h3>Upload Example Flyer (Upload Placeholder)</h3>
        </div>
      )}
      {selectedOption === 'ai-template' && (
        <div>
          <h3>AI Generate Template (AI Form Placeholder)</h3>
        </div>
      )}
      {selectedOption === 'blank-start' && (
        <div>
          <h3>Start from Scratch (Blank Start Placeholder)</h3>
        </div>
      )}
    </section>
  );
}

function ContentStep() {
  const updateFlyerData = useAppStore(state => state.updateFlyerData);

  // Example prepopulated content (should be imported from data in a real app)
  const prepopulated = [
    {
      id: 'featured-products',
      icon: '🥩',
      title: 'Featured Products Showcase',
      description: 'Premium pork products with featured highlights and special offers',
      flyerData: { title: 'Featured Products', description: 'Premium pork products...', products: [] }
    },
    {
      id: 'complete-catalog',
      icon: '📋',
      title: 'Complete Product Catalog',
      description: 'Comprehensive product range with pre-orders and special offers',
      flyerData: { title: 'Complete Catalog', description: 'Comprehensive product range...', products: [] }
    }
  ];

  return (
    <section className={`${styles.workflowContent} active`}>
      <div className={styles.contentHeader}>
        <h2>Add Your Content</h2>
        <p className={styles.description}>Choose from existing content or create your own.</p>
      </div>
      <div className={styles.contentSelection}>
        <h3>Quick Start with Prepopulated Content</h3>
        <div className={styles.prepopulatedGrid}>
          {prepopulated.map(card => (
            <div key={card.id} className={styles.prepopulatedCard} onClick={() => updateFlyerData(card.flyerData)}>
              <div className={styles.prepopulatedThumbnail}>{card.icon}</div>
              <div className={styles.prepopulatedInfo}>
                <h4>{card.title}</h4>
                <p>{card.description}</p>
                <button className={`${styles.useContent} ${styles.primary}`} type="button">Use This Content</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.sectionSpacer}>
        <h3>Flyer Content Form (Placeholder)</h3>
        {/* TODO: Add flyer content form here, bind to Zustand flyerData */}
      </div>
    </section>
  );
}
function AIStep() {
  // Example: Use TanStack Query for async AI enhancement (placeholder)
  const { data, isLoading, isError } = useQuery({
    queryKey: ['aiEnhance'],
    queryFn: async () => {
      // Simulate async AI enhancement
      await new Promise(res => setTimeout(res, 1500));
      return { original: 'Original content', enhanced: 'AI Enhanced content' };
    },
  });

  return (
    <section className={`${styles.workflowContent} active`}>
      <div className={styles.contentHeader}>
        <h2>AI Content Enhancement</h2>
        <p className={styles.description}>Our AI is analyzing your content and enhancing it for better marketing impact.</p>
      </div>
      {isLoading && (
        <div className={styles.aiProcessing}>
          <div className={styles.spinner}></div>
          <p>Processing your content with AI...</p>
          <div className={`${styles.progressBar} ${styles.progressBar65}`}></div>
        </div>
      )}
      {isError && <div>Error enhancing content.</div>}
      {data && (
        <div className={styles.aiResults}>
          <h3>Enhanced Content</h3>
          <div className={styles.tabs}>
            <button className={`${styles.tabBtn} active`} data-tab="copy">Copy</button>
            <button className={styles.tabBtn} data-tab="products">Products</button>
            <button className={styles.tabBtn} data-tab="features">Features</button>
          </div>
          <div className={`${styles.tabContent} active`}>
            <div className={styles.comparison}>
              <div className={styles.original}>
                <h4 className={styles.sectionTitle}>Original</h4>
                <p>{data.original}</p>
              </div>
              <div className={styles.enhanced}>
                <h4 className={styles.sectionTitle}>AI Enhanced</h4>
                <p>{data.enhanced}</p>
              </div>
            </div>
            <div className={styles.formActions}>
              <button type="button" className={styles.primary}>Accept Enhanced Copy</button>
              <button type="button" className={styles.secondary}>Use Original Copy</button>
            </div>
          </div>
          <div className={`${styles.formActions} ${styles.actionRow}`}>
            <button type="button" className={styles.primary}>Continue to Templates</button>
          </div>
        </div>
      )}
    </section>
  );
}
function PreviewStep() {
  // Placeholder: Use Zustand flyerData for preview
  return (
    <section className={`${styles.workflowContent} active`}>
      <div className={styles.contentHeader}>
        <h2>Preview Your Flyer</h2>
        <p className={styles.description}>Here&apos;s how your flyer looks. You can make adjustments if needed.</p>
      </div>
      <div className={styles.previewControls}>
        <div className={styles.editOptions}>
          <button className={styles.secondary}><i className="fas fa-edit icon"></i> Edit Content</button>
          <button className={styles.secondary}><i className="fas fa-palette icon"></i> Change Template</button>
        </div>
        <div className={styles.formActions}>
          <button type="button" className={styles.primary}>Finalize Flyer</button>
        </div>
      </div>
      <div className={styles.sectionSpacer}>
        <h3>Flyer Preview (Placeholder)</h3>
        <div className={styles.previewPlaceholder}>
          <i className="fas fa-image"></i>
          <p>Your flyer preview will appear here</p>
        </div>
      </div>
    </section>
  );
}

function ExportStep() {
  // Placeholder: Use Zustand flyerData for export/share
  return (
    <section className={`${styles.workflowContent} active`}>
      <div className={styles.contentHeader}>
        <h2>Export Your Flyer</h2>
        <p className={styles.description}>Your flyer is ready! Download it or share it online.</p>
      </div>
      <div className={styles.exportOptions}>
        <h3 className={styles.sectionTitle}>Download Options</h3>
        <div className={styles.optionButtons}>
          <button className={styles.primary}><i className="fas fa-file-image icon"></i> Download as JPG</button>
          <button className={styles.secondary}><i className="fas fa-file-pdf icon"></i> Download as PDF</button>
          <button className={styles.secondary}><i className="fas fa-file-code icon"></i> Download HTML &amp; CSS</button>
        </div>
        <h3 className={styles.sectionTitle}>Sharing Options</h3>
        <div className={styles.shareButtons}>
          <button className={styles.whatsapp}><i className="fab fa-whatsapp icon"></i> Share via WhatsApp</button>
          <button className={styles.email}><i className="fas fa-envelope icon"></i> Share via Email</button>
          <button className={styles.link}><i className="fas fa-link icon"></i> Copy Link</button>
        </div>
        <div className={styles.saveOption}>
          <button className={styles.tertiary}><i className="fas fa-save icon"></i> Save to My Flyers</button>
        </div>
        <div className={styles.createNew}>
          <button className={styles.primary}><i className="fas fa-plus icon"></i> Create New Flyer</button>
        </div>
      </div>
    </section>
  );
}

export function App() {
  return <MainLayout />;
} 