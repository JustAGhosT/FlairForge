import { Link, useLocation } from 'react-router-dom';
import cheesyPigLogo from '../../assets/cheesy-pig-logo.svg';
import styles from './Header.module.css';

export default function Header() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.brand}>
          <img src={cheesyPigLogo} alt="Cheesy Pig Logo" className={styles.logo} />
          <h1 className={styles.title}>FlairForge</h1>
        </div>
        
        <nav className={styles.nav}>
          <Link 
            to="/" 
            className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/templates" 
            className={`${styles.navLink} ${isActive('/templates') ? styles.active : ''}`}
          >
            Templates
          </Link>
          <Link 
            to="/about" 
            className={`${styles.navLink} ${isActive('/about') ? styles.active : ''}`}
          >
            About
          </Link>
        </nav>

        <button className={styles.toggle} aria-label="Toggle theme">
          🌙
        </button>
      </div>
    </header>
  );
} 