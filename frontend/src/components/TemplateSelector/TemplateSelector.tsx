import styles from './TemplateSelector.module.css';

export default function TemplateSelector({ templates, onSelect }: { templates: any[]; onSelect: (id: string) => void }) {
  const safeTemplates = templates || [];
  return (
    <div className={styles.templatesGrid}>
      {safeTemplates.map(template => (
        <div
          key={template.id}
          className={styles.templateCard}
          onClick={() => onSelect(template.id)}
        >
          <div className={styles.templatePreview}>
            <img src={template.image} alt={`${template.title} Preview`} />
          </div>
          <div className={styles.templateInfo}>
            <div className={styles.templateTitle}>{template.title}</div>
            <div className={styles.templateDescription}>{template.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
} 