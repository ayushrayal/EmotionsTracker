import { useEffect, useRef } from 'react';
import styles from './VideoFeed.module.css';

export default function VideoFeed({ videoRef, modelsLoaded, isLowLight }) {
  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: 640, height: 480 },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Camera access denied:', err);
      }
    }

    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
      }
    };
  }, [videoRef]);

  return (
    <div className={styles.videoContainer}>
      <div className={styles.videoWrapper}>
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className={styles.video}
          id="webcam-feed"
        />
        {!modelsLoaded && (
          <div className={styles.overlay}>
            <div className={styles.spinner} />
            <p className={styles.loadingText}>Loading AI models…</p>
          </div>
        )}
      </div>
      {isLowLight && (
        <div className={styles.warningText}>
          ⚠️ Low lighting may reduce accuracy
        </div>
      )}
    </div>
  );
}
