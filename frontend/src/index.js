import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// 🔹 Wake up backend as soon as possible (non-blocking)
(async () => {
  try {
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/ping`);
//    console.log("Backend pinged early 🚀");
  } catch (err) {
//    console.error("Backend ping failed:", err);
  }
})();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
