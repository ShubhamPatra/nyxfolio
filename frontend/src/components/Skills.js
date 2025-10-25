import "../styles/Skills.css";
import { FaJava, FaReact, FaNodeJs, FaBrain } from "react-icons/fa";
import { SiC, SiCplusplus, SiJavascript, SiExpress, SiMongodb } from "react-icons/si";
import { DiPhp, DiCss3 } from "react-icons/di";
import { AiFillHtml5 } from "react-icons/ai";
import { GrMysql } from "react-icons/gr";
import Tag from "./Tag";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const skillsData = [
  { name: "Java", icon: FaJava },
  { name: "JavaScript", icon: SiJavascript },
  { name: "React.js", icon: FaReact },
  { name: "Node.js", icon: FaNodeJs },
  { name: "HTML5", icon: AiFillHtml5 },
  { name: "CSS3", icon: DiCss3 },
  { name: "MongoDB", icon: SiMongodb },
  { name: "MySQL", icon: GrMysql },
  { name: "Data Structures", icon: FaBrain },
  { name: "Algorithms", icon: FaBrain },
  { name: "Problem Solving", icon: FaBrain },
  { name: "C", icon: SiC },
  { name: "C++", icon: SiCplusplus },
  { name: "PHP", icon: DiPhp },
  { name: "Express.js", icon: SiExpress },
];

function Skills() {
  const [ref, isVisible] = useScrollAnimation();
  
  return (
    <section className="section" aria-labelledby="skills-heading">
      <section ref={ref} className={`skills fade-in ${isVisible ? 'visible' : ''}`} id="skills">
        <h2 id="skills-heading">Skills &amp; Tools</h2>
        
        <div className="skills-grid">
          {skillsData.map((skill, index) => (
            <div 
              key={skill.name} 
              className={`skill-item slide-in-left ${isVisible ? 'visible' : ''}`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Tag variant="skill" icon={skill.icon}>
                {skill.name}
              </Tag>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}

export default Skills;
