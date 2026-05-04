import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>EmotionApp</div>
      <div className={styles.links}>
        {!isAuthenticated ? (
          <>
            <Link to="/" className={styles.link}>Home</Link>
            <Link to="/about" className={styles.link}>About Us</Link>
            <Link to="/login" className={styles.link}>Login</Link>
            <Link to="/signup" className={styles.link}>Sign Up</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className={styles.link}>Dashboard</Link>
            <Link to="/history" className={styles.link}>History</Link>
            <Link to="/about" className={styles.link}>About Us</Link>
            <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
