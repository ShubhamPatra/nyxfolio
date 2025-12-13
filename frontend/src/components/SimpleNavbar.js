import React, { useState } from 'react';

const SimpleNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
//    console.log('Menu toggled:', !isMenuOpen);
  };

  return (
    <nav style={{
      background: '#1a1d29',
      color: 'white',
      padding: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000
    }}>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
        Nyxfolio
      </div>

      <button
        onClick={toggleMenu}
        style={{
          background: 'none',
          border: '1px solid #2a2d2d',
          color: 'white',
          padding: '8px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '1.2rem',
          display: window.innerWidth <= 768 ? 'block' : 'none'
        }}
      >
        {isMenuOpen ? '✕' : '☰'}
      </button>

      <ul style={{
        display: window.innerWidth <= 768 
          ? (isMenuOpen ? 'flex' : 'none')
          : 'flex',
        flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
        listStyle: 'none',
        gap: window.innerWidth <= 768 ? '0' : '2rem',
        margin: 0,
        padding: 0,
        position: window.innerWidth <= 768 ? 'absolute' : 'static',
        top: window.innerWidth <= 768 ? '100%' : 'auto',
        left: window.innerWidth <= 768 ? '0' : 'auto',
        right: window.innerWidth <= 768 ? '0' : 'auto',
        background: window.innerWidth <= 768 ? '#1a1d29' : 'transparent',
        border: window.innerWidth <= 768 ? '1px solid #2a2d2d' : 'none',
        borderTop: 'none'
      }}>
        <li style={{ margin: 0, padding: 0, borderBottom: window.innerWidth <= 768 ? '1px solid #2a2d2d' : 'none' }}>
          <a href="#home" style={{ 
            color: 'white', 
            textDecoration: 'none', 
            padding: window.innerWidth <= 768 ? '1rem 1.5rem' : '0.5rem 1rem',
            display: 'block',
            width: '100%'
          }}>
            Home
          </a>
        </li>
        <li style={{ margin: 0, padding: 0, borderBottom: window.innerWidth <= 768 ? '1px solid #2a2d2d' : 'none' }}>
          <a href="#about" style={{ 
            color: 'white', 
            textDecoration: 'none', 
            padding: window.innerWidth <= 768 ? '1rem 1.5rem' : '0.5rem 1rem',
            display: 'block',
            width: '100%'
          }}>
            About
          </a>
        </li>
        <li style={{ margin: 0, padding: 0, borderBottom: window.innerWidth <= 768 ? '1px solid #2a2d2d' : 'none' }}>
          <a href="#experience" style={{ 
            color: 'white', 
            textDecoration: 'none', 
            padding: window.innerWidth <= 768 ? '1rem 1.5rem' : '0.5rem 1rem',
            display: 'block',
            width: '100%'
          }}>
            Experience
          </a>
        </li>
        <li style={{ margin: 0, padding: 0, borderBottom: window.innerWidth <= 768 ? '1px solid #2a2d2d' : 'none' }}>
          <a href="#skills" style={{ 
            color: 'white', 
            textDecoration: 'none', 
            padding: window.innerWidth <= 768 ? '1rem 1.5rem' : '0.5rem 1rem',
            display: 'block',
            width: '100%'
          }}>
            Skills
          </a>
        </li>
        <li style={{ margin: 0, padding: 0, borderBottom: window.innerWidth <= 768 ? '1px solid #2a2d2d' : 'none' }}>
          <a href="#projects" style={{ 
            color: 'white', 
            textDecoration: 'none', 
            padding: window.innerWidth <= 768 ? '1rem 1.5rem' : '0.5rem 1rem',
            display: 'block',
            width: '100%'
          }}>
            Projects
          </a>
        </li>
        <li style={{ margin: 0, padding: 0 }}>
          <a href="#contact" style={{ 
            color: 'white', 
            textDecoration: 'none', 
            padding: window.innerWidth <= 768 ? '1rem 1.5rem' : '0.5rem 1rem',
            display: 'block',
            width: '100%'
          }}>
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default SimpleNavbar;
