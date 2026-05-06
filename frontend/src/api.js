const API_URL = 'http://localhost:5000/api';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const loginUser = async (email, password) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error);
  return data;
};

export const signupUser = async (username, email, password) => {
  console.log('Sending Signup Data:', { username, email, password });
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ username, email, password }),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Signup failed');
  return data;
};

export const saveEmotion = async (emotion, confidence) => {
  const res = await fetch(`${API_URL}/emotions`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ emotion, confidence }),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error);
  return data;
};

export const getEmotions = async () => {
  const res = await fetch(`${API_URL}/emotions`, {
    method: 'GET',
    headers: getHeaders(),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error);
  return data;
};
