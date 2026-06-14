"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import styles from "./Navbar.module.css";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navLinks.map((l) => l.href.slice(1));
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setMenuOpen(false);
    const id = href.slice(1);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      ref={navRef}
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}
      role="banner"
    >
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <Link href="#hero" className={styles.logo} onClick={() => handleLinkClick("#hero")}>
          <span className="text-gradient">PNS</span>
          <span className={styles.logoDot} />
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.desktopNav} role="navigation" aria-label="Main navigation">
          {navLinks.map((link) => (
            <button
              key={link.href}
              className={`${styles.navLink} ${activeSection === link.href.slice(1) ? styles.active : ""}`}
              onClick={() => handleLinkClick(link.href)}
            >
              {link.label}
              <span className={styles.navLinkLine} />
            </button>
          ))}
          <div style={{ display: "flex", gap: "12px", marginLeft: "16px" }}>
            <Link
              href="/blogs"
              className="btn-secondary"
              style={{ padding: "10px 22px", fontSize: "0.85rem" }}
            >
              Blogs
            </Link>
            <Link
              href="/games"
              className="btn-primary"
              style={{ padding: "10px 22px", fontSize: "0.85rem" }}
            >
              Games
            </Link>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <button
          className={styles.mobileToggle}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}>
        <nav role="navigation" aria-label="Mobile navigation">
          {navLinks.map((link, i) => (
            <button
              key={link.href}
              className={`${styles.mobileLink} ${activeSection === link.href.slice(1) ? styles.active : ""}`}
              onClick={() => handleLinkClick(link.href)}
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <span className="font-mono" style={{ color: "var(--accent-secondary)", fontSize: "0.8rem" }}>0{i + 1}.</span>
              {link.label}
            </button>
          ))}
          <div style={{ display: "flex", gap: "12px", marginTop: "16px", justifyContent: "center" }}>
            <Link
              href="/blogs"
              className="btn-secondary"
              onClick={() => setMenuOpen(false)}
            >
              Blogs
            </Link>
            <Link
              href="/games"
              className="btn-primary"
              onClick={() => setMenuOpen(false)}
            >
              Games
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
