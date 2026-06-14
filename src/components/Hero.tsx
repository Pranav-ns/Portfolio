"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, Mail } from "lucide-react";
import { GithubIcon, LinkedInIcon } from "@/components/Icons";
import Image from "next/image";
import styles from "./Hero.module.css";

const roles = [
  "Full-Stack Developer",
  "AI / ML Engineer",
  "Cloud Architect",
  "DevOps Engineer",
];

function useTypewriter(words: string[], speed = 80, pause = 2000) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && text === current) {
      timeout = setTimeout(() => setIsDeleting(true), pause);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    } else {
      const delta = isDeleting ? speed / 2 : speed;
      timeout = setTimeout(() => {
        setText(isDeleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
      }, delta);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, speed, pause]);

  return text;
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const displayText = useTypewriter(roles);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const PARTICLE_COUNT = 90;
    type Particle = {
      x: number; y: number;
      vx: number; vy: number;
      radius: number; alpha: number;
      color: string;
    };

    const palette = ["rgba(108,99,255,", "rgba(0,212,255,", "rgba(255,101,132,", "rgba(0,255,179,"];
    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.6 + 0.2,
      color: palette[Math.floor(Math.random() * palette.length)],
    }));

    let mouseX = -9999, mouseY = -9999;
    const onMouse = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; };
    window.addEventListener("mousemove", onMouse);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const dx = mouseX - p.x, dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          p.vx -= (dx / dist) * 0.02;
          p.vy -= (dy / dist) * 0.02;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(108,99,255,${0.08 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className={styles.hero}>
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />

      {/* Orbs */}
      <div className={`bg-orb bg-orb-purple ${styles.orb1}`} />
      <div className={`bg-orb bg-orb-cyan ${styles.orb2}`} />
      <div className={`bg-orb bg-orb-pink ${styles.orb3}`} />

      <div className={`container ${styles.content}`}>
        {/* Left: Text */}
        <div className={styles.textSide}>
          <div className="availability-badge" style={{ marginBottom: "28px" }}>
            <span className="dot" />
            Available for 4, 8, 12-month internships
          </div>

          <p className={`font-mono ${styles.greeting}`}>
            <span style={{ color: "var(--accent-secondary)" }}>👋</span> Hi, I&apos;m
          </p>

          <h1 className={`shimmer-text ${styles.name}`}>
            Pranav Namah Satish
          </h1>

          <div className={styles.roleRow}>
            <span className={styles.rolePrefix}>I build</span>
            <span className={`text-gradient ${styles.roleText}`}>{displayText}</span>
            <span className={styles.cursor}>|</span>
          </div>

          <p className={styles.bio}>
            BSc Computing Science (AI) student at the{" "}
            <span style={{ color: "var(--accent-secondary)" }}>University of Alberta</span>.
            Skilled in React, Node.js, Python, Docker, Kubernetes, and cloud-native systems.
            Seeking Software Engineering, Cloud, or AI/ML roles.
          </p>

          <div className={styles.ctaRow}>
            <a href="mailto:pns@ualberta.ca" className="btn-primary">
              <Mail size={16} /> Get In Touch
            </a>
            <a
              href="https://github.com/Pranav-ns"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <GithubIcon size={16} /> View GitHub
            </a>
          </div>

          <div className={styles.socials}>
            <a href="https://github.com/Pranav-ns" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="GitHub">
              <GithubIcon size={18} />
            </a>
            <a href="https://linkedin.com/in/pranav-namah-satish" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
              <LinkedInIcon size={18} />
            </a>
            <a href="mailto:pns@ualberta.ca" className={styles.socialLink} aria-label="Email">
              <Mail size={18} />
            </a>
            <span className={styles.socialDivider} />
            <span className={styles.socialInfo}>Bangalore · Edmonton</span>
          </div>
        </div>

        {/* Right: Photo Card */}
        <div className={styles.photoSide}>
          <div className={`float ${styles.photoWrapper}`}>
            <div className={`animated-border ${styles.photoBorder}`}>
              <div className={styles.photoInner}>
                <Image
                  src="/pranav.jpg"
                  alt="Pranav Namah Satish"
                  width={320}
                  height={380}
                  className={styles.photo}
                  priority
                />
              </div>
            </div>

            {/* Floating badges */}
            <div className={`glass-card-sm float-delayed ${styles.badge1}`}>
              <span style={{ fontSize: "1.2rem" }}>🏆</span>
              <div>
                <div style={{ fontSize: "0.78rem", fontWeight: 600 }}>Maple Leaf Award</div>
                <div style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>$10,000 · 2025</div>
              </div>
            </div>

            <div className={`glass-card-sm float ${styles.badge2}`}>
              <span style={{ fontSize: "1.2rem" }}>☁️</span>
              <div>
                <div style={{ fontSize: "0.78rem", fontWeight: 600 }}>AWS Certified</div>
                <div style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>Cloud & DevOps</div>
              </div>
            </div>

            <div className={`glass-card-sm float-delayed ${styles.badge3}`}>
              <span style={{ fontSize: "1.2rem" }}>🤖</span>
              <div>
                <div style={{ fontSize: "0.78rem", fontWeight: 600 }}>AI Engineering</div>
                <div style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>Gemini · Bedrock</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button className={`scroll-indicator ${styles.scrollIndicator}`} onClick={scrollToAbout} aria-label="Scroll to about section">
        <span className="scroll-line" />
        <ArrowDown size={14} />
        <span>scroll</span>
      </button>
    </section>
  );
}
