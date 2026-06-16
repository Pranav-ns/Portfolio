"use client";
import { ArrowDown, Mail } from "lucide-react";
import { GithubIcon, LinkedInIcon, InstagramIcon } from "@/components/Icons";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import styles from "./Hero.module.css";

export default function Hero() {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className={styles.hero}>
      <div className={`container ${styles.content}`}>
        <div className={styles.textSide}>
          <div className={styles.statusBadge}>
            <span className={styles.statusDot} />
            <span className={styles.statusText}>Available for 4, 8, 12-month internships</span>
          </div>

          <h1 className={styles.name}>
            Pranav Namah Satish
          </h1>

          <h2 className={styles.title} style={{ minHeight: "1.2em", display: "flex", alignItems: "center" }}>
            <TypeAnimation
              sequence={[
                "Software Engineer",
                2000,
                "AI Engineer",
                2000,
                "Cloud Architect",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h2>

          <p className={styles.bio}>
            BSc Computing Science (AI) student at the University of Alberta.
            Skilled in React, Node.js, Python, Docker, Kubernetes, and cloud-native systems.
          </p>

          <div className={styles.ctaRow}>
            <a href="mailto:pns@ualberta.ca" className={styles.primaryBtn}>
              <Mail size={16} /> Contact Me
            </a>
            <a
              href="https://github.com/Pranav-ns"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondaryBtn}
            >
              <GithubIcon size={16} /> GitHub
            </a>
          </div>

          <div className={styles.socials}>
            <a href="https://www.linkedin.com/in/pranav-ns-/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
              <LinkedInIcon size={18} />
            </a>
            <a href="https://www.instagram.com/pranav._.ns/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Instagram">
              <InstagramIcon size={18} />
            </a>
            <span className={styles.socialDivider} />
            <span className={styles.socialInfo}>Edmonton, AB</span>
          </div>
        </div>

        <div className={styles.photoSide}>
          <div className={styles.photoWrapper}>
            <div className={styles.photoRing} />
            <Image
              src="/pranav-profile.jpg"
              alt="Pranav Namah Satish"
              width={420}
              height={420}
              className={styles.photo}
              priority
            />
          </div>
        </div>
      </div>

      <button className={styles.scrollIndicator} onClick={scrollToAbout} aria-label="Scroll to about section">
        <span className={styles.scrollLine} />
        <ArrowDown size={14} className={styles.scrollIcon} />
      </button>
    </section>
  );
}
