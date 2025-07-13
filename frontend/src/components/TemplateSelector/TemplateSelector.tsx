import styles from './TemplateSelector.module.css';

export default function TemplateSelector({ templates, onSelect }: { templates: any[]; onSelect: (id: string) => void }) {
  return (
    <div className={styles.templatesGrid}>
      {templates.map(template => (
        <div
          key={template.id}
          className={styles.templateCard}
          onClick={() => onSelect(template.id)}
        >
          <div className={styles.templatePreview}>
            <img src={template.image} alt={template.title} />
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