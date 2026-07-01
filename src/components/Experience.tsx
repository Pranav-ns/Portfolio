"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink } from "lucide-react";
import styles from "./Experience.module.css";

const experiences = [
  {
    role: "DevOps Engineer Intern",
    company: "StackPro",
    companyUrl: "#",
    period: "Jul 2026 – Present",
    location: "Bangalore",
    type: "Internship",
    bullets: [
      "Architecting and deploying cloud-native automation pipelines to support scalable backend workflows and seamless AI-feature integration.",
      "Spearheading the development of GenAI-enabled product prototypes, bridging the gap between experimental machine learning models and production-ready software systems.",
    ],
    tags: ["DevOps", "GenAI", "Cloud-Native", "Automation"],
    color: "#ff6584",
  },
  {
    role: "Co Facilitator",
    company: "University of Alberta (International House)",
    companyUrl: "https://www.ualberta.ca/en/international/global-education/international-house/index.html",
    period: "Sept 2025 – April 2026",
    location: "Leadership",
    type: "Leadership",
    bullets: [
      "Contributing to student engagement and cross-cultural community building.",
      "Led and supported events and activities that enhanced international student integration and campus involvement."
    ],
    tags: ["Community Building", "Cross-Cultural", "Event Leadership", "Student Engagement"],
    color: "#6c63ff",
  },
  {
    role: "Technical Support Intern",
    company: "Joint Role Media",
    companyUrl: "https://jointrolemedia.com/",
    period: "Mar 2025 – Aug 2025",
    location: "Bangalore",
    type: "Full-time",
    bullets: [
      "Resolved technical support tickets by email and live chat. Diagnosed software issues end-to-end, documented bugs, and worked with engineering teams to drive timely resolution.",
      "Introduced customers to software platforms, reducing time-to-value and minimising early churn support requests. Authored knowledge-base articles and FAQs that reduced repeat ticket volume.",
      "Escalated critical incidents with full context, ensuring fast cross-functional resolution.",
    ],
    tags: ["Technical Support", "Bug Documentation", "Customer Onboarding", "Cross-functional"],
    color: "var(--accent-primary)",
  },
  {
    role: "Tech Mentor",
    company: "Global Academy of Technology",
    companyUrl: "https://www.gat.ac.in/",
    period: "June 2024 – June 2025",
    location: "Leadership",
    type: "Leadership",
    bullets: [
      "Mentored students in Theory of Computation, programming fundamentals, and core technical concepts.",
      "Helped bridge the gap between classroom theory and practical software development."
    ],
    tags: ["Mentoring", "Theory of Computation", "Programming", "Technical Fundamentals"],
    color: "#00d4ff",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className={`section ${styles.experience}`}>
      <div className={`bg-orb bg-orb-cyan ${styles.orb}`} />
      <div className="container" ref={ref}>
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          className={styles.header}
        >
          <p className="section-label">Work History</p>
          <h2 className="section-title">
            Experience &amp; <span className="text-gradient">Leadership</span>
          </h2>
        </motion.div>

        <div className={styles.timeline}>
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.role}
              className={styles.timelineItem}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              {/* Line */}
              <div className={styles.timelineLine}>
                <div className="timeline-dot" style={{ background: exp.color }} />
              </div>

              {/* Card */}
              <div className={`glass-card glow-border ${styles.card}`}>
                <div className={styles.cardHeader}>
                  <div>
                    <div className={styles.role}>{exp.role}</div>
                    <div className={styles.company}>
                      {exp.companyUrl !== "#" ? (
                        <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" className={styles.companyLink}>
                          {exp.company} <ExternalLink size={11} />
                        </a>
                      ) : (
                        <span style={{ color: "var(--accent-secondary)" }}>{exp.company}</span>
                      )}
                    </div>
                  </div>
                  <div className={styles.meta}>
                    <span className={`font-mono ${styles.period}`}>{exp.period}</span>
                    <span className={styles.locationTag}>{exp.location}</span>
                  </div>
                </div>

                <ul className={styles.bullets}>
                  {exp.bullets.map((b, j) => (
                    <li key={j} className={styles.bullet}>
                      <span className={styles.bulletDot} />
                      {b}
                    </li>
                  ))}
                </ul>

                <div className={styles.tags}>
                  {exp.tags.map((t) => (
                    <span key={t} className="tech-badge">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Future / Looking for */}
          <motion.div
            className={styles.timelineItem}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <div className={styles.timelineLine}>
              <div className={styles.futureDot} />
            </div>
            <div className={`${styles.futureCard}`}>
              <span className="availability-badge">
                <span className="dot" />
                Open to New Opportunities — 4, 8, or 12-month internships
              </span>
              <p style={{ marginTop: "12px", color: "var(--text-muted)", fontSize: "0.9rem" }}>
                Seeking Software Engineering, Cloud, or AI/ML roles. Available immediately.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
