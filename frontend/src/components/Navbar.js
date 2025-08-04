import React, { useState, useRef, useEffect } from "react";
import "../styles/navbar-final.css";
import { FaGithub, FaLinkedin, FaEnvelope, FaBars, FaTimes } from "react-icons/fa";
import Logo from "./Logo";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navLinksRef = useRef(null);
  const toggleButtonRef = useRef(null);

  // Check if screen is mobile size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && 
          navLinksRef.current && 
          !navLinksRef.current.contains(event.target) &&
          toggleButtonRef.current &&
          !toggleButtonRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Close menu on Escape and return focus to toggle button
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
        if (toggleButtonRef.current) {
          toggleButtonRef.current.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  // Debug effect to log state changes
  useEffect(() => {
    console.log('=== NAVBAR DEBUG ===');
    console.log('isMobile:', isMobile);
    console.log('isMenuOpen:', isMenuOpen);
    console.log('Window width:', window.innerWidth);
    
    const navLinksElement = document.querySelector('.navbar-links');
    if (navLinksElement) {
      console.log('Menu element classes:', navLinksElement.className);
      console.log('Menu element display:', getComputedStyle(navLinksElement).display);
      console.log('Number of menu items found:', navLinksElement.querySelectorAll('li').length);
    }
    console.log('====================');
  }, [isMobile, isMenuOpen]);

  const handleToggleMenu = () => {
    console.log('=== MENU TOGGLE CLICKED ===');
    console.log('Before toggle - isMenuOpen:', isMenuOpen);
    console.log('Before toggle - navbar classes:', document.querySelector('.navbar')?.className);
    console.log('Before toggle - menu classes:', document.querySelector('.navbar-links')?.className);
    
    setIsMenuOpen((prev) => {
      const newState = !prev;
      console.log('Menu state changing from', prev, 'to', newState);
      
      // Force update the DOM immediately for debugging
      setTimeout(() => {
        const menuElement = document.querySelector('.navbar-links');
        if (menuElement) {
          console.log('After state change - menu classes:', menuElement.className);
          console.log('After state change - computed display:', getComputedStyle(menuElement).display);
          console.log('After state change - has active class:', menuElement.classList.contains('active'));
        }
      }, 10);
      
      return newState;
    });
    console.log('==============================');
  };

  const handleLinkClick = (e) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href");
    
    if (href && href.startsWith("#")) {
      const targetId = href.slice(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    }
    
    // Always close mobile menu when link is clicked
    if (isMenuOpen) {
      setIsMenuOpen(false);
      if (toggleButtonRef.current) {
        toggleButtonRef.current.focus();
      }
    }
  };

  return (
    <nav className={`navbar ${isMobile ? 'mobile' : 'desktop'}`}>
      <a href="/" className="navbar-logo">
        <Logo size="md" type={isMobile ? "icon" : "full"} className="navbar-logo-component" />
      </a>

      <button
        ref={toggleButtonRef}
        className="navbar-toggle"
        aria-controls="navbar-links"
        aria-expanded={isMenuOpen}
        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        onClick={handleToggleMenu}
      >
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      <ul
        id="navbar-links"
        ref={navLinksRef}
        className={`navbar-links ${isMenuOpen ? "active" : ""} ${isMobile ? "mobile" : "desktop"}`}
        role={isMobile ? "menu" : ""}
        aria-hidden={isMobile ? !isMenuOpen : false}
      >
        <li role="none">
          <a role="menuitem" href="#hero" onClick={handleLinkClick}>
            Home
          </a>
        </li>
        <li role="none">
          <a role="menuitem" href="#about" onClick={handleLinkClick}>
            About
          </a>
        </li>
        <li role="none">
          <a role="menuitem" href="#experience" onClick={handleLinkClick}>
            Experience
          </a>
        </li>
        <li role="none">
          <a role="menuitem" href="#skills" onClick={handleLinkClick}>
            Skills
          </a>
        </li>
        <li role="none">
          <a role="menuitem" href="#projects" onClick={handleLinkClick}>
            Projects
          </a>
        </li>
        <li role="none">
          <a role="menuitem" href="#contact" onClick={handleLinkClick}>
            Contact
          </a>
        </li>
      </ul>

      <div className="navbar-icons">
        <a
          href="https://github.com/ShubhamPatra"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/patrashubham/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </a>
        <a href="mailto:shubhampatra635@gmail.com" aria-label="Email">
          <FaEnvelope />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;