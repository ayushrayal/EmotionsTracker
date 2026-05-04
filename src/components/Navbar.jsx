import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className={styles.navbar} style={scrolled ? { background: 'rgba(5, 5, 8, 0.85)', padding: '1rem 2rem' } : {}}>
      <div className={styles.brand}>
        <Link to="/" style={{ color: 'inherit' }}>EmotionAI</Link>
      </div>
      <div className={styles.links}>
        {!isAuthenticated ? (
          <>
            <Link to="/about" className={styles.link}>About Us</Link>
            <Link to="/login" className={styles.link}>Login</Link>
            <Link to="/signup" className={styles.navBtn}>Sign Up</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className={styles.link}>Dashboard</Link>
            <Link to="/history" className={styles.link}>History</Link>
            <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
