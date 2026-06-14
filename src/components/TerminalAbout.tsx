"use client";
import { useState, useEffect } from "react";
import styles from "./TerminalAbout.module.css";

export default function TerminalAbout() {
  const [lines, setLines] = useState(0);

  useEffect(() => {
    // Reveal a new terminal line every 800ms
    const timer = setInterval(() => {
      setLines((prev) => (prev < 8 ? prev + 1 : prev));
    }, 800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.terminal}>
      <div className={styles.header}>
        <div className={styles.macButtons}>
          <div className={styles.btnRed} />
          <div className={styles.btnYellow} />
          <div className={styles.btnGreen} />
        </div>
        <div className={styles.title}>pranav@macbook:~</div>
      </div>
      <div className={styles.body}>
        {/* Command 1 */}
        {lines >= 0 && (
          <div className={styles.line}>
            <span className={styles.prompt}>pranav@macbook:~$</span> ./hello.sh
          </div>
        )}
        {lines >= 1 && (
          <div className={styles.output}>
            Hello Pranav here 👋🏻, thank you for visiting my portfolio!
          </div>
        )}

        {/* Command 2 */}
        {lines >= 2 && (
          <div className={styles.line}>
            <span className={styles.prompt}>pranav@macbook:~$</span> cat roles.txt
          </div>
        )}
        {lines >= 3 && (
          <div className={styles.output}>
            <span className={styles.comment}># Roles I am interested in:</span>
            <br />
            - DevOps Engineer
            <br />
            - Cloud Engineer
            <br />
            - Cloud Architect
            <br />
            - Full Stack Developer
            <br />
            - AI/ML Engineer
          </div>
        )}

        {/* Command 3 */}
        {lines >= 4 && (
          <div className={styles.line}>
            <span className={styles.prompt}>pranav@macbook:~$</span> ./show_certs.sh
          </div>
        )}
        {lines >= 5 && (
          <div className={styles.output}>
            <span className={styles.comment}># Certifications (Working & Planned):</span>
            <br />
            [ ] AWS Cloud Practitioner
            <br />
            [ ] AWS AI Practitioner
            <br />
            [ ] AWS Solutions Architect Associate
            <br />
            [ ] K8s Certification
            <br />
            [ ] GitHub Administration Certification
            <br />
            [ ] FinOps Certification
          </div>
        )}

        {/* Command 4 */}
        {lines >= 6 && (
          <div className={styles.line}>
            <span className={styles.prompt}>pranav@macbook:~$</span> cat languages.json
          </div>
        )}
        {lines >= 7 && (
          <div className={styles.output}>
            <pre style={{ margin: 0, fontFamily: "inherit" }}>
{`{
  "English": "Fluent",
  "Hindi": "Fluent",
  "Telugu": "Fluent",
  "Kannada": "Fluent",
  "French": "Learning"
}`}
            </pre>
          </div>
        )}

        {/* Blinking cursor */}
        {lines >= 8 && (
          <div className={styles.line}>
            <span className={styles.prompt}>pranav@macbook:~$</span> <span className={styles.cursor}>█</span>
          </div>
        )}
      </div>
    </div>
  );
}
