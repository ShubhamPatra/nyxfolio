import React from "react";
import "../styles/Footer.css";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";


const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <section className="section">
      <footer className="footer" role="contentinfo">
        {/* Social Media Links */}
        <nav className="footer-icons" aria-label="Social Media">
          <a
            href="https://github.com/ShubhamPatra"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub aria-hidden="true" />
          </a>
          <a
            href="https://www.linkedin.com/in/patrashubham/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin aria-hidden="true" />
          </a>
          <a href="mailto:shubhampatra635@gmail.com" aria-label="Email">
            <FaEnvelope aria-hidden="true" />
          </a>
        </nav>

        {/* Footer Navigation Links */}
        
        {/* Copyright and Credits */}
        <div className="footer-copy">
          <p className="footer-text">
            © {currentYear} Shubham.dev. All rights reserved.
          </p>
          <p className="footer-text">
            Built with{" "}
            <span role="img" aria-label="love">
              ❤️
            </span>{" "}
            by Shubham Patra.
          </p>
        </div>
      </footer>
    </section>
  );
};

export default Footer;