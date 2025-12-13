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
            I'm <strong>Shubham Patra</strong>, a final-year B.Tech student in
            Computer Science & Information Technology at ITER, SOA University,
            with a strong focus on full-stack web development and building
            systems that solve real problems.
          </p>
          <p>
            I enjoy turning ideas into scalable, production-ready
            applications—from real-time collaborative tools to AI-powered
            assistants like Nyx. I care more about logic than layout and prefer
            simplicity over overengineering.
          </p>
          <p>
            Recently, I completed a{" "}
            <strong>Full Stack Developer Internship</strong> at Kurators (Aug–Dec
            2025), where I worked on live production features, collaborated with
            cross-functional teams, and followed Agile development workflows. The
            experience helped me understand how real-world systems are built,
            optimized, and maintained at scale.
          </p>
          <p>
            I believe in shipping fast, learning by doing, and writing code
            that's easy to read and maintain. Clean architecture, meaningful
            variable names, and thoughtful problem-solving guide everything I
            build.
          </p>
          <p>
            I'm constantly exploring new technologies, improving my craft, and
            building things that actually matter.
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
