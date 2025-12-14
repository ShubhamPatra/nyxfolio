import "../styles/Projects.css";
import Tag from "./Tag";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const projectList = [
  {
    name: "CodeTogether",
    description:
      "A real-time collaborative code editor enabling multiple developers to code simultaneously with live cursor tracking, integrated chat, file management, and syntax highlighting for multiple languages using WebSocket-based synchronization.",
    stack: ["React", "TypeScript", "Node", "Express", "Socket.io"],
    category: "Web App",
    status: "Live",
    image: "./codetogether.png",
    demoLink: "https://codetogetherfrontend.onrender.com/",
    githubLink: "https://github.com/ShubhamPatra/CodeTogether"
  },
  {
    name: "CareerConnect",
    description:
      "A full-stack job portal with role-based authentication enabling recruiters to post jobs and manage applicants through admin dashboard with real-time statistics, data export, and secure file upload system with RESTful API endpoints.",
    stack: ["PHP", "MySQL", "Bootstrap"],
    category: "Web App",
    status: "Live",
    image: "./careerconnect.png",
    demoLink: "https://careerconnect.infinityfreeapp.com",
    githubLink: "https://github.com/ShubhamPatra/CareerConnect"
  },
  {
    name: "Student Management System",
    description:
      "A desktop application using Java Swing with 3-tier MVC architecture, implementing student registration, authentication, automated grade calculation for 6 subjects, and PDF report generation with OpenPDF library.",
    stack: ["Java", "MySQL", "Java Swing", "JDBC", "OpenPDF"],
    category: "Desktop App",
    status: "Complete",
    image: "./student-management-system.png",
    demoLink: null,
    githubLink: "https://github.com/ShubhamPatra/StudentManagementSystem"
  },
  {
    name: "Nyxfolio",
    description:
      "An AI-powered portfolio with React 19 and dual Express.js backends, integrating Google Gemini API for intelligent chatbot interactions and secure contact form with rate limiting, XSS protection, and Helmet.js security measures. Achieved 95+ Lighthouse performance score.",
    stack: ["React", "Node", "Express", "Gemini API"],
    category: "Web App",
    status: "Live",
    image: "./nyxfolio.png",
    demoLink: "https://www.shubhampatra.dev",
    githubLink: "https://github.com/ShubhamPatra/nyxfolio"
  },
  {
    name: "Nyx",
    description:
      "A sophisticated full-stack AI chat application featuring Nyx, a cryptic AI oracle with Moon Knight-inspired personality. Built with React 19, Vite, Express.js, and OpenRouter API integration with intelligent model selection.",
    stack: ["React", "Node", "Express", "OpenRouter API", "Vite"],
    category: "AI",
    status: "Live",
    image: "./nyx.png",
    demoLink: "https://nyxai.onrender.com/",
    githubLink: "https://github.com/ShubhamPatra/Nyx"
  },
  {
    name: "Bash System Maintenance Suite",
    description:
      "A comprehensive automation suite with 5 interconnected Bash scripts for Linux system maintenance, featuring a menu-driven interface for backup operations, system updates, log monitoring, and health diagnostics with real-time resource tracking.",
    stack: ["Bash", "Linux", "Shell Scripting"],
    category: "CLI Tool",
    status: "Complete",
    image: null,
    demoLink: null,
    githubLink: "https://github.com/ShubhamPatra/Bash-System-Maintenance-Suite"
  }
];

function Projects() {
  const [ref, isVisible] = useScrollAnimation();
  
  return (
    <section className="section">
      <section ref={ref} className={`projects fade-in ${isVisible ? 'visible' : ''}`} id="projects">
        <div className="projects-container">
          <h2>Projects</h2>
          <div className="project-list">
            {projectList.map((project, index) => (
              <div 
                className={`project-card stagger-animation ${isVisible ? 'visible' : ''}`} 
                key={index}
                style={{ animationDelay: `${index * 150}ms` }}
              >
              <div className="project-image-wrapper">
                {project.image && (
                  <>
                    <img
                      src={project.image}
                      alt={`${project.name} project screenshot`}
                    />
                    <div className="project-image-overlay"></div>
                  </>
                )}
              </div>
              <div className="project-badges">
                <Tag variant="category" className={`category-${project.category.toLowerCase().replace(/\s+/g, '-')}`}>
                  {project.category}
                </Tag>
                <span className={`project-status status-${project.status.toLowerCase().replace(/\s+/g, '-')}`}>
                  <span className="status-dot"></span>
                  {project.status}
                </span>
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
        </div>
      </section>
    </section>
  );
}

export default Projects;