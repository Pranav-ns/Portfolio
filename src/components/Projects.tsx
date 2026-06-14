"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Server, Zap, BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";
import { GithubIcon } from "@/components/Icons";
import styles from "./Projects.module.css";

const projects = [
  {
    id: "caterbridge",
    title: "CaterBridge",
    subtitle: "Full-Stack Cloud Marketplace",
    description:
      "Deployed marketplace on AWS EC2 using Nginx and PM2, achieving sub-2s page loads and 99.9% uptime. Integrated Gemini AI chatbot and Stripe payments through REST APIs. Implemented observability with Prometheus and Grafana, reducing incident detection time by 70%.",
    tags: ["React", "Node.js", "AWS EC2", "Docker", "Nginx", "Prometheus", "Grafana", "MongoDB", "Gemini AI", "Stripe"],
    icon: <Server size={22} />,
    color: "#6c63ff",
    gradient: "linear-gradient(135deg, rgba(108,99,255,0.06) 0%, rgba(0,212,255,0.02) 100%)",
    featured: true,
    demoLink: "https://caterbridge.pranavns.com",
  },
  {
    id: "papo",
    title: "Papo AI",
    subtitle: "Serverless AI Culinary Assistant",
    description:
      "Built a serverless architecture on AWS Amplify with AppSync GraphQL APIs, Cognito auth, and CI/CD pipelines via GitHub Actions. Integrated Amazon Bedrock (Claude 3 Sonnet) for real-time personalised recommendations. Monitored Core Web Vitals with Grafana Faro.",
    tags: ["React (Vite)", "AWS Amplify", "AppSync", "Cognito", "Bedrock (Claude 3)", "GraphQL", "GitHub Actions", "Grafana Faro"],
    icon: <Zap size={22} />,
    color: "#00d4ff",
    gradient: "linear-gradient(135deg, rgba(0,212,255,0.05) 0%, rgba(0,255,179,0.02) 100%)",
    featured: true,
    demoLink: "https://papo-ai.pranavns.com",
  },
  {
    id: "shelfout",
    title: "ShelfOut",
    subtitle: "AI-Powered Book Discovery",
    description:
      "Built a full-stack book discovery platform that transformed bookshelf images into personalized recommendations using computer vision, metadata enrichment, and AI-driven ranking workflows. Designed cloud-ready backend services optimised through caching, rate limiting, and containerised deployment.",
    tags: ["Computer Vision", "Python", "Node.js", "REST APIs", "Docker", "Kubernetes", "Cloud Deployment"],
    icon: <BookOpen size={22} />,
    color: "#ff6584",
    gradient: "linear-gradient(135deg, rgba(255,101,132,0.05) 0%, rgba(108,99,255,0.02) 100%)",
    featured: false,
  },
  {
    id: "failure-forensics",
    title: "Failure Forensics Tool for AI Pipelines",
    subtitle: "AI Reliability Engineering Platform",
    description:
      "Building an observability and debugging framework for AI pipelines that monitors LLM workflows, identifies failure points across RAG, prompting, and model inference stages, and performs automated root-cause analysis to accelerate troubleshooting and enhance production AI reliability.",
    tags: ["AI/ML", "Observability", "RAG", "LLM Workflows", "Python"],
    icon: <Zap size={22} />,
    color: "#00ffb3",
    gradient: "linear-gradient(135deg, rgba(0,255,179,0.05) 0%, rgba(0,212,255,0.02) 100%)",
    featured: true,
  },
  {
    id: "llm-cost-autopilot",
    title: "LLM Cost Autopilot",
    subtitle: "AI Reliability & Cost Optimization Platform",
    description:
      "Engineered an intelligent inference orchestration layer that optimizes LLM spending through complexity-aware routing, automated quality assurance, and self-improving feedback loops. Integrated multi-provider model management, real-time cost analytics, and escalation mechanisms to balance quality, latency, and operational efficiency at scale.",
    tags: ["AI/ML", "Cost Optimization", "Inference Orchestration", "LLM Routing", "Analytics"],
    icon: <Server size={22} />,
    color: "#6c63ff",
    gradient: "linear-gradient(135deg, rgba(108,99,255,0.06) 0%, rgba(0,212,255,0.02) 100%)",
    featured: true,
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

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="projects" className={`section ${styles.projects}`}>
      <div className={`bg-orb bg-orb-pink ${styles.orb}`} />
      <div className="container" ref={ref}>
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          className={styles.header}
        >
          <p className="section-label">What I Built</p>
          <h2 className="section-title">
            Impactful <span className="text-gradient">Projects</span>
          </h2>
          <p className="section-subtitle">
            Full-stack, AI-powered, cloud-native systems built for real-world scale and impact.
          </p>
        </motion.div>

        {/* Project Grid */}
        <div className={styles.grid}>
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              className={`${styles.card} ${project.featured ? styles.featured : ""}`}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              style={{ background: project.gradient }}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.cardGlow} style={{ background: project.color }} />

              <div className={styles.cardHeader} style={{ justifyContent: "flex-end" }}>
                <div className={styles.cardActions}>
                  <a href="https://github.com/Pranav-ns" target="_blank" rel="noopener noreferrer" className={styles.actionBtn} aria-label="GitHub">
                    <GithubIcon size={16} />
                  </a>
                  {project.demoLink ? (
                    <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className={styles.actionBtn} aria-label="Live demo">
                      <ExternalLink size={16} />
                    </a>
                  ) : (
                    <Link href="/demo-pending" className={styles.actionBtn} aria-label="Live demo">
                      <ExternalLink size={16} />
                    </Link>
                  )}
                </div>
              </div>

              <h3 className={styles.cardTitle}>{project.title}</h3>
              <p className={styles.cardSubtitle} style={{ color: project.color }}>{project.subtitle}</p>
              <p className={styles.cardDesc}>{project.description}</p>

              <div className={styles.cardTags}>
                {project.tags.map((tag) => (
                  <span key={tag} className="tech-badge">{tag}</span>
                ))}
              </div>
            </motion.article>
          ))}

          {/* View All Projects Card */}
          <Link href="/all-projects" style={{ textDecoration: "none", display: "block" }}>
            <motion.article
              className={styles.card}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                background: "var(--glass-bg)",
                border: "1px dashed var(--border-accent)"
              }}
            >
              <div className={styles.iconBox} style={{ color: "var(--text-primary)", borderColor: "var(--border-accent)", marginBottom: "16px" }}>
                <ArrowRight size={28} />
              </div>
              <h3 className={styles.cardTitle} style={{ fontSize: "1.4rem" }}>View All Projects</h3>
              <p className={styles.cardDesc} style={{ marginTop: "12px" }}>
                Explore the complete archive of my full-stack, AI, and cloud infrastructure projects.
              </p>
            </motion.article>
          </Link>
        </div>
      </div>
    </section>
  );
}
