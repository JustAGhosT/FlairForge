import styles from './Export.module.css';

export default function Export() {
  return (
    <section className={styles.exportOptions}>
      <h3 className={styles.sectionTitle}>Download Options</h3>
      <div className={styles.optionButtons}>
        {/* Add download buttons here */}
      </div>
      <h3 className={styles.sectionTitle}>Sharing Options</h3>
      <div className={styles.shareButtons}>
        {/* Add share buttons here */}
      </div>
      <div className={styles.saveOption}>
        {/* Add save button here */}
      </div>
      <div className={styles.createNew}>
        {/* Add create new flyer button here */}
      </div>
    </section>
  );
} 