import styles from './WorkflowControls.module.css';

export default function WorkflowControls({ onPrev, onNext }: { onPrev: () => void; onNext: () => void }) {
  return (
    <div className={styles.workflowControls}>
      <button onClick={onPrev}>Previous</button>
      <button onClick={onNext}>Next</button>
    </div>
  );
} 