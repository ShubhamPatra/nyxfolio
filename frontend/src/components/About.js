import React from "react";
import "../styles/About.css";

function About() {
  return (
    <section className="section" aria-labelledby="about-heading">
      <section
        id="about"
        className="about"
        aria-labelledby="about-heading"
      >
        <header className="about-header">
          <h2 id="about-heading">👋 About Me</h2>
        </header>
        <div className="about-content">
          <p>
            I’m <strong>Shubham Patra</strong>, a final-year B.Tech student at ITER,
            SOA University, specializing in <strong>Computer Science & Information Technology</strong>.
            I focus on <strong>full-stack web development</strong> and love solving real-world problems
            through clean, efficient, and scalable code.
          </p>
          <p>
            From building a <strong>real-time collaborative code editor</strong> to creating AI
            assistants like <strong>Nyx</strong>, I enjoy working on projects that
            are practical, creative, and impactful. I value logic over layout
            and simplicity over overengineering.
          </p>
          <p>
            I’m proficient in <strong>Java, JavaScript, C++, PHP</strong>, and comfortable across
            both frontend and backend stacks — particularly <strong>React, Node.js,
            Express, MongoDB, and MySQL</strong>.
          </p>
          <p>
            Currently, I’m working as a <strong>Full Stack Developer Intern</strong> at{" "}
            <strong>Kurators</strong>, collaborating on live production features,
            following <strong>Agile workflows</strong>, and contributing to a dynamic startup
            environment. It’s been a great opportunity to build scalable web apps
            and gain industry-level experience.
          </p>
          <p>
            I thrive in late-night coding sessions, powered by coffee. I’m constantly
            learning, building, and exploring new ideas — preferably in dark mode.
          </p>
          <p>
            I believe in <strong>shipping fast</strong>, learning by doing, and writing code
            that’s not just functional but also readable and maintainable. Clean
            architecture, meaningful variable names, and thoughtful problem-solving
            are core principles I follow.
          </p>
          <p>
            I’m currently open to <strong>full-time software development opportunities</strong>
            where I can contribute to impactful products, grow as a developer, and be
            part of a team that values both creativity and code quality.
          </p>
        </div>
      </section>
    </section>
  );
}

export default About;
