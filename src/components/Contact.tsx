"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, Send, Instagram } from "lucide-react";
import { GithubIcon, LinkedInIcon } from "@/components/Icons";
import styles from "./Contact.module.css";

const contactLinks = [
  {
    icon: <Mail size={20} />,
    label: "Email",
    value: "pns@ualberta.ca",
    href: "mailto:pns@ualberta.ca",
    color: "#6c63ff",
  },
  {
    icon: <Phone size={20} />,
    label: "Phone",
    value: "+1 825 582 8555",
    href: "tel:+18255828555",
    color: "#00d4ff",
  },
  {
    icon: <GithubIcon size={20} />,
    label: "GitHub",
    value: "github.com/Pranav-ns",
    href: "https://github.com/Pranav-ns",
    color: "#00ffb3",
  },
  {
    icon: <LinkedInIcon size={20} />,
    label: "LinkedIn",
    value: "Pranav Namah Satish",
    href: "https://www.linkedin.com/in/pranav-ns-/",
    color: "#f59e0b",
  },
  {
    icon: <MapPin size={20} />,
    label: "Location",
    value: "Edmonton, AB",
    href: "#",
    color: "#ff6584",
  },
  {
    icon: <Instagram size={20} />,
    label: "Instagram",
    value: "@pranav._.ns",
    href: "https://www.instagram.com/pranav._.ns/",
    color: "#E1306C",
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

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="contact" className={`section ${styles.contact}`}>
      <div className={`bg-orb bg-orb-purple ${styles.orb1}`} />
      <div className={`bg-orb bg-orb-cyan ${styles.orb2}`} />

      <div className="container" ref={ref}>
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          className={styles.header}
        >
          <p className="section-label">Let's Talk</p>
          <h2 className="section-title">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="section-subtitle">
            I&apos;m actively seeking internship opportunities. Whether you have a role, a project,
            or just want to connect — my inbox is always open.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {/* Left – Info */}
          <motion.div
            className={styles.infoCol}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <div className={`availability-badge ${styles.badge}`}>
              <span className="dot" />
              Available for 4, 8, 12-month internships
            </div>
            <p className={styles.tagline}>
              Whether it&apos;s a full-stack role, cloud infrastructure, AI/ML, or DevOps —
              I&apos;m ready to contribute from day one.
            </p>

            <div className={styles.links}>
              {contactLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={`glass-card-sm ${styles.linkCard}`}
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  whileHover={{ x: 6 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className={styles.linkIcon} style={{ color: link.color, borderColor: `${link.color}33` }}>
                    {link.icon}
                  </span>
                  <div>
                    <div className={styles.linkLabel}>{link.label}</div>
                    <div className={styles.linkValue}>{link.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right – CTA Card */}
          <motion.div
            className={styles.ctaCol}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <div className={`glass-card glow-border ${styles.ctaCard}`}>
              <div className={styles.ctaGlow} />
              <span style={{ fontSize: "3rem" }}>👋</span>
              <h3 className={styles.ctaTitle}>Ready to collaborate?</h3>
              <p className={styles.ctaText}>
                I&apos;m passionate about building impactful software. Let&apos;s discuss how
                I can bring value to your team.
              </p>
              <div className={styles.ctaButtons}>
                <a href="mailto:pns@ualberta.ca" className="btn-primary">
                  <Send size={16} />
                  Send Email
                </a>
                <a
                  href="https://www.linkedin.com/in/pranav-ns-/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <LinkedInIcon size={16} />
                  LinkedIn
                </a>
                <a
                  href="https://www.instagram.com/pranav._.ns/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <Instagram size={16} />
                  Instagram
                </a>
              </div>
              <div className={styles.ctaMeta}>
                <span className="font-mono" style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  Usually responds within 24h
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <div className="gradient-divider" />
        <div className={`container ${styles.footerInner}`}>
          <p className={styles.footerText}>
            Designed &amp; built with ❤️ by{" "}
            <span className="text-gradient" style={{ fontWeight: 600 }}>Pranav Namah Satish</span>
          </p>
          <p className={styles.footerSub}>
            © {new Date().getFullYear()} · All rights reserved
          </p>
        </div>
      </div>
    </section>
  );
}
