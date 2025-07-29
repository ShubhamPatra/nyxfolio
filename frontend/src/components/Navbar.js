import React, { useState, useRef, useEffect } from "react";
import "../styles/Navbar.css";
import { FaGithub, FaLinkedin, FaEnvelope, FaBars, FaTimes } from "react-icons/fa";
import Logo from "./Logo";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinksRef = useRef(null);
  const toggleButtonRef = useRef(null);

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

  // When menu opens, focus first link
  useEffect(() => {
    if (isMenuOpen && navLinksRef.current) {
      const firstLink = navLinksRef.current.querySelector("a");
      firstLink && firstLink.focus();
    }
  }, [isMenuOpen]);

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
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
    if (isMenuOpen) {
      setIsMenuOpen(false);
      if (toggleButtonRef.current) {
        toggleButtonRef.current.focus();
      }
    }
  };

  return (
    <nav className="navbar">
      <a href="/" className="navbar-logo">
        <Logo size="md" type="full" className="navbar-logo-component" />
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
        className={`navbar-links ${isMenuOpen ? "active" : ""}`}
        role="menu"
        aria-hidden={!isMenuOpen}
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