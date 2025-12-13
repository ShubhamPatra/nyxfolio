import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// 🔹 Wake up backends as soon as possible (non-blocking)
(async () => {
  try {
    // Ping chatbot backend
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/ping`);
//    console.log("Chatbot backend pinged 🚀");
  } catch (err) {
//    console.error("Chatbot backend ping failed:", err);
  }
  
  try {
    // Ping contact backend
    const contactBackendUrl = process.env.REACT_APP_CONTACT_BACKEND_URL || 'http://localhost:3001';
    await fetch(`${contactBackendUrl}/health`);
//    console.log("Contact backend pinged 📧");
  } catch (err) {
//    console.error("Contact backend ping failed:", err);
  }
})();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register service worker for PWA offline support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('✅ Service Worker registered:', registration.scope);
      })
      .catch((error) => {
        console.error('❌ Service Worker registration failed:', error);
      });
  });
}
