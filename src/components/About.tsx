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
