(function() {
  'use strict';
  
  /**
   * Favicon Manager
   * Sets the favicon to dark mode version (theme toggle removed)
   */
  
  // Get or create the favicon link element
  function getFaviconElement() {
    let favicon = document.querySelector('link[rel="icon"][type="image/svg+xml"]');
    
    if (!favicon) {
      // Create favicon link if it doesn't exist
      favicon = document.createElement('link');
      favicon.rel = 'icon';
      favicon.type = 'image/svg+xml';
      document.head.appendChild(favicon);
    }
    
    return favicon;
  }
  
  /**
   * Set favicon to dark mode
   */
  function init() {
    const favicon = getFaviconElement();
    
    // Always use dark theme
    favicon.href = '/favicon-dark.svg';
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // DOM is already ready
    init();
  }
})();
