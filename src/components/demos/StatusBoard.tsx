"use client";
import { useEffect, useState } from "react";
import DemoFrame from "./DemoFrame";
import { useInView, usePrefersReducedMotion } from "../ui/useInView";
import styles from "./demos.module.css";

const BARS = 32;
const BUDGET = 2; // seconds
const MAX = 2.6;

// Deterministic starting data so server and client render the same thing.
const seed = Array.from({ length: BARS }, (_, i) => 1.1 + 0.35 * Math.abs(Math.sin(i * 1.7)));

/** CaterBridge: a little ops board with page-load latency ticking along under the 2s budget. */
export default function StatusBoard() {
  const { ref, inView } = useInView<HTMLDivElement>({ repeat: true });
  const reduced = usePrefersReducedMotion();
  const [bars, setBars] = useState(seed);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;
    const id = setInterval(() => {
      setTick((t) => t + 1);
      setBars((prev) => {
        const next = prev.slice(1);
        next.push(0.95 + Math.random() * 0.75);
        return next;
      });
    }, 650);
    return () => clearInterval(id);
  }, [inView, reduced]);

  // Every 14 ticks a spike lands and an alert fires, then clears.
  const phase = tick % 14;
  const spiking = phase >= 9 && phase <= 12;
  const shown = spiking ? [...bars.slice(0, -1), 2.35] : bars;
  const latest = shown[shown.length - 1];
  const p50 = [...bars].sort((a, b) => a - b)[Math.floor(bars.length / 2)];

  const services = [
    { name: "web", state: "online" },
    { name: "api", state: spiking ? "slow" : "online" },
    { name: "payments", state: "online" },
  ];

  return (
    <DemoFrame label="caterbridge · ops" frameRef={ref}>
      <div className={styles.stats}>
        <div>
          <span className={styles.statValue}>{p50.toFixed(2)}s</span>
          <span className={styles.statLabel}>p50 load</span>
        </div>
        <div>
          <span className={styles.statValue}>99.9%</span>
          <span className={styles.statLabel}>uptime</span>
        </div>
        <div>
          <span className={`${styles.statValue} ${spiking ? styles.warn : ""}`}>{spiking ? 1 : 0}</span>
          <span className={styles.statLabel}>open alerts</span>
        </div>
      </div>

      <svg className={styles.chart} viewBox={`0 0 ${BARS * 8} 72`} preserveAspectRatio="none" role="img" aria-label={`Latest page load ${latest.toFixed(2)} seconds`}>
        <line x1="0" x2={BARS * 8} y1={72 - (BUDGET / MAX) * 72} y2={72 - (BUDGET / MAX) * 72} className={styles.budget} />
        {shown.map((v, i) => {
          const h = (v / MAX) * 72;
          return (
            <rect
              key={i}
              x={i * 8 + 1}
              y={72 - h}
              width={6}
              height={h}
              rx={1.5}
              className={v > BUDGET ? styles.barHot : i === shown.length - 1 ? styles.barNow : styles.col}
            />
          );
        })}
      </svg>
      <div className={styles.chartLegend}>
        <span>page load, last 20s</span>
        <span>— 2s budget</span>
      </div>

      <ul className={styles.services}>
        {services.map((s) => (
          <li key={s.name}>
            <span className={`${styles.dot} ${s.state !== "online" ? styles.dotWarn : ""}`} aria-hidden="true" />
            <span>{s.name}</span>
            <span className={styles.dim}>{s.state}</span>
          </li>
        ))}
      </ul>

      <p className={`${styles.toast} ${spiking ? styles.toastShow : ""}`} aria-live="polite">
        {spiking ? "⚠ api p95 over budget → alert sent to Grafana" : "all checks passing"}
      </p>
    </DemoFrame>
  );
}
