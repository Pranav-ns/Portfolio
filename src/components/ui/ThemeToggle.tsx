"use client";
import { Moon, Sun } from "lucide-react";
import styles from "./ui.module.css";

// The initial theme is set before paint by the inline script in layout.tsx.
export default function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const current =
      root.dataset.theme ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage unavailable; theme still switches for this visit */
    }
  };

  return (
    <button type="button" onClick={toggle} className={styles.iconButton} aria-label="Toggle dark mode">
      <Sun size={16} className={styles.sun} aria-hidden="true" />
      <Moon size={16} className={styles.moon} aria-hidden="true" />
    </button>
  );
}
