import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GithubIcon } from "@/components/Icons";

export default function DemoPendingPage() {
  return (
    <div className="section" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="glass-card glow-border" style={{ textAlign: "center", maxWidth: "600px", padding: "60px 40px", zIndex: 10 }}>
        <h1 className="section-title" style={{ marginBottom: "16px" }}>
          Live <span className="text-gradient">Demo</span>
        </h1>
        <p className="section-subtitle" style={{ margin: "0 auto 20px", fontSize: "1.05rem" }}>
          This project's live demo is currently under development. Please come back later! Sorry for the inconvenience.
        </p>
        <p style={{ margin: "0 auto 40px", color: "var(--text-muted)", fontSize: "0.95rem" }}>
          Or please visit my GitHub to check it out!
        </p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
          <Link href="/" className="btn-secondary" style={{ display: "inline-flex" }}>
            <ArrowLeft size={18} />
            Back to Home
          </Link>
          <a
            href="https://github.com/Pranav-ns"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ display: "inline-flex" }}
          >
            <GithubIcon size={18} />
            GitHub Profile
          </a>
        </div>
      </div>
    </div>
  );
}
