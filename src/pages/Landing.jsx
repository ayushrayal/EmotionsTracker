import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div style={{ padding: '4rem 2rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Emotion Detection App</h1>
      <p style={{ fontSize: '1.2rem', color: '#555', marginBottom: '2rem' }}>
        Analyze your facial expressions in real-time and securely track your emotional history.
      </p>
      
      <div style={{ margin: '2rem 0', padding: '2rem', background: '#f8f9fa', borderRadius: '8px' }}>
        <h3>About the Project</h3>
        <p style={{ marginTop: '1rem' }}>
          This project uses advanced machine learning models running entirely in your browser 
          to protect your privacy while providing accurate emotion detection.
        </p>
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <Link 
          to="/signup" 
          style={{ padding: '12px 24px', background: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}
        >
          Sign Up
        </Link>
        <Link 
          to="/login" 
          style={{ padding: '12px 24px', background: '#6c757d', color: 'white', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
