import "../styles/Experience.css";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const experiences = [
  {
    id: 1,
    role: "Full Stack Developer Intern",
    company: "Kurators",
    companyUrl: "https://mykurators.com",
    location: "Remote",
    startDate: "July 2025",
    endDate: "Present",
    responsibilities: [
      "Built and maintained scalable web applications using PHP and MySQL in a startup environment.",
      "Developed and deployed 3+ production features, reducing page load times by 25%.",
      "Wrote clean, maintainable PHP code, reducing bug reports by 15%.",
      "Optimized MySQL queries and database design to handle datasets of 100k+ records efficiently.",
      "Reviewed 20+ pull requests to ensure code quality, maintainability, and adherence to standards."
    ]
  }
];

const Experience = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section className="section" aria-labelledby="experience-heading">
      <section ref={ref} className={`experience fade-in ${isVisible ? 'visible' : ''}`} id="experience">
        <h2 id="experience-heading">Professional Experience</h2>
        {experiences.map((exp) => (
          <article key={exp.id} className="experience-item">
            <div className="experience-header">
              <div className="experience-title">
                <h3>{exp.role}</h3>
                <p className="company-name">
                  {exp.companyUrl ? (
                    <a 
                      href={exp.companyUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label={`Visit ${exp.company} website`}
                    >
                      {exp.company}
                    </a>
                  ) : (
                    exp.company
                  )}
                </p>
                {exp.companyUrl && (
                  <p className="company-website">
                    <a 
                      href={exp.companyUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label={`Visit ${exp.company} website`}
                    >
                      🔗 mykurators.com
                    </a>
                  </p>
                )}
                <p className="location">
                  <time dateTime={exp.startDate}>{exp.startDate}</time> – <time dateTime={exp.endDate}>{exp.endDate}</time> | {exp.location}
                </p>
              </div>
            </div>
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
