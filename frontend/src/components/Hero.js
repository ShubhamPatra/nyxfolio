import React from "react";
import "../styles/Hero.css";

function Hero() {
  const handleScroll = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
      // Move focus to the contact section for accessibility
      contactSection.setAttribute("tabindex", "-1");
      contactSection.focus();
    }
  };


  return (
    <section className="section">
      <section
        className="hero"
        id="hero"
        aria-labelledby="hero-heading"
      >
        <div className="hero-text">
          <h1 id="hero-heading">Hello, I'm Shubham Patra</h1>
          <p>
            I'm a full-stack developer who prefers logic over centering divs.
          </p>
          <a
            href="#contact"
            className="hero-button"
            onClick={handleScroll}
            aria-label="Scroll to contact section"
          >
            Let’s Talk
          </a>
        </div>

        
      </section>
    </section>
  );
}

export default Hero;