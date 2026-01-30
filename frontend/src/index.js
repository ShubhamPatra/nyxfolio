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

          // Check for updates manually
          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (installingWorker == null) {
              return;
            }
            installingWorker.onstatechange = () => {
              if (installingWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  // New content available; please refresh.
                  console.log('🔄 New content is available and will be used when all tabs for this page are closed.');

                  // Optional: Force update toast here if desired
                  // alert('New version available! Refreshing...');
                  // window.location.reload(); 
                } else {
                  // Content is cached for offline use.
                  console.log('⚡ Content is cached for offline use.');
                }
              }
            };
          };
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
