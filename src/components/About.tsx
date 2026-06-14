"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Award, BookOpen, Calendar } from "lucide-react";
import styles from "./About.module.css";
import TerminalAbout from "./TerminalAbout";

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
              I&apos;m <strong>Pranav Namah Satish</strong>, a Computing Science (AI) student at the <span className="text-gradient">University of Alberta</span> with a passion for building intelligent, scalable systems that combine software engineering, cloud infrastructure, and machine learning.
            </p>
            <p>
              What excites me most about technology is solving complex problems that create real-world impact. Whether it&apos;s developing full-stack applications, deploying cloud-native solutions on AWS, integrating large language models, or exploring MLOps and AI reliability, I enjoy understanding how systems work end-to-end and making them better.
            </p>
            <p>
              My experience spans modern web development, cloud computing, DevOps practices, and AI engineering. Beyond coursework, I&apos;ve worked on projects involving AI-powered applications, cloud deployments, and AI pipeline observability, while continuously expanding my knowledge through research, certifications, and hands-on experimentation.
            </p>
            <p>
              Outside of engineering, I mentor students, contribute to university communities, and enjoy helping others learn technical concepts. I&apos;m currently focused on deepening my expertise in machine learning, cloud architecture, and AI systems with the long-term goal of building reliable, production-ready intelligent technologies at scale.
            </p>

            {/* Quick Info */}
            <div className={styles.quickInfo}>
              <div className={styles.infoItem}>
                <MapPin size={14} style={{ color: "var(--accent-secondary)" }} />
                <span>Edmonton, AB</span>
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
                href="https://www.linkedin.com/in/pranav-ns-/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                LinkedIn
              </a>
              <a
                href="/resume.png"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{
                  background: "var(--gradient-primary)",
                  color: "#fff",
                  border: "none"
                }}
              >
                Resume
              </a>
            </div>
          </motion.div>

          {/* Right – Terminal Animation */}
          <motion.div
            className={styles.rightCol}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <TerminalAbout />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
