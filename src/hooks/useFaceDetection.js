import { useEffect, useRef, useState } from 'react';
import * as faceapi from '@vladmandic/face-api';

const MODELS_PATH = '/models';
const HISTORY_LENGTH = 12;
const MIN_CONFIDENCE_THRESHOLD = 0.6;
const STABLE_FRAME_COUNT = 3;
const MIN_FACE_SIZE = 100;

export default function useFaceDetection(videoRef, mode) {
  const [emotion, setEmotion] = useState(null);
  const [confidence, setConfidence] = useState(0);
  const [status, setStatus] = useState('Initializing...');
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [isLowLight, setIsLowLight] = useState(false);
  
  const animationRef = useRef(null);
  const historyRef = useRef([]);
  const consecutiveRef = useRef({ emotion: null, count: 0 });
  const skipCountRef = useRef(0);
  const frameCountRef = useRef(0);
  const canvasRef = useRef(null);

  // Load models initially based on mode
  useEffect(() => {
    let isMounted = true;
    
    async function loadModels() {
      try {
        setModelsLoaded(false);
        setStatus(`Loading ${mode === 'fast' ? 'Fast' : 'Accurate'} models...`);
        
        const promises = [faceapi.nets.faceExpressionNet.loadFromUri(MODELS_PATH)];
        
        if (mode === 'fast') {
          promises.push(faceapi.nets.tinyFaceDetector.loadFromUri(MODELS_PATH));
        } else {
          promises.push(faceapi.nets.ssdMobilenetv1.loadFromUri(MODELS_PATH));
        }
        
        await Promise.all(promises);
        
        if (isMounted) {
          setModelsLoaded(true);
          setStatus('Detecting');
          historyRef.current = [];
          consecutiveRef.current = { emotion: null, count: 0 };
          setEmotion(null);
          setConfidence(0);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load face detection models. Check /public/models.');
          console.error('Model loading error:', err);
        }
      }
    }

    loadModels();
    return () => { isMounted = false; };
  }, [mode]);

  useEffect(() => {
    if (!modelsLoaded) return;

    const video = videoRef.current;
    if (!video) return;

    let isDetecting = true;
    const detectorOptions = mode === 'fast' 
      ? new faceapi.TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.5 })
      : new faceapi.SsdMobilenetv1Options({ minConfidence: 0.5 });

    const checkLighting = () => {
      if (!canvasRef.current) {
        canvasRef.current = document.createElement('canvas');
        canvasRef.current.width = 64;
        canvasRef.current.height = 48;
      }
      const ctx = canvasRef.current.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(video, 0, 0, 64, 48);
      const imageData = ctx.getImageData(0, 0, 64, 48).data;
      let brightnessSum = 0;
      for (let i = 0; i < imageData.length; i += 4) {
        brightnessSum += (imageData[i] * 0.299 + imageData[i+1] * 0.587 + imageData[i+2] * 0.114);
      }
      const avgBrightness = brightnessSum / (64 * 48);
      setIsLowLight(avgBrightness < 60);
    };

    async function detect() {
      if (!isDetecting) return;
      
      if (!video || video.readyState < 2) {
        animationRef.current = requestAnimationFrame(detect);
        return;
      }

      // Adaptive Frequency: Skip frames if stable to save CPU
      const isStable = consecutiveRef.current.count >= STABLE_FRAME_COUNT;
      const targetSkips = isStable ? 3 : 0;
      if (skipCountRef.current < targetSkips) {
        skipCountRef.current++;
        animationRef.current = requestAnimationFrame(detect);
        return;
      }
      skipCountRef.current = 0;

      // Periodically check lighting (approx every 15 processed frames)
      if (frameCountRef.current % 15 === 0) {
        checkLighting();
      }
      frameCountRef.current++;

      try {
        const results = await faceapi
          .detectAllFaces(video, detectorOptions)
          .withFaceExpressions();

        if (!isDetecting) return;

        if (!results || results.length === 0) {
          handleNoFace();
        } else {
          processFaces(results, video);
        }
      } catch (err) {
        // Silently ignore frame-level detection errors
      }

      if (isDetecting) {
        animationRef.current = requestAnimationFrame(detect);
      }
    }

    const handleNoFace = () => {
      historyRef.current = [];
      setEmotion(null);
      setConfidence(0);
      setStatus('Searching...');
      consecutiveRef.current = { emotion: null, count: 0 };
    };

    const processFaces = (results, videoElement) => {
      const marginX = videoElement.videoWidth * 0.1;
      const marginY = videoElement.videoHeight * 0.1;

      const validFaces = results.filter(res => {
        const { width, height, x, y } = res.detection.box;
        const isBigEnough = width >= MIN_FACE_SIZE && height >= MIN_FACE_SIZE;
        const isWithinBounds = x > marginX && y > marginY && 
                               (x + width) < (videoElement.videoWidth - marginX) && 
                               (y + height) < (videoElement.videoHeight - marginY);
        return isBigEnough && isWithinBounds;
      });

      if (validFaces.length === 0) {
        handleNoFace();
        return;
      }

      const prominentFace = validFaces.reduce((prev, current) => {
        return (prev.detection.box.area > current.detection.box.area) ? prev : current;
      });
      
      updateEmotionState(prominentFace.expressions);
    };

    const updateEmotionState = (expressions) => {
      historyRef.current.push(expressions);
      if (historyRef.current.length > HISTORY_LENGTH) {
        historyRef.current.shift();
      }

      const avgExpressions = {};
      const emotionsList = Object.keys(expressions);
      
      // Weighted average: more recent frames have higher weights
      const weights = Array.from({ length: historyRef.current.length }, (_, i) => i + 1);
      const weightSum = weights.reduce((a, b) => a + b, 0);

      emotionsList.forEach(emo => {
        const sum = historyRef.current.reduce((acc, curr, idx) => acc + curr[emo] * weights[idx], 0);
        avgExpressions[emo] = sum / weightSum;
      });

      if (avgExpressions.neutral !== undefined) {
        const nonNeutralEmotions = emotionsList.filter(e => e !== 'neutral');
        const maxNonNeutralScore = Math.max(...nonNeutralEmotions.map(e => avgExpressions[e]));
        if (avgExpressions.neutral < maxNonNeutralScore + 0.1) {
          avgExpressions.neutral *= 0.5;
        }
      }

      let dominantEmotion = null;
      let maxScore = -1;

      for (const [emo, score] of Object.entries(avgExpressions)) {
        if (score > maxScore) {
          maxScore = score;
          dominantEmotion = emo;
        }
      }

      if (maxScore < MIN_CONFIDENCE_THRESHOLD) {
        setStatus('Uncertain');
        setConfidence(maxScore);
        consecutiveRef.current = { emotion: null, count: 0 };
      } else {
        if (consecutiveRef.current.emotion === dominantEmotion) {
          consecutiveRef.current.count++;
        } else {
          consecutiveRef.current = { emotion: dominantEmotion, count: 1 };
        }

        if (consecutiveRef.current.count >= STABLE_FRAME_COUNT) {
          setEmotion(dominantEmotion);
          setStatus('Stable');
        } else {
          setStatus('Detecting...');
        }
        setConfidence(maxScore);
      }
    };

    animationRef.current = requestAnimationFrame(detect);

    return () => {
      isDetecting = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [modelsLoaded, videoRef, mode]);

  return { emotion, confidence, status, modelsLoaded, error, isLowLight };
}
