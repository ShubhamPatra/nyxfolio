import React from "react";
import "../styles/Experience.css";

const experiences = [
  {
    id: 1,
    role: "Full Stack Developer Intern",
    company: "Kurators",
    location: "Remote",
    startDate: "2025-07",
    endDate: "Present",
    responsibilities: [
      "Working on real-world web applications in a fast-paced startup environment.",
      "Collaborating in Agile sprints, writing scalable code, and handling production features.",
      "Gaining hands-on experience in React, Node.js, MongoDB, and modern dev workflows."
    ]
  }
];

const Experience = () => {
  return (
    <section className="section">
      <section className="experience" id="experience">
        <h2>Experience</h2>
        {experiences.map((exp) => (
          <article key={exp.id} className="experience-item">
            <h3>{exp.role} – {exp.company}</h3>
            <p className="location">{exp.location}</p>
            <p className="location">{exp.startDate} – {exp.endDate}</p>
            <ul>
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