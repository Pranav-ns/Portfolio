import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AllProjectsPage() {
  return (
    <div className="section" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="glass-card glow-border" style={{ textAlign: "center", maxWidth: "600px", padding: "60px 40px", zIndex: 10 }}>
        <h1 className="section-title" style={{ marginBottom: "16px" }}>
          All <span className="text-gradient">Projects</span>
        </h1>
        <p className="section-subtitle" style={{ margin: "0 auto 40px", fontSize: "1.05rem" }}>
          This page is currently under development. Please come back later! Sorry for the inconvenience.
        </p>
        <Link href="/" className="btn-primary" style={{ display: "inline-flex" }}>
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
