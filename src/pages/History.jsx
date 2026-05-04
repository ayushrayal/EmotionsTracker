import { useEffect, useState } from 'react';
import { getEmotions } from '../api';
import styles from './History.module.css';

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getEmotions();
        setHistory(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) return <div className={styles.loading}>Loading history...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Emotion History</h2>
        <p className={styles.subtitle}>Your securely saved emotional records</p>
      </div>
      {history.length === 0 ? (
        <div className={styles.empty}>
          <p>No emotion data saved yet. Head to the dashboard to start tracking!</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {history.map((item) => (
            <div key={item._id} className={styles.card}>
              <div className={styles.emotionIcon}>
                {item.emotion === 'happy' ? '😊' : 
                 item.emotion === 'sad' ? '😢' : 
                 item.emotion === 'angry' ? '😠' : 
                 item.emotion === 'fearful' ? '😨' : 
                 item.emotion === 'surprised' ? '😲' : 
                 item.emotion === 'disgusted' ? '🤢' : '😐'}
              </div>
              <div className={styles.details}>
                <h3 className={styles.emotionName}>{item.emotion}</h3>
                <div className={styles.confidenceContainer}>
                  <p className={styles.confidenceText}>
                    <span>Confidence</span>
                    <span>{(item.confidence * 100).toFixed(1)}%</span>
                  </p>
                  <div className={styles.confidenceBar}>
                    <div 
                      className={styles.confidenceFill} 
                      style={{ width: `${item.confidence * 100}%` }}
                    />
                  </div>
                </div>
                <p className={styles.time}>
                  {new Date(item.timestamp).toLocaleDateString()} at {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
