import React from "react";
import "../styles/Experience.css";

const experiences = [
  {
    id: 1,
    role: "Full Stack Developer Intern",
    company: "Kurators",
    location: "Remote",
    startDate: "July 2025",
    endDate: "Present",
    responsibilities: [
      "Developing real-world web applications in a fast-paced startup environment.",
      "Collaborating in Agile sprints, writing scalable code, and managing production-level features.",
      "Gaining hands-on experience with React, Node.js, MongoDB, and modern web development workflows."
    ]
  }
];

const Experience = () => {
  return (
    <section className="section" aria-labelledby="experience-heading">
      <section className="experience" id="experience">
        <h2 id="experience-heading">💼 Professional Experience</h2>
        {experiences.map((exp) => (
          <article key={exp.id} className="experience-item">
            <header>
              <h3>{exp.role} – {exp.company}</h3>
              <p className="location">
                <time dateTime={exp.startDate}>{exp.startDate}</time> – <time dateTime={exp.endDate}>{exp.endDate}</time> | {exp.location}
              </p>
            </header>
            <ul aria-label={`Responsibilities and achievements at ${exp.company}`}>
              {exp.responsibilities.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </section>
  );
};

export default Experience;
