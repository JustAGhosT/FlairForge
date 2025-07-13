import '../global.css';
import styles from './Home.module.css';

export default function Home() {
  return (
    <div className={`container ${styles.homeContainer}`}>
      <div className={styles.homeTitle}>Welcome to FlairForge!</div>
      <div className={styles.homeSubtitle}>
        AI-powered flyer generator for The Cheesy Pig
      </div>
      <div className={styles.homeContent}>
        <p>
          Create stunning, professional flyers in minutes with our intelligent design system. 
          Whether you need promotional materials, event announcements, or product showcases, 
          FlairForge makes it easy to bring your ideas to life.
        </p>
        <p>
          Start by choosing a template, add your content, enhance it with AI, and export your 
          masterpiece in multiple formats. Perfect for businesses, events, and marketing campaigns.
        </p>
      </div>
    </div>
  );
} 