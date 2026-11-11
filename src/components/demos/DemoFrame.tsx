"use client";
import { RotateCcw } from "lucide-react";
import styles from "./demos.module.css";

export default function DemoFrame({
  label,
  onReplay,
  children,
  frameRef,
}: {
  label: string;
  onReplay?: () => void;
  children: React.ReactNode;
  frameRef?: React.Ref<HTMLDivElement>;
}) {
  // A soft spotlight follows the pointer across the panel.
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div className={styles.frame} ref={frameRef} onPointerMove={onMove}>
      <div className={styles.bar}>
        <span className={styles.live}>
          <span className={styles.liveDot} aria-hidden="true" />
          {label}
        </span>
        {onReplay && (
          <button type="button" className={styles.replay} onClick={onReplay} aria-label="Replay demo">
            <RotateCcw size={12} aria-hidden="true" />
          </button>
        )}
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
}
