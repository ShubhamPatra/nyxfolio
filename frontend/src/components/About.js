import React from "react";
import "../styles/About.css";

function About() {
  return (
    <section className="section">
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
            SOA University, specializing in Computer Science & Information Technology.
            I focus on full-stack development and love solving real-world problems
            through clean, efficient code.
          </p>
          <p>
            From building a real-time collaborative code editor to creating AI
            assistants like <strong>Nyx</strong>, I enjoy working on projects that
            are practical, creative, and impactful. I value logic over layout,
            simplicity over overengineering.
          </p>
          <p>
            I'm proficient in Java, JavaScript, C++, PHP, and comfortable across
            both frontend and backend stacks — particularly React, Node.js,
            Express, MongoDB, and MySQL.
          </p>
          <p>
            Currently, I’m working as a <strong>Full Stack Developer Intern</strong> at{" "}
            <strong>Kurators</strong>, where I collaborate on live production
            features, follow agile workflows, and contribute to a dynamic startup
            environment. It’s been a great opportunity to build scalable web apps
            and gain industry-level experience.
          </p>
          <p>
            I thrive in late-night coding sessions, powered by coffee. 
            I’m always learning, building, and exploring new ideas —
            preferably in dark mode.
          </p>
          <p>
            I believe in shipping fast, learning by doing, and writing code that’s
            not just functional but also readable and scalable. Clean architecture,
            meaningful variable names, and thoughtful problem-solving are things I
            care about.
          </p>
          <p>
            I’m currently open to full-time opportunities where I can contribute
            to impactful products, grow as a developer, and be part of a team that
            values both creativity and code quality.
          </p>
        </div>
      </section>
    </section>
  );
}

export default About;