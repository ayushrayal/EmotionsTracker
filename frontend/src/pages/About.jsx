import styles from './About.module.css';

export default function About() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>About EmotionAI</h1>
        <p className={styles.subtitle}>Discover the technology powering our real-time emotion detection system.</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}><span className={styles.icon}>🎯</span> Project Overview</h2>
        <div className="glass-card" style={{ padding: '2rem' }}>
          <p className={styles.content}>
            EmotionAI is a cutting-edge web application designed to analyze and interpret human facial expressions in real time. 
            By leveraging advanced browser-based machine learning, the app provides instantaneous feedback on emotional states 
            without compromising user privacy. It is an educational and analytical tool built for demonstrating the capabilities 
            of modern web AI.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}><span className={styles.icon}>⚙️</span> How It Works</h2>
        <div className="glass-card" style={{ padding: '2.5rem' }}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepContent}>
              <h4>Video Capture</h4>
              <p>The application securely accesses your webcam stream directly within the browser. No video data is ever sent to a server.</p>
            </div>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepContent}>
              <h4>Face Detection & Processing</h4>
              <p>Using <code>face-api.js</code>, the app locates your face in the video feed and maps out key facial landmarks (eyes, mouth, brow).</p>
            </div>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>3</div>
            <div className={styles.stepContent}>
              <h4>AI Prediction</h4>
              <p>A lightweight, pre-trained neural network analyzes the facial landmarks to predict the most likely emotion (Happy, Sad, Angry, etc.) alongside a confidence score.</p>
            </div>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>4</div>
            <div className={styles.stepContent}>
              <h4>Real-time Display</h4>
              <p>The prediction is smoothly rendered on your dashboard, updating rapidly as your expressions change naturally.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}><span className={styles.icon}>💻</span> Technologies Used</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3 style={{ color: 'var(--text-primary)' }}>Frontend</h3>
            <p className={styles.content}>Built for speed and modularity using modern React tools.</p>
            <div className={styles.techTags}>
              <span className={styles.tag}>React</span>
              <span className={styles.tag}>Vite</span>
              <span className={styles.tag}>CSS Modules</span>
            </div>
          </div>
          <div className={styles.card}>
            <h3 style={{ color: 'var(--text-primary)' }}>AI & Machine Learning</h3>
            <p className={styles.content}>Running models entirely client-side for maximum privacy.</p>
            <div className={styles.techTags}>
              <span className={styles.tag}>face-api.js</span>
              <span className={styles.tag}>TensorFlow.js</span>
            </div>
          </div>
          <div className={styles.card}>
            <h3 style={{ color: 'var(--text-primary)' }}>Backend & Database</h3>
            <p className={styles.content}>Secure data storage for user accounts and emotion history.</p>
            <div className={styles.techTags}>
              <span className={styles.tag}>Node.js</span>
              <span className={styles.tag}>Express</span>
              <span className={styles.tag}>MongoDB</span>
              <span className={styles.tag}>JWT Auth</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}><span className={styles.icon}>✨</span> UI/UX Design</h2>
        <div className="glass-card" style={{ padding: '2rem' }}>
          <p className={styles.content}>
            The application is built using modern UI/UX principles, featuring a <strong>Glassmorphism</strong> design system. 
            This approach utilizes frosted glass effects, subtle glowing borders, and a dark theme to create a premium, 
            immersive environment. The layout is fully responsive, ensuring a seamless experience across desktop and mobile devices.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}><span className={styles.icon}>🚀</span> Future Improvements</h2>
        <div className="glass-card" style={{ padding: '2rem' }}>
          <ul style={{ listStylePosition: 'inside', color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8' }}>
            <li>Integration of more robust tracking models for challenging lighting conditions.</li>
            <li>Advanced analytics dashboard to visualize emotional trends over weeks and months.</li>
            <li>Mobile applications for iOS and Android platforms.</li>
            <li>Export functionality for downloading emotional data history.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
