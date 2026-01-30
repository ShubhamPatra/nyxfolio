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
// Only register on v1.shubhampatra.dev or localhost to prevent interference with other subdomains
if ('serviceWorker' in navigator) {
  const hostname = window.location.hostname;
  const isAllowedDomain =
    hostname === 'v1.shubhampatra.dev' ||
    hostname === 'localhost' ||
    hostname === '127.0.0.1';

  if (isAllowedDomain) {
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
  } else {
    // Unregister any existing service workers on other domains
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => {
        registration.unregister();
        console.log('🔄 Unregistered service worker from different subdomain');
      });
    });
  }
}
