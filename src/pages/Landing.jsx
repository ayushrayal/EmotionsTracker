import { Link } from 'react-router-dom';
import styles from './Landing.module.css';

export default function Landing() {
  return (
    <div style={{ overflowX: 'hidden' }}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Emotion Detection AI</h1>
          <p className={styles.subtitle}>
            Analyze facial expressions in real-time. Secure, private, and powered by advanced browser-based machine learning.
          </p>
          <div className={styles.ctaGroup}>
            <Link to="/signup" className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
              Get Started Free
            </Link>
            <Link to="/login" className="btn-secondary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
              Sign In
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>Why Choose EmotionAI?</h2>
        <div className={styles.grid}>
          <div className={`glass-card ${styles.card}`}>
            <div className={styles.icon}>⚡</div>
            <h3 className={styles.cardTitle}>Real-time Detection</h3>
            <p className={styles.cardText}>
              Experience instantaneous emotion recognition running directly in your browser with virtually zero latency.
            </p>
          </div>
          <div className={`glass-card ${styles.card}`}>
            <div className={styles.icon}>🎯</div>
            <h3 className={styles.cardTitle}>High Accuracy</h3>
            <p className={styles.cardText}>
              Powered by advanced neural networks capable of detecting subtle micro-expressions with remarkable precision.
            </p>
          </div>
          <div className={`glass-card ${styles.card}`}>
            <div className={styles.icon}>🔒</div>
            <h3 className={styles.cardTitle}>Absolute Privacy</h3>
            <p className={styles.cardText}>
              Your video stream never leaves your device. All processing happens locally ensuring your data remains completely private.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
