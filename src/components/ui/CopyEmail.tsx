"use client";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import styles from "./ui.module.css";

export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <span className={styles.emailRow}>
      <a href={`mailto:${email}`} className={styles.email}>
        {email}
      </a>
      <button type="button" onClick={copy} className={styles.copyButton} aria-label="Copy email address">
        {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
        <span>{copied ? "Copied" : "Copy"}</span>
      </button>
    </span>
  );
}
