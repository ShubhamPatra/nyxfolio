import React from "react";
import "../styles/Projects.css";

const projectList = [
  {
    name: "CodeTogether",
    description:
      "A real-time collaborative code editor with live syncing and cursor sharing.",
    stack: ["React", "Node", "Express", "Socket.io"],
    category: "Web App",
    image: "./codetogether.png",
    demoLink: "https://codetogetherfrontend.onrender.com/",
    githubLink: "https://github.com/ShubhamPatra/CodeTogether"
  },
  {
    name: "CareerConnect",
    description:
      "A comprehensive PHP-based job application portal that enables job seekers to browse and apply for positions while providing administrators with powerful tools to manage job listings and applications through a secure dashboard interface.",
    stack: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    category: "Web App",
    image: "./careerconnect.png",
    demoLink: "https://careerconnect.wuaze.com/",
    githubLink: "https://github.com/ShubhamPatra/CareerConnect"
  },
  {
    name: "Nyx",
    description:
      "A sophisticated full-stack AI chat application featuring Nyx, a cryptic AI oracle with Moon Knight-inspired personality. Built with React 19, Vite 7, Express.js, and OpenRouter AI API integration.",
    stack: ["React", "Node", "Express", "API"],
    category: "AI",
    image: "./nyx.png",
    demoLink: "https://nyxai.onrender.com/",
    githubLink: "https://github.com/ShubhamPatra/Nyx"
  }
];

function Projects() {
  return (
    <section className="section">
      <section className="projects" id="projects">
        <h2>🚀 Projects</h2>
        <div className="project-list">
          {projectList.map((project, index) => (
            <div className="project-card" key={index}>
              <img
                src={project.image}
                alt={`${project.name} project screenshot`}
              />
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <p className="tech">{project.stack.join(", ")}</p>
              <div className="project-links">
                {project.demoLink && (
                  <a href={project.demoLink} target="_blank" rel="noreferrer">
                    Live Demo ↗
                  </a>
                )}
                {project.githubLink && (
                  <a href={project.githubLink} target="_blank" rel="noreferrer">
                    GitHub ↗
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}

export default Projects;