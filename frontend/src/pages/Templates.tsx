import { useEffect, useState } from 'react';
import '../global.css';
import { FlyerViewer } from './FlyerViewer';
import styles from './Templates.module.css';

interface FlyerMeta {
  id: string;
  title: string;
}

export default function Templates() {
  const [flyers, setFlyers] = useState<FlyerMeta[]>([]);
  const [selectedFlyer, setSelectedFlyer] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/flyers')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch flyer list');
        return res.json();
      })
      .then(setFlyers)
      .catch(() => setError('Could not load flyer list.'));
  }, []);

  if (error) return <div style={{ color: 'var(--error)' }}>{error}</div>;

  return (
    <div className={`container ${styles.templatesContainer}`}>
      <h2>Template Gallery</h2>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        {flyers.map(flyer => (
          <div key={flyer.id} className={styles.templateCard}>
            <h3>{flyer.title}</h3>
            <div style={{ margin: '12px 0', minHeight: 120 }}>
              <button onClick={() => setSelectedFlyer(flyer.id)}>Preview</button>
            </div>
          </div>
        ))}
      </div>
      {selectedFlyer && (
        <div style={{ marginTop: 32 }}>
          <h3>Flyer Preview</h3>
          <FlyerViewer flyerId={selectedFlyer} />
          <button style={{ marginTop: 16 }} onClick={() => setSelectedFlyer(null)}>Close Preview</button>
        </div>
      )}
    </div>
  );
} 