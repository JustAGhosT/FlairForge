import styles from './Preview.module.css';

export default function Preview({ html }: { html: string }) {
  return (
    <div className={styles.previewContainer}>
      <div className={styles.flyerPreview} dangerouslySetInnerHTML={{ __html: html }} />
      {/* Add controls or additional preview info as needed */}
    </div>
  );
} 