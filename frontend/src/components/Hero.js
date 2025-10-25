import { useRef, useEffect } from "react";
import "../styles/Hero.css";
import ParticleBackground from "./ParticleBackground";

function Hero() {
  const heroButtonRef = useRef(null);

  useEffect(() => {
    // Skip magnetic effect on touch devices
    if ('ontouchstart' in window) return;

    const button = heroButtonRef.current;
    if (!button) return;

    const magneticDistance = 10;

    const handleMouseMove = (e) => {
      const rect = button.getBoundingClientRect();
      const buttonCenterX = rect.left + rect.width / 2;
      const buttonCenterY = rect.top + rect.height / 2;
      
      const offsetX = (e.clientX - buttonCenterX) / rect.width * magneticDistance;
      const offsetY = (e.clientY - buttonCenterY) / rect.height * magneticDistance;
      
      requestAnimationFrame(() => {
        button.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      });
    };

    const handleMouseLeave = () => {
      requestAnimationFrame(() => {
        button.style.transform = 'translate(0, 0)';
      });
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

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
    <section
      className="hero"
      id="hero"
      aria-labelledby="hero-heading"
    >
      <ParticleBackground />
      <div className="hero-text">
        <h1 id="hero-heading">Hello,&nbsp;I'm Shubham&nbsp;Patra</h1>
        <p>
          A&nbsp;full-stack developer focused on&nbsp;building efficient and&nbsp;scalable web&nbsp;applications.
        </p>
        <a
          ref={heroButtonRef}
          href="#contact"
          className="hero-button"
          onClick={handleScroll}
          aria-label="Scroll to contact section"
        >
          Let's Talk
        </a>
      </div>
    </section>
  );
}

export default Hero;
