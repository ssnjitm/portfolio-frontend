
const experiences = [
  {
    company: "Tech Company",
    role: "Frontend Developer",
    period: "Jan 2022 – Present",
    description: "Developed modern web applications using React, improved UI/UX, and collaborated with cross-functional teams."
  },
  {
    company: "Startup Inc.",
    role: "Web Developer",
    period: "Jun 2020 – Dec 2021",
    description: "Built responsive websites, optimized performance, and contributed to open-source projects."
  }
];

export default function ExperienceSection() {
  return (
    <section className="section" id="experience">
      <div className="container">
        <div className="section-header">
          <span className="section-number">01.</span>
          <h2 className="section-title">Experience</h2>
          <div className="section-line"></div>
        </div>
        <div>
          {experiences.map((exp, idx) => (
            <div key={idx} className="experience-item" style={{marginBottom: "2rem"}}>
              <h3 style={{marginBottom: "0.25rem"}}>{exp.role} <span style={{color: "var(--accent-primary)"}}>@ {exp.company}</span></h3>
              <div style={{color: "var(--text-tertiary)", fontSize: "0.95rem", marginBottom: "0.5rem"}}>{exp.period}</div>
              <p style={{color: "var(--text-secondary)"}}>{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}