"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./Skills.module.css";

const skillGroups = [
  {
    category: "Programming Languages",
    emoji: "💻",
    color: "#6c63ff",
    skills: ["Python", "JavaScript", "TypeScript", "SQL", "C"],
  },
  {
    category: "Frontend",
    emoji: "🎨",
    color: "#00d4ff",
    skills: ["React", "Next.js", "Vite", "HTML5", "CSS3", "REST APIs"],
  },
  {
    category: "Backend",
    emoji: "⚙️",
    color: "#00ffb3",
    skills: ["Node.js", "Express.js", "GraphQL", "AppSync", "API Integration"],
  },
  {
    category: "Cloud & Infrastructure",
    emoji: "☁️",
    color: "#f59e0b",
    skills: ["AWS EC2", "AWS Amplify", "Vercel", "Nginx", "Serverless Architecture"],
  },
  {
    category: "DevOps & CI/CD",
    emoji: "🔧",
    color: "#ff6584",
    skills: ["Linux", "Docker", "Kubernetes", "GitHub Actions", "CI/CD Pipelines", "Prometheus", "Grafana"],
  },
  {
    category: "AI & ML Engineering",
    emoji: "🤖",
    color: "#a855f7",
    skills: ["Amazon Bedrock", "Gemini AI", "PyTorch", "TensorFlow", "Deep Learning", "Computer Vision"],
  },
  {
    category: "Technical Support",
    emoji: "🛠️",
    color: "#ec4899",
    skills: ["Troubleshooting & Diagnostics", "Bug Documentation", "Customer Onboarding", "Escalation Management"],
  },
  {
    category: "Software Practices",
    emoji: "📐",
    color: "#14b8a6",
    skills: ["OOP", "Data Structures", "Agile", "Unit Testing", "Swagger / OpenAPI", "Git"],
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

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="skills" className={`section ${styles.skills}`}>
      <div className={`bg-orb bg-orb-purple ${styles.orb}`} />
      <div className="container" ref={ref}>
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          className={styles.header}
        >
          <p className="section-label">Tech Stack</p>
          <h2 className="section-title">
            Skills &amp; <span className="text-gradient">Technologies</span>
          </h2>
          <p className="section-subtitle">
            A curated toolkit spanning the full stack — from pixels to pipelines, cloud to AI.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.category}
              className={`glass-card ${styles.groupCard}`}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              style={{ "--group-color": group.color } as React.CSSProperties}
            >
              <div className={styles.groupHeader}>
                <span className={styles.emoji}>{group.emoji}</span>
                <h3 className={styles.groupTitle}>{group.category}</h3>
              </div>
              <div className={styles.skillList}>
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`skill-pill ${styles.skill}`}
                    style={{ ["--pill-color" as string]: group.color }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
