import { useState, useRef, useEffect } from "react";
import "../styles/Navbar.css";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import Logo from "./Logo";

// Section preview data structure
const sectionPreviews = {
  hero: {
    title: "Home",
    description: "Welcome to my portfolio",
  },
  about: {
    title: "About Me",
    description: "Learn about my background",
  },
  experience: {
    title: "Work Experience",
    description: "View my professional journey",
  },
  skills: {
    title: "Technical Skills",
    description: "Explore my technical expertise",
  },
  projects: {
    title: "My Projects",
    description: "Check out my latest work",
  },
  contact: {
    title: "Get In Touch",
    description: "Let's connect and collaborate",
  },
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredSection, setHoveredSection] = useState(null);
  const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0 });
  const navLinksRef = useRef(null);
  const toggleButtonRef = useRef(null);

  // Check if screen is mobile size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        navLinksRef.current &&
        !navLinksRef.current.contains(event.target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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

  // Track active section using Intersection Observer
  useEffect(() => {
    const sections = [
      "hero",
      "about",
      "experience",
      "skills",
      "projects",
      "contact",
    ];
    const sectionElements = sections
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    // Check if Intersection Observer is supported
    if ("IntersectionObserver" in window) {
      const observerOptions = {
        root: null,
        rootMargin: "-50% 0px -50% 0px", // Trigger when section is in middle of viewport
        threshold: 0,
      };

      const observerCallback = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      };

      const observer = new IntersectionObserver(
        observerCallback,
        observerOptions
      );

      sectionElements.forEach((section) => {
        observer.observe(section);
      });

      return () => {
        sectionElements.forEach((section) => {
          observer.unobserve(section);
        });
      };
    } else {
      // Fallback: Use scroll listener with throttling
      let ticking = false;

      const handleScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const scrollPosition = window.scrollY + window.innerHeight / 2;

            for (let i = sectionElements.length - 1; i >= 0; i--) {
              const section = sectionElements[i];
              if (section.offsetTop <= scrollPosition) {
                setActiveSection(section.id);
                break;
              }
            }

            ticking = false;
          });

          ticking = true;
        }
      };

      window.addEventListener("scroll", handleScroll);
      handleScroll(); // Initial check

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  // Track scroll progress and scrolled state
  useEffect(() => {
    let ticking = false;

    const handleScrollProgress = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;
          const scrollPercent =
            docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

          setScrollProgress(scrollPercent);
          setIsScrolled(scrollTop > 50);

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScrollProgress, { passive: true });
    handleScrollProgress(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScrollProgress);
    };
  }, []);

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

    // Always close mobile menu when link is clicked
    if (isMenuOpen) {
      setIsMenuOpen(false);
      if (toggleButtonRef.current) {
        toggleButtonRef.current.focus();
      }
    }
  };

  const handleLinkMouseEnter = (sectionId, event) => {
    if (isMobile) return;

    setHoveredSection(sectionId);

    const rect = event.currentTarget.getBoundingClientRect();
    const padding = 16;
    const offset = 10;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Calculate and clamp x position
    let x = rect.left + rect.width / 2;
    x = Math.max(padding, Math.min(x, viewportWidth - padding));

    // Calculate and adjust y position if needed
    let y = rect.bottom + offset;
    if (y > viewportHeight - 100) {
      y = rect.top - offset;
    }

    setPreviewPosition({ x, y });
  };

  const handleLinkMouseLeave = () => {
    setHoveredSection(null);
  };

  return (
    <nav
      className={`navbar ${isMobile ? "mobile" : "desktop"} ${
        isScrolled ? "scrolled" : ""
      }`}
    >
      <div
        className="scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      ></div>

      <a href="/" className="navbar-logo">
        <Logo
          size="md"
          type={isMobile ? "icon" : "full"}
          className="navbar-logo-component"
        />
      </a>

      <button
        ref={toggleButtonRef}
        className={`navbar-toggle ${isMenuOpen ? "active" : ""}`}
        aria-controls="navbar-links"
        aria-expanded={isMenuOpen}
        aria-label={
          isMenuOpen ? "Close navigation menu" : "Open navigation menu"
        }
        onClick={handleToggleMenu}
      >
        <span className="hamburger-bar"></span>
        <span className="hamburger-bar"></span>
        <span className="hamburger-bar"></span>
      </button>

      <div
        className={`mobile-menu-backdrop ${isMenuOpen ? "active" : ""}`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      ></div>

      <ul
        id="navbar-links"
        ref={navLinksRef}
        className={`navbar-links ${isMenuOpen ? "active" : ""} ${
          isMobile ? "mobile" : "desktop"
        }`}
        role={isMobile ? "menu" : undefined}
        aria-hidden={isMobile ? !isMenuOpen : false}
      >
        <li role="none">
          <a
            role={isMobile ? "menuitem" : undefined}
            href="#hero"
            onClick={handleLinkClick}
            onMouseEnter={(e) => handleLinkMouseEnter("hero", e)}
            onMouseLeave={handleLinkMouseLeave}
            className={activeSection === "hero" ? "active" : ""}
            aria-current={activeSection === "hero" ? "page" : undefined}
          >
            Home
          </a>
        </li>
        <li role="none">
          <a
            role={isMobile ? "menuitem" : undefined}
            href="#about"
            onClick={handleLinkClick}
            onMouseEnter={(e) => handleLinkMouseEnter("about", e)}
            onMouseLeave={handleLinkMouseLeave}
            className={activeSection === "about" ? "active" : ""}
            aria-current={activeSection === "about" ? "page" : undefined}
          >
            About
          </a>
        </li>
        <li role="none">
          <a
            role={isMobile ? "menuitem" : undefined}
            href="#experience"
            onClick={handleLinkClick}
            onMouseEnter={(e) => handleLinkMouseEnter("experience", e)}
            onMouseLeave={handleLinkMouseLeave}
            className={activeSection === "experience" ? "active" : ""}
            aria-current={activeSection === "experience" ? "page" : undefined}
          >
            Experience
          </a>
        </li>
        <li role="none">
          <a
            role={isMobile ? "menuitem" : undefined}
            href="#skills"
            onClick={handleLinkClick}
            onMouseEnter={(e) => handleLinkMouseEnter("skills", e)}
            onMouseLeave={handleLinkMouseLeave}
            className={activeSection === "skills" ? "active" : ""}
            aria-current={activeSection === "skills" ? "page" : undefined}
          >
            Skills
          </a>
        </li>
        <li role="none">
          <a
            role={isMobile ? "menuitem" : undefined}
            href="#projects"
            onClick={handleLinkClick}
            onMouseEnter={(e) => handleLinkMouseEnter("projects", e)}
            onMouseLeave={handleLinkMouseLeave}
            className={activeSection === "projects" ? "active" : ""}
            aria-current={activeSection === "projects" ? "page" : undefined}
          >
            Projects
          </a>
        </li>
        <li role="none">
          <a
            role={isMobile ? "menuitem" : undefined}
            href="#contact"
            onClick={handleLinkClick}
            onMouseEnter={(e) => handleLinkMouseEnter("contact", e)}
            onMouseLeave={handleLinkMouseLeave}
            className={activeSection === "contact" ? "active" : ""}
            aria-current={activeSection === "contact" ? "page" : undefined}
          >
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

      {hoveredSection && !isMobile && (
        <div
          className="section-preview-tooltip"
          style={{
            left: `${previewPosition.x}px`,
            top: `${previewPosition.y}px`,
          }}
          role="tooltip"
        >
          <div className="preview-title">
            {sectionPreviews[hoveredSection].title}
          </div>
          <div className="preview-description">
            {sectionPreviews[hoveredSection].description}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
