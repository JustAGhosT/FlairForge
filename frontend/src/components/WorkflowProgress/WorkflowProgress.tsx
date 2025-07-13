import styles from './WorkflowProgress.module.css';

const steps = [
  { key: 'template', label: 'Choose Template', icon: '🎨' },
  { key: 'content', label: 'Add Content', icon: '📝' },
  { key: 'ai', label: 'AI Enhancement', icon: '🤖' },
  { key: 'preview', label: 'Preview', icon: '👁️' },
  { key: 'export', label: 'Export', icon: '⬇️' },
];

export default function WorkflowProgress({ currentStep }: { currentStep: string }) {
  const getStepIndex = (step: string) => steps.findIndex(s => s.key === step);
  return (
    <nav className={styles.progressBar} aria-label="Workflow Progress">
      {steps.map((step, idx) => {
        const isActive = step.key === currentStep;
        const isCompleted = getStepIndex(currentStep) > idx;
        return (
          <div
            key={step.key}
            className={`${styles.step} ${isActive ? styles.active : ''} ${isCompleted ? styles.completed : ''}`}
          >
            <div className={styles.stepCircle}>{isCompleted ? '✓' : idx + 1}</div>
            <div className={styles.stepIcon}>{step.icon}</div>
            <div className={styles.stepLabel}>{step.label}</div>
            {idx < steps.length - 1 && <div className={styles.connector} />}
          </div>
        );
      })}
    </nav>
  );
} 