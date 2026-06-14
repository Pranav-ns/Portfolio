"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Award, BookOpen, Calendar } from "lucide-react";
import styles from "./About.module.css";

const stats = [
  { number: "17+", label: "Projects Shipped", icon: "🚀" },
  { number: "15+", label: "Technologies", icon: "⚡" },
  { number: "$10K", label: "Maple Leaf Award", icon: "🏆" },
  { number: "3", label: "Years CS Degree", icon: "🎓" },
];

const education = [
  {
    degree: "BSc Honours in Computing Science – Artificial Intelligence",
    school: "University of Alberta",
    location: "Edmonton, AB",
    period: "Sep 2025 – Apr 2028 (Expected)",
    note: "🏆 Maple Leaf Award (2025): Academic excellence — $10,000",
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

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className={`section ${styles.about}`}>
      <div className={`bg-orb bg-orb-purple ${styles.orb}`} />
      <div className="container" ref={ref}>
        <div className={styles.header}>
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
          >
            <p className="section-label">Who I Am</p>
            <h2 className="section-title">
              About <span className="text-gradient">Me</span>
            </h2>
          </motion.div>
        </div>

        <div className={styles.grid}>
          {/* Left – Bio */}
          <motion.div
            className={styles.bio}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
          >
            <p>
              I&apos;m <strong>Pranav Namah Satish</strong> — a BSc Computing Science (AI) student
              at the <span className="text-gradient">University of Alberta</span>, driven by a passion
              for building things that matter at the intersection of software, cloud, and AI.
            </p>
            <p>
              My experience spans full-stack development with React & Node.js, cloud-native
              deployments on AWS, containerisation with Docker & Kubernetes, and AI integrations
              using Amazon Bedrock and Gemini AI. I care about clean code, great UX, and systems
              that scale.
            </p>
            <p>
              Outside engineering, I mentor students in theory of computation and work to build
              inclusive communities across cultural groups at university. I&apos;m actively seeking
              <strong> 4, 8, or 12-month internships</strong> in Software Engineering, Cloud, or AI/ML.
            </p>

            {/* Quick Info */}
            <div className={styles.quickInfo}>
              <div className={styles.infoItem}>
                <MapPin size={14} style={{ color: "var(--accent-secondary)" }} />
                <span>Bangalore, India · Edmonton, AB</span>
              </div>
              <div className={styles.infoItem}>
                <BookOpen size={14} style={{ color: "var(--accent-secondary)" }} />
                <span>BSc CS (AI) — University of Alberta</span>
              </div>
              <div className={styles.infoItem}>
                <Calendar size={14} style={{ color: "var(--accent-secondary)" }} />
                <span>Available for internships now</span>
              </div>
              <div className={styles.infoItem}>
                <Award size={14} style={{ color: "var(--accent-secondary)" }} />
                <span>Maple Leaf Award 2025 — Academic Excellence</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "24px" }}>
              <a href="mailto:pns@ualberta.ca" className="btn-primary">
                Contact Me
              </a>
              <a
                href="https://linkedin.com/in/pranav-namah-satish"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                LinkedIn
              </a>
            </div>
          </motion.div>

          {/* Right – Stats + Education */}
          <div className={styles.rightCol}>
            {/* Stats Grid */}
            <motion.div
              className={styles.statsGrid}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
            >
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  className={`glass-card glow-border ${styles.statCard}`}
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                >
                  <span style={{ fontSize: "1.8rem" }}>{s.icon}</span>
                  <div className="stat-number">{s.number}</div>
                  <div style={{ color: "var(--text-muted)", fontSize: "0.8rem", fontWeight: 500 }}>{s.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Education */}
            <motion.div
              className={styles.educationCard}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <h3 className={styles.educationTitle}>
                <BookOpen size={18} style={{ color: "var(--accent-primary)" }} />
                Education
              </h3>
              {education.map((edu) => (
                <div key={edu.degree} className={styles.eduItem}>
                  <div className={styles.eduDegree}>{edu.degree}</div>
                  <div className={styles.eduMeta}>
                    <span style={{ color: "var(--accent-secondary)" }}>{edu.school}</span>
                    <span>·</span>
                    <span style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: "0.78rem" }}>{edu.period}</span>
                  </div>
                  <div className={styles.eduNote}>{edu.note}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
