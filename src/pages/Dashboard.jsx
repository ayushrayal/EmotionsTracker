import { useRef, useState } from 'react';
import VideoFeed from '../components/VideoFeed.jsx';
import EmotionDisplay from '../components/EmotionDisplay.jsx';
import useFaceDetection from '../hooks/useFaceDetection.js';
import { saveEmotion as saveEmotionAPI } from '../api.js';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const videoRef = useRef(null);
  const [mode, setMode] = useState('fast');
  const [saveStatus, setSaveStatus] = useState('');
  const { emotion, confidence, status, modelsLoaded, error, isLowLight } = useFaceDetection(videoRef, mode);

  const handleSave = async () => {
    if (!emotion || confidence === 0) return;
    try {
      setSaveStatus('Saving...');
      await saveEmotionAPI(emotion, confidence);
      setSaveStatus('Saved!');
      setTimeout(() => setSaveStatus(''), 2000);
    } catch (err) {
      setSaveStatus('Error saving');
      setTimeout(() => setSaveStatus(''), 2000);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.badge}>Live Detection</div>
        <h1 className={styles.title}>Emotion Detector</h1>
        <p className={styles.subtitle}>
          Real-time facial emotion recognition powered by AI
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
            <div className={`glass-card ${styles.videoSection}`}>
              <VideoFeed videoRef={videoRef} modelsLoaded={modelsLoaded} isLowLight={isLowLight} />
            </div>
            
            <div className={`glass-card ${styles.emotionSection}`} style={{ padding: '2rem' }}>
              <EmotionDisplay 
                emotion={emotion} 
                confidence={confidence}
                status={status}
                modelsLoaded={modelsLoaded} 
              />
              {emotion && modelsLoaded && (
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                  <button 
                    onClick={handleSave} 
                    disabled={saveStatus === 'Saving...'}
                    className="btn-primary"
                    style={{ minWidth: '180px', background: saveStatus === 'Saved!' ? '#10b981' : undefined }}
                  >
                    {saveStatus || 'Save Emotion'}
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </main>

      <footer className={styles.footer}>
        <p>Detects: happy · sad · angry · fearful · surprised · disgusted · neutral</p>
      </footer>
    </div>
  );
}
