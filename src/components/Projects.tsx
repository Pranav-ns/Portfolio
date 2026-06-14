"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Server, Zap, BookOpen } from "lucide-react";
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
    gradient: "linear-gradient(135deg, rgba(108,99,255,0.2) 0%, rgba(0,212,255,0.08) 100%)",
    featured: true,
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
    gradient: "linear-gradient(135deg, rgba(0,212,255,0.15) 0%, rgba(0,255,179,0.05) 100%)",
    featured: true,
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
    gradient: "linear-gradient(135deg, rgba(255,101,132,0.15) 0%, rgba(108,99,255,0.05) 100%)",
    featured: false,
  },
];

const filters = ["All", "AWS", "AI/ML", "DevOps", "React"];

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
  const [activeFilter, setActiveFilter] = useState("All");

  const filterMap: Record<string, string[]> = {
    All: [],
    AWS: ["AWS EC2", "AWS Amplify", "AppSync", "Cognito", "Bedrock (Claude 3)"],
    "AI/ML": ["Gemini AI", "Bedrock (Claude 3)", "Computer Vision", "Grafana Faro"],
    DevOps: ["Docker", "Kubernetes", "Nginx", "Prometheus", "Grafana", "GitHub Actions", "CI/CD"],
    React: ["React", "React (Vite)", "Node.js"],
  };

  const visibleProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.tags.some((t) => filterMap[activeFilter].includes(t)));

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

        {/* Filter Tabs */}
        <motion.div
          className={styles.filters}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {filters.map((f) => (
            <button
              key={f}
              className={`${styles.filterBtn} ${activeFilter === f ? styles.filterActive : ""}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Project Grid */}
        <div className={styles.grid}>
          {visibleProjects.map((project, i) => (
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

              <div className={styles.cardHeader}>
                <div className={styles.iconBox} style={{ color: project.color, borderColor: `${project.color}33` }}>
                  {project.icon}
                </div>
                <div className={styles.cardActions}>
                  <a href="https://github.com/Pranav-ns" target="_blank" rel="noopener noreferrer" className={styles.actionBtn} aria-label="GitHub">
                    <GithubIcon size={16} />
                  </a>
                  <a href="#" className={styles.actionBtn} aria-label="Live demo">
                    <ExternalLink size={16} />
                  </a>
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
        </div>
      </div>
    </section>
  );
}
