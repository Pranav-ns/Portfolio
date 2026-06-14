"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, GraduationCap } from "lucide-react";
import styles from "./Leadership.module.css";

const roles = [
  {
    title: "Co Facilitator",
    org: "University of Alberta",
    icon: <Users size={22} />,
    color: "#6c63ff",
    description:
      "Contributing to student engagement and cross-cultural community building. Led and supported events and activities that enhanced international student integration and campus involvement.",
    tags: ["Community Building", "Cross-Cultural", "Event Leadership", "Student Engagement"],
  },
  {
    title: "Tech Mentor",
    org: "Global Academy of Technology (2024 – 2025)",
    icon: <GraduationCap size={22} />,
    color: "#00d4ff",
    description:
      "Mentored students in Theory of Computation, programming fundamentals, and core technical concepts. Helped bridge the gap between classroom theory and practical software development.",
    tags: ["Mentoring", "Theory of Computation", "Programming", "Technical Fundamentals"],
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

export default function Leadership() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="leadership" className={`section ${styles.leadership}`}>
      <div className={`bg-orb bg-orb-cyan ${styles.orb}`} />
      <div className="container" ref={ref}>
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          className={styles.header}
        >
          <p className="section-label">Beyond Code</p>
          <h2 className="section-title">
            Leadership &amp; <span className="text-gradient">Activities</span>
          </h2>
          <p className="section-subtitle">
            Building communities and empowering the next generation of engineers.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {roles.map((role, i) => (
            <motion.div
              key={role.title}
              className={`glass-card glow-border ${styles.card}`}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <div className={styles.iconBox} style={{ color: role.color, borderColor: `${role.color}33` }}>
                {role.icon}
              </div>
              <h3 className={styles.roleTitle}>{role.title}</h3>
              <p className={styles.org} style={{ color: role.color }}>{role.org}</p>
              <p className={styles.desc}>{role.description}</p>
              <div className={styles.tags}>
                {role.tags.map((t) => (
                  <span key={t} className="tech-badge green">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
