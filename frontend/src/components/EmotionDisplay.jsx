import styles from './EmotionDisplay.module.css';

const EMOTION_CONFIG = {
  happy:     { emoji: '😄', label: 'Happy',     color: 'var(--happy)' },
  sad:       { emoji: '😢', label: 'Sad',       color: 'var(--sad)' },
  angry:     { emoji: '😠', label: 'Angry',     color: 'var(--angry)' },
  fearful:   { emoji: '😨', label: 'Fearful',   color: 'var(--fearful)' },
  surprised: { emoji: '😲', label: 'Surprised', color: 'var(--surprised)' },
  disgusted: { emoji: '🤢', label: 'Disgusted', color: 'var(--disgusted)' },
  neutral:   { emoji: '😐', label: 'Neutral',   color: 'var(--neutral)' },
};

export default function EmotionDisplay({ emotion, confidence, status, modelsLoaded }) {
  if (!modelsLoaded) return null;

  if (!emotion || status === 'Searching...') {
    return (
      <div className={styles.wrapper} id="emotion-display">
        <div className={styles.noFace}>
          <span className={styles.noFaceIcon}>👤</span>
          <div className={styles.info}>
            <p className={styles.noFaceText}>No face detected</p>
            <p className={styles.statusText}>{status}</p>
          </div>
        </div>
      </div>
    );
  }

  const config = EMOTION_CONFIG[emotion] ?? EMOTION_CONFIG.neutral;
  const confidencePercent = (confidence * 100).toFixed(0);

  return (
    <div className={styles.wrapper} id="emotion-display">
      <div
        className={styles.card}
        style={{ '--emotion-color': config.color }}
      >
        <span className={styles.emoji}>{config.emoji}</span>
        <div className={styles.info}>
          <div className={styles.headerRow}>
            <p className={styles.label}>Current Emotion</p>
            <span className={`${styles.statusBadge} ${styles[status.toLowerCase()] || ''}`}>
              {status}
            </span>
          </div>
          <div className={styles.emotionRow}>
            <p className={styles.emotion} style={{ color: config.color }}>
              {config.label}
            </p>
            <p className={styles.confidence}>
              {confidencePercent}%
            </p>
          </div>
        </div>
        <div className={styles.pulse} style={{ background: config.color }} />
      </div>
    </div>
  );
}
