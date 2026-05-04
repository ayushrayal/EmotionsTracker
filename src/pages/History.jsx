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
      <h2 className={styles.title}>Emotion History</h2>
      {history.length === 0 ? (
        <p className={styles.empty}>No emotion data saved yet.</p>
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
                <p className={styles.confidence}>Confidence: {(item.confidence * 100).toFixed(1)}%</p>
                <p className={styles.time}>{new Date(item.timestamp).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
