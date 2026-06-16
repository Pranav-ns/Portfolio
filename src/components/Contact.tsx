"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, Send, Coffee, Calendar } from "lucide-react";
import { GithubIcon, LinkedInIcon, InstagramIcon } from "@/components/Icons";
import styles from "./Contact.module.css";

const contactLinks = [
  {
    icon: <Mail size={24} />,
    label: "Email",
    value: "pns@ualberta.ca",
    href: "mailto:pns@ualberta.ca",
    color: "#6c63ff",
  },
  {
    icon: <LinkedInIcon size={24} />,
    label: "LinkedIn",
    value: "Pranav Namah Satish",
    href: "https://www.linkedin.com/in/pranav-ns-/",
    color: "#00d4ff",
  },
  {
    icon: <GithubIcon size={24} />,
    label: "GitHub",
    value: "github.com/Pranav-ns",
    href: "https://github.com/Pranav-ns",
    color: "#00ffb3",
  },
  {
    icon: <InstagramIcon size={24} />,
    label: "Instagram",
    value: "@pranav._.ns",
    href: "https://www.instagram.com/pranav._.ns/",
    color: "#ff6584",
  },
  {
    icon: <Calendar size={24} />,
    label: "Meeting",
    value: "Schedule a chat",
    href: "https://calendly.com/pranav-ns",
    color: "#a855f7",
  },
  {
    icon: <Coffee size={24} />,
    label: "Coffee",
    value: "Buy me a coffee",
    href: "https://buymeacoffee.com/pranavns",
    color: "#f59e0b",
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
          <div className={`availability-badge ${styles.badge}`} style={{ margin: "0 auto 24px" }}>
            <span className="dot" />
            Available for 4, 8, 12-month internships
          </div>
          <h2 className="section-title">
            Let&apos;s build something <span className="text-gradient">together.</span>
          </h2>
          <p className="section-subtitle" style={{ maxWidth: "600px", margin: "0 auto" }}>
            Whether it&apos;s a full-stack role, cloud infrastructure, AI/ML, or DevOps — I&apos;m ready to contribute from day one. My inbox is always open.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {contactLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className={`glass-card ${styles.linkCard}`}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.cardGlow} style={{ background: link.color }} />
              <div className={styles.iconWrapper} style={{ color: link.color, backgroundColor: `${link.color}1A` }}>
                {link.icon}
              </div>
              <div className={styles.linkInfo}>
                <div className={styles.linkLabel}>{link.label}</div>
                <div className={styles.linkValue}>{link.value}</div>
              </div>
            </motion.a>
          ))}
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
