import '../global.css';
import styles from './About.module.css';

export default function About() {
  return (
    <div className={`container ${styles.aboutContainer}`}>
      <div className={styles.aboutTitle}>About FlairForge</div>
      <div className={styles.aboutContent}>
        <p>
          FlairForge is an innovative AI-powered flyer generator designed specifically for The Cheesy Pig. 
          Our platform combines cutting-edge artificial intelligence with intuitive design tools to help 
          you create professional, eye-catching flyers in minutes.
        </p>
      </div>
      
      <div className={styles.aboutFeatures}>
        <div className={styles.aboutFeature}>
          <span className={styles.featureIcon}>🎨</span>
          <h3 className={styles.featureTitle}>Smart Templates</h3>
          <p className={styles.featureDescription}>
            Choose from a curated collection of professional templates designed specifically for food businesses.
          </p>
        </div>
        
        <div className={styles.aboutFeature}>
          <span className={styles.featureIcon}>🤖</span>
          <h3 className={styles.featureTitle}>AI Enhancement</h3>
          <p className={styles.featureDescription}>
            Our AI analyzes your content and suggests improvements for better marketing impact.
          </p>
        </div>
        
        <div className={styles.aboutFeature}>
          <span className={styles.featureIcon}>⚡</span>
          <h3 className={styles.featureTitle}>Quick Export</h3>
          <p className={styles.featureDescription}>
            Export your flyers in multiple formats including JPG, PDF, and HTML for maximum flexibility.
          </p>
        </div>
      </div>
    </div>
  );
} 