import "../styles/Experience.css";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const experiences = [
  {
    id: 1,
    role: "Full Stack Developer Intern",
    company: "Kurators",
    companyUrl: "https://mykurators.com",
    location: "Remote",
    startDate: "August 2025",
    endDate: "December 2025",
    certificate: "./InternshipCertificateShubhamPatra.png",
    responsibilities: [
      "Built and maintained scalable web applications using PHP and MySQL.",
      "Developed and deployed 3+ production features, reducing page load times by 25%.",
      "Wrote clean, maintainable code, reducing bug reports by 15%.",
      "Optimized MySQL queries to handle 100k+ records efficiently.",
      "Reviewed 20+ pull requests for code quality and maintainability."
    ]
  }
];

const Experience = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section className="section" aria-labelledby="experience-heading">
      <section ref={ref} className={`experience fade-in ${isVisible ? 'visible' : ''}`} id="experience">
        <div className="experience-container">
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
                        style={{ 
                          textDecoration: 'none', 
                          color: 'inherit', 
                          border: 'none', 
                          outline: 'none',
                          boxShadow: 'none'
                        }}
                        onFocus={(e) => e.target.style.outline = 'none'}
                      >
                        {exp.company}
                      </a>
                    ) : (
                      exp.company
                    )}
                  </p>
                  <p className="location">
                    <time dateTime={exp.startDate}>{exp.startDate}</time> – <time dateTime={exp.endDate}>{exp.endDate}</time>
                    {exp.certificate && (
                      <>
                        {" • "}
                        <a 
                          href={exp.certificate} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          aria-label="View internship certificate"
                          className="certificate-inline"
                        >
                          View Certificate
                        </a>
                      </>
                    )}
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
        </div>
      </section>
    </section>
  );
};

export default Experience;
