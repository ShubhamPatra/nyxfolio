import React, { useState, useEffect } from 'react';
import '../styles/InstallPrompt.css';
import { FaDownload, FaTimes } from 'react-icons/fa';

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed the prompt
    const hasPromptBeenDismissed = localStorage.getItem('pwaPromptDismissed');
    if (hasPromptBeenDismissed) return;

    const handleBeforeInstallPrompt = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      // Show the install prompt after a short delay
      setTimeout(() => {
        setShowPrompt(true);
      }, 3000); // Show after 3 seconds
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowPrompt(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }

    // Clear the deferredPrompt
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Remember that user dismissed the prompt
    localStorage.setItem('pwaPromptDismissed', 'true');
  };

  if (!showPrompt || !deferredPrompt) return null;

  return (
    <div className="install-prompt" role="dialog" aria-labelledby="install-title">
      <div className="install-prompt-content">
        <button
          className="install-prompt-close"
          onClick={handleDismiss}
          aria-label="Close install prompt"
        >
          <FaTimes />
        </button>
        
        <div className="install-prompt-icon">
          <FaDownload />
        </div>
        
        <h3 id="install-title" className="install-prompt-title">
          Install Nyxfolio
        </h3>
        
        <p className="install-prompt-description">
          Install this app on your device for quick and easy access with offline support.
        </p>
        
        <div className="install-prompt-actions">
          <button
            className="install-prompt-button install-button"
            onClick={handleInstallClick}
          >
            Install App
          </button>
          <button
            className="install-prompt-button dismiss-button"
            onClick={handleDismiss}
          >
            Not Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstallPrompt;
