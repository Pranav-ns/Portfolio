"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, ExternalLink } from "lucide-react";
import styles from "./Experience.module.css";

const experiences = [
  {
    role: "Technical Support Intern",
    company: "Joint Role Media",
    companyUrl: "#",
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
            My <span className="text-gradient">Experience</span>
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
                      <Briefcase size={13} />
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
