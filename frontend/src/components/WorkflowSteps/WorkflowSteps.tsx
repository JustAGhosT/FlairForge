import { ReactNode } from 'react';
import styles from './WorkflowSteps.module.css';

export default function WorkflowSteps({ children }: { children: ReactNode }) {
  return <div className={styles.workflowCard}>{children}</div>;
} 