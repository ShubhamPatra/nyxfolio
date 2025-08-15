import React from "react";
import "../styles/Skills.css";
import { FaJava, FaReact, FaNodeJs, FaBrain } from "react-icons/fa";
import { SiC, SiCplusplus, SiJavascript, SiExpress, SiMongodb } from "react-icons/si";
import { DiPhp, DiCss3 } from "react-icons/di";
import { AiFillHtml5 } from "react-icons/ai";
import { GrMysql } from "react-icons/gr";

const skillsData = [
  {
    category: "Languages",
    skills: [
      { name: "Java", level: 4, icon: FaJava },
      { name: "C", level: 3, icon: SiC },
      { name: "C++", level: 3, icon: SiCplusplus },
      { name: "JavaScript", level: 5, icon: SiJavascript },
      { name: "PHP", level: 3, icon: DiPhp },
    ],
  },
  {
    category: "Frontend",
    skills: [
      { name: "React.js", level: 5, icon: FaReact },
      { name: "HTML5", level: 5, icon: AiFillHtml5 },
      { name: "CSS3", level: 5, icon: DiCss3 },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", level: 4, icon: FaNodeJs },
      { name: "Express.js", level: 4, icon: SiExpress },
    ],
  },
  {
    category: "Databases",
    skills: [
      { name: "MongoDB", level: 4, icon: SiMongodb },
      { name: "MySQL", level: 4, icon: GrMysql },
    ],
  },
  {
    category: "Concepts",
    skills: [
      { name: "Data Structures", level: 5, icon: FaBrain },
      { name: "Algorithms", level: 5, icon: FaBrain },
      { name: "Problem Solving", level: 5, icon: FaBrain },
    ],
  },
];

function Skills() {
  return (
    <section className="section" aria-labelledby="skills-heading">
      <section className="skills" id="skills">
        <h2 id="skills-heading">🧠 Skills &amp; Tools</h2>
        {skillsData.map((category) => (
          <section
            className="skills-category"
            key={category.category}
            aria-labelledby={`${category.category}-heading`}
          >
            <h3 id={`${category.category}-heading`}>{category.category}</h3>
            <ul aria-label={`${category.category} skills`}>
              {category.skills.map((skill) => {
                const IconComponent = skill.icon;
                return (
                  <li className={`skill-item level-${skill.level}`} key={skill.name}>
                    <div className="skill-card">
                      <IconComponent
                        className="skill-icon"
                        aria-hidden="true"
                        title={skill.name}
                      />
                      <span className="skill-name">{skill.name}</span>
                    </div>
                    <div
                      className="skill-level"
                      role="progressbar"
                      aria-valuenow={skill.level}
                      aria-valuemin={0}
                      aria-valuemax={5}
                      aria-label={`${skill.name} proficiency level ${skill.level} out of 5`}
                    >
                      <div className="skill-level-fill"></div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </section>
    </section>
  );
}

export default Skills;
