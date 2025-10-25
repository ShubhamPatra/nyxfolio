import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon, FaAdjust } from 'react-icons/fa';
import '../styles/ThemeToggle.css';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('auto');
  const [effectiveTheme, setEffectiveTheme] = useState('dark');

  useEffect(() => {
    // Get initial theme from the global API
    if (window.themeAPI) {
      setTheme(window.themeAPI.get());
      setEffectiveTheme(window.themeAPI.getEffective());
    }

    // Listen for theme changes
    const handleThemeChange = (event) => {
      setTheme(event.detail.preference);
      setEffectiveTheme(event.detail.theme);
    };

    window.addEventListener('themechange', handleThemeChange);

    return () => {
      window.removeEventListener('themechange', handleThemeChange);
    };
  }, []);

  const handleToggle = () => {
    if (window.themeAPI) {
      window.themeAPI.toggle();
    }
  };

  const getIcon = () => {
    if (theme === 'auto') {
      return <FaAdjust />;
    } else if (theme === 'light') {
      return <FaSun />;
    } else {
      return <FaMoon />;
    }
  };

  const getLabel = () => {
    if (theme === 'auto') {
      return `Auto (${effectiveTheme === 'dark' ? 'Dark' : 'Light'})`;
    } else if (theme === 'light') {
      return 'Light';
    } else {
      return 'Dark';
    }
  };

  return (
    <button
      className="theme-toggle"
      onClick={handleToggle}
      aria-label={`Current theme: ${getLabel()}. Click to toggle.`}
      title={`Theme: ${getLabel()}`}
    >
      {getIcon()}
    </button>
  );
};

export default ThemeToggle;
