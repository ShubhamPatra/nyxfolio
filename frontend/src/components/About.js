import "../styles/About.css";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { FaArrowRight } from "react-icons/fa";

function About() {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section
      id="about"
      ref={ref}
      className={`about fade-in ${isVisible ? "visible" : ""}`}
      aria-labelledby="about-heading"
    >
      <header className="about-header">
        <h2 id="about-heading">About Me</h2>
      </header>
      <div className="about-container">
        <div className="about-content">
          <p>
            I'm <strong>Shubham Patra</strong>, a final-year B.Tech student at
            ITER, SOA University, specializing in Computer Science & Information
            Technology. I focus on full-stack web development and love solving
            real-world problems through clean, efficient, and scalable code.
          </p>
          <p>
            From building a real-time collaborative code editor to creating AI
            assistants like Nyx, I enjoy working on projects that are practical,
            creative, and impactful. I value logic over layout and simplicity
            over overengineering.
          </p>
          <p>
            Currently, I'm working as a{" "}
            <strong>Full Stack Developer Intern</strong> at Kurators,
            collaborating on live production features and following Agile
            workflows. It's been a great opportunity to build scalable web apps
            and gain industry-level experience.
          </p>
          <p>
            I thrive in late-night coding sessions, powered by coffee. I'm
            constantly learning, building, and exploring new ideas — preferably
            in dark mode.
          </p>
          <p>
            I believe in shipping fast, learning by doing, and writing code
            that's not just functional but also readable and maintainable. Clean
            architecture, meaningful variable names, and thoughtful
            problem-solving are core principles I follow.
          </p>
        </div>

        {/* CTA Section */}
        <div className="about-cta">
          <h3>Let's Build Something Great</h3>
          <p>
            I'm currently open to full-time software development opportunities
            where I can contribute to impactful products, grow as a developer,
            and be part of a team that values both creativity and code quality.
          </p>
          <a href="#contact" className="cta-button">
            Get In Touch
            <FaArrowRight className="cta-icon" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default About;
