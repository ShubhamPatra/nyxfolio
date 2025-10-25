import React from "react";
import "../styles/Footer.css";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaArrowUp,
  FaHeart,
  FaCode,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-container">
        {/* Quick Links */}
        <div className="footer-column">
          <h3 className="footer-heading">Quick Links</h3>
          <nav className="footer-nav" aria-label="Footer navigation">
            <button
              onClick={() => scrollToSection("about")}
              className="footer-nav-link"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="footer-nav-link"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className="footer-nav-link"
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection("experience")}
              className="footer-nav-link"
            >
              Experience
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="footer-nav-link"
            >
              Contact
            </button>
          </nav>
        </div>

        {/* Connect */}
        <div className="footer-column">
          <h3 className="footer-heading">Connect</h3>
          <nav className="footer-social" aria-label="Social Media">
            <a
              href="https://github.com/ShubhamPatra"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="footer-social-link"
            >
              <FaGithub aria-hidden="true" />
              <span className="footer-social-text">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/patrashubham/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="footer-social-link"
            >
              <FaLinkedin aria-hidden="true" />
              <span className="footer-social-text">LinkedIn</span>
            </a>
            <a
              href="mailto:shubhampatra635@gmail.com"
              aria-label="Email"
              className="footer-social-link"
            >
              <FaEnvelope aria-hidden="true" />
              <span className="footer-social-text">Email</span>
            </a>
          </nav>
        </div>

        {/* About */}
        <div className="footer-column">
          <h3 className="footer-heading">About This Site</h3>
          <p className="footer-description">
            A modern portfolio showcasing my work as a full-stack developer.
            Built with React and passion for clean code.
          </p>
          <div className="footer-tech-stack">
            <span className="footer-tech-badge">
              <FaCode aria-hidden="true" /> React
            </span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="footer-divider"></div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-copy">
          <p className="footer-text">
            © {currentYear} Shubham Patra. All rights reserved.
          </p>
          <p className="footer-text footer-tagline">
            Crafted with <FaHeart className="footer-heart" aria-label="love" />{" "}
            and lots of coffee ☕
          </p>
        </div>

        <button
          onClick={scrollToTop}
          className="footer-scroll-top"
          aria-label="Scroll to top"
        >
          <FaArrowUp aria-hidden="true" />
          <span>Back to Top</span>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
