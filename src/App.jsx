import { useRef, useState } from 'react';
import VideoFeed from './components/VideoFeed.jsx';
import EmotionDisplay from './components/EmotionDisplay.jsx';
import useFaceDetection from './hooks/useFaceDetection.js';
import styles from './App.module.css';

export default function App() {
  const videoRef = useRef(null);
  const [mode, setMode] = useState('fast');
  const { emotion, confidence, status, modelsLoaded, error, isLowLight } = useFaceDetection(videoRef, mode);

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.badge}>Live Detection</div>
        <h1 className={styles.title}>Emotion Detector</h1>
        <p className={styles.subtitle}>
          Real-time facial emotion recognition powered by face-api.js
        </p>
        
        <div className={styles.modeToggle}>
          <button 
            className={`${styles.modeBtn} ${mode === 'fast' ? styles.active : ''}`}
            onClick={() => setMode('fast')}
          >
            Fast Mode
          </button>
          <button 
            className={`${styles.modeBtn} ${mode === 'accurate' ? styles.active : ''}`}
            onClick={() => setMode('accurate')}
          >
            Accurate Mode
          </button>
        </div>
      </header>

      <main className={styles.main}>
        {error ? (
          <div className={styles.error}>{error}</div>
        ) : (
          <>
            <VideoFeed videoRef={videoRef} modelsLoaded={modelsLoaded} isLowLight={isLowLight} />
            <EmotionDisplay 
              emotion={emotion} 
              confidence={confidence}
              status={status}
              modelsLoaded={modelsLoaded} 
            />
          </>
        )}
      </main>

      <footer className={styles.footer}>
        <p>Detects: happy · sad · angry · fearful · surprised · disgusted · neutral</p>
      </footer>
    </div>
  );
}
