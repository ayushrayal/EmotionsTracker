import { useRef, useState } from 'react';
import VideoFeed from '../components/VideoFeed.jsx';
import EmotionDisplay from '../components/EmotionDisplay.jsx';
import useFaceDetection from '../hooks/useFaceDetection.js';
import { saveEmotion as saveEmotionAPI } from '../api.js';
import styles from '../App.module.css';

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
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.badge}>Live Detection</div>
        <h1 className={styles.title}>Emotion Detector</h1>
        <p className={styles.subtitle}>
          Real-time facial emotion recognition
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
            {emotion && modelsLoaded && (
              <div className={styles.saveContainer} style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                <button 
                  onClick={handleSave} 
                  disabled={saveStatus === 'Saving...'}
                  style={{
                    padding: '0.75rem 2rem',
                    fontSize: '1.1rem',
                    backgroundColor: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    transition: 'background 0.2s',
                    minWidth: '150px'
                  }}
                >
                  {saveStatus || 'Save Emotion'}
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <footer className={styles.footer}>
        <p>Detects: happy · sad · angry · fearful · surprised · disgusted · neutral</p>
      </footer>
    </div>
  );
}
