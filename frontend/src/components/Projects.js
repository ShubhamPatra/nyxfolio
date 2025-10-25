import "../styles/Projects.css";
import Tag from "./Tag";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const projectList = [
  {
    name: "CodeTogether",
    description:
      "A real-time collaborative code editor with live syncing and cursor sharing.",
    stack: ["React", "Node", "Express", "Socket.io"],
    category: "Web App",
    status: "Live",
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
    status: "Live",
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
    status: "Live",
    image: "./nyx.png",
    demoLink: "https://nyxai.onrender.com/",
    githubLink: "https://github.com/ShubhamPatra/Nyx"
  }
];

function Projects() {
  const [ref, isVisible] = useScrollAnimation();
  
  return (
    <section className="section">
      <section ref={ref} className={`projects fade-in ${isVisible ? 'visible' : ''}`} id="projects">
        <h2>Projects</h2>
        <div className="project-list">
          {projectList.map((project, index) => (
            <div 
              className={`project-card stagger-animation ${isVisible ? 'visible' : ''}`} 
              key={index}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="project-badges">
                <Tag variant="category" className={`category-${project.category.toLowerCase().replace(/\s+/g, '-')}`}>
                  {project.category}
                </Tag>
                <span className={`project-status status-${project.status.toLowerCase().replace(/\s+/g, '-')}`}>
                  <span className="status-dot"></span>
                  {project.status}
                </span>
              </div>
              <div className="project-image-wrapper">
                <img
                  src={project.image}
                  alt={`${project.name} project screenshot`}
                />
                <div className="project-image-overlay"></div>
              </div>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <div className="project-tech-stack">
                {project.stack.map((tech) => (
                  <Tag key={tech} variant="tech">
                    {tech}
                  </Tag>
                ))}
              </div>
              <div className="project-links">
                {project.demoLink && (
                  <a href={project.demoLink} target="_blank" rel="noreferrer">
                    Live Demo <FaExternalLinkAlt className="link-icon" />
                  </a>
                )}
                {project.githubLink && (
                  <a href={project.githubLink} target="_blank" rel="noreferrer">
                    <FaGithub className="link-icon" /> GitHub
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