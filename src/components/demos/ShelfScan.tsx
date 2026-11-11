"use client";
import DemoFrame from "./DemoFrame";
import { useInView, usePrefersReducedMotion } from "../ui/useInView";
import { useSequence } from "./useSequence";
import styles from "./demos.module.css";

// x, width, height, hue for each spine on the shelf
const SPINES = [
  [6, 14, 58, 12], [21, 10, 50, 200], [32, 16, 62, 150], [49, 12, 46, 30],
  [62, 18, 60, 340], [81, 10, 54, 220], [92, 14, 40, 90], [107, 12, 58, 260],
  [120, 16, 52, 10], [137, 10, 62, 180], [148, 14, 48, 45], [163, 12, 56, 300],
];

const PICKS = [
  "Designing Data-Intensive Applications",
  "The Pragmatic Programmer",
  "Thinking, Fast and Slow",
];

// steps: 0 shelf, 1 scanning, 2 boxes, 3 enrich, 4 picks (hold)
const DURATIONS = [700, 1500, 1300, 1100, 4200];

/** ShelfOut: scan a shelf photo, find the spines, then suggest what to read next. */
export default function ShelfScan() {
  const { ref, inView } = useInView<HTMLDivElement>({ repeat: true });
  const reduced = usePrefersReducedMotion();
  const { step, loop, restart } = useSequence(DURATIONS, inView, reduced);

  const status = ["shelf.jpg", "scanning…", `${SPINES.length} spines found`, "enriching metadata…", "ranked for you"][step];

  return (
    <DemoFrame label="shelfout · pipeline" onReplay={restart} frameRef={ref}>
      <svg className={styles.shelf} viewBox="0 0 182 72" role="img" aria-label="A bookshelf being scanned">
        {SPINES.map(([x, w, h, hue], i) => (
          <g key={i}>
            <rect
              x={x} y={66 - h} width={w} height={h} rx={1.5}
              style={{ fill: `hsl(${hue} 26% var(--spine-l))` }}
            />
            <rect
              x={x - 1} y={65 - h} width={w + 2} height={h + 2} rx={2}
              className={styles.box}
              style={{
                opacity: step >= 2 ? 1 : 0,
                transitionDelay: step >= 2 ? `${i * 60}ms` : "0ms",
              }}
            />
          </g>
        ))}
        <rect x="0" y="66" width="182" height="4" className={styles.plank} />
        {step === 1 && <rect key={loop} x="0" y="0" width="3" height="66" className={styles.scan} />}
      </svg>

      <p className={styles.shelfStatus}>
        <span className={styles.prompt}>›</span> {status}
      </p>

      <ol className={styles.picks}>
        {PICKS.map((p, i) => (
          <li
            key={p}
            className={step >= 4 ? styles.in : ""}
            style={{ transitionDelay: step >= 4 ? `${i * 140}ms` : "0ms" }}
          >
            <span className={styles.rank}>{i + 1}</span>
            {p}
          </li>
        ))}
      </ol>
    </DemoFrame>
  );
}
