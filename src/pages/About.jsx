export default function About() {
  return (
    <div style={{ padding: '3rem 2rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#333' }}>About Us</h2>
      <div style={{ background: '#f8f9fa', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <p style={{ marginBottom: '1rem' }}>
          The Emotion Detection Web App uses advanced machine learning models (like face-api.js) to
          analyze facial expressions in real time, directly from your browser.
        </p>
        <p style={{ marginBottom: '1rem' }}>
          Our goal is to provide a seamless, performant, and secure experience for tracking emotional states over time.
          All processing is done locally on your device, ensuring maximum privacy. 
          Your emotional history is securely stored only when you explicitly choose to save it.
        </p>
        <p>
          Built with React, Vite, and Node.js for a fast and modern web experience.
        </p>
      </div>
    </div>
  );
}
