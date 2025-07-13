import { useEffect, useState } from 'react';
import styles from './FlyerViewer.module.css';

interface FlyerViewerProps {
  flyerId: string;
}

export function FlyerViewer({ flyerId }: FlyerViewerProps) {
  const [flyer, setFlyer] = useState<{ id: string; title: string; html: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setFlyer(null);
    setError(null);
    fetch(`http://localhost:3001/api/flyers/${flyerId}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(setFlyer)
      .catch(() => setError('Could not load flyer.'));
  }, [flyerId]);

  if (error) return <div className={styles.errorText}>{error}</div>;
  if (!flyer) return <div>Loading...</div>;

  return (
    <div className={styles.flyerPreviewContainer}>
      <div className={styles.flyerPreview} dangerouslySetInnerHTML={{ __html: flyer.html }} />
    </div>
  );
} 