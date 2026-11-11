"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Nimbus.module.css";

/**
 * Nimbus: a small cloud who lives in the corner of the page.
 * Eyes follow the pointer, it naps when ignored, pops hearts when petted,
 * does tricks, wears hats, and can be dragged around.
 */

type Mood = "idle" | "happy" | "sleep" | "trick";
type Trick = "jump" | "spin" | "rain" | "deploy";
const TRICKS: Trick[] = ["jump", "spin", "rain", "deploy"];
const HATS = ["none", "toque", "grad", "party", "headphones"] as const;
type Hat = (typeof HATS)[number];

const LINES = [
  "Hi! I'm Nimbus, Pranav's cloud. ☁️",
  "99.9% uptime, 100% fluffy.",
  "Pranav is open to 4, 8 or 12-month internships!",
  "Psst… try `sudo hire-pranav` in the terminal.",
  "It's cold in Edmonton. Good thing I'm a cloud.",
  "I run on AWS. Probably.",
  "Pet me. I don't bite. I drizzle.",
  "Drag me anywhere you like.",
];

const TRICK_LINES: Record<Trick, string> = {
  jump: "Boing!",
  spin: "Wheee!",
  rain: "Making it rain ☔",
  deploy: "Deploying to prod… ⚡ shipped!",
};

const HAT_LINES: Record<Hat, string> = {
  none: "Au naturel.",
  toque: "Edmonton winter mode.",
  grad: "Future UAlberta grad.",
  party: "It's a party in the cloud!",
  headphones: "Lo-fi beats to deploy to.",
};

const IDLE_TO_SLEEP = 25_000;

function readSaved<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}
function save(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable */
  }
}

export default function Nimbus() {
  const [mood, setMood] = useState<Mood>("idle");
  const [trick, setTrick] = useState<Trick | null>(null);
  const [hat, setHat] = useState<Hat>("none");
  const [say, setSay] = useState<string | null>(null);
  const [hearts, setHearts] = useState<number[]>([]);
  const [eye, setEye] = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [pos, setPos] = useState({ right: 24, bottom: 24 });

  const rootRef = useRef<HTMLDivElement>(null);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const drag = useRef<{ x: number; y: number; right: number; bottom: number; moved: boolean } | null>(null);
  const trickIndex = useRef(0);
  const lineIndex = useRef(0);

  // Restore hat, position and hidden state after mount.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setHat(readSaved<Hat>("nimbus.hat", "none"));
      setPos(readSaved("nimbus.pos", { right: 24, bottom: 24 }));
      setHidden(readSaved("nimbus.hidden", false));
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const speak = useCallback((text: string, ms = 2600) => {
    setSay(text);
    if (sayTimer.current) clearTimeout(sayTimer.current);
    sayTimer.current = setTimeout(() => setSay(null), ms);
  }, []);

  const poke = useCallback(() => {
    setMood((m) => (m === "sleep" ? "idle" : m));
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => {
      setMood("sleep");
      setOpen(false);
    }, IDLE_TO_SLEEP);
  }, []);

  // Eyes follow the pointer; any movement keeps Nimbus awake.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      poke();
      const el = rootRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const d = Math.hypot(dx, dy) || 1;
      const k = Math.min(1, d / 220);
      setEye({ x: (dx / d) * 3.2 * k, y: (dy / d) * 2.6 * k });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("keydown", poke);
    window.addEventListener("scroll", poke, { passive: true });
    idleTimer.current = setTimeout(() => setMood("sleep"), IDLE_TO_SLEEP);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("keydown", poke);
      window.removeEventListener("scroll", poke);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [poke]);

  // Random blinking.
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const loop = () => {
      t = setTimeout(() => {
        setBlink(true);
        setTimeout(() => setBlink(false), 140);
        loop();
      }, 2400 + Math.random() * 3200);
    };
    loop();
    return () => clearTimeout(t);
  }, []);

  // Say hello once, shortly after the page loads.
  useEffect(() => {
    const t = setTimeout(() => speak(LINES[0], 3200), 1800);
    return () => clearTimeout(t);
  }, [speak]);

  const doTrick = useCallback(
    (which?: Trick) => {
      const t = which ?? TRICKS[trickIndex.current++ % TRICKS.length];
      setMood("trick");
      setTrick(t);
      speak(TRICK_LINES[t]);
      setTimeout(
        () => {
          setTrick(null);
          setMood("idle");
        },
        t === "rain" || t === "deploy" ? 1900 : 900,
      );
      poke();
    },
    [poke, speak],
  );

  // Let other parts of the page (like the terminal) ask for a trick.
  useEffect(() => {
    const onTrick = () => {
      setHidden(false);
      doTrick();
    };
    window.addEventListener("nimbus:trick", onTrick);
    return () => window.removeEventListener("nimbus:trick", onTrick);
  }, [doTrick]);

  const pet = () => {
    poke();
    setMood("happy");
    const id = Date.now();
    setHearts((h) => [...h.slice(-5), id]);
    setTimeout(() => setHearts((h) => h.filter((x) => x !== id)), 1100);
    setTimeout(() => setMood((m) => (m === "happy" ? "idle" : m)), 900);
  };

  const cycleHat = () => {
    const next = HATS[(HATS.indexOf(hat) + 1) % HATS.length];
    setHat(next);
    save("nimbus.hat", next);
    speak(HAT_LINES[next]);
    poke();
  };

  const chat = () => {
    lineIndex.current = (lineIndex.current % (LINES.length - 1)) + 1;
    speak(LINES[lineIndex.current], 3400);
    poke();
  };

  const hide = (value: boolean) => {
    setHidden(value);
    setOpen(false);
    save("nimbus.hidden", value);
  };

  // Dragging: pointer down on the body, move to reposition, a click if it barely moved.
  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY, right: pos.right, bottom: pos.bottom, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (!d.moved && Math.hypot(dx, dy) < 5) return;
    d.moved = true;
    const maxR = window.innerWidth - 110;
    const maxB = window.innerHeight - 110;
    setPos({
      right: Math.max(8, Math.min(maxR, d.right - dx)),
      bottom: Math.max(8, Math.min(maxB, d.bottom - dy)),
    });
  };
  const onPointerUp = () => {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    if (d.moved) {
      save("nimbus.pos", pos);
      speak("New spot. Cozy.");
    } else {
      pet();
      setOpen(true);
    }
  };

  if (hidden) {
    return (
      <button type="button" className={styles.summon} onClick={() => hide(false)} aria-label="Bring back Nimbus the pet cloud">
        ☁️
      </button>
    );
  }

  const sleeping = mood === "sleep";
  const happy = mood === "happy";

  return (
    <div
      ref={rootRef}
      className={styles.root}
      style={{ right: pos.right, bottom: pos.bottom }}
      onMouseLeave={() => setOpen(false)}
    >
      {say && !sleeping && (
        <p className={styles.bubble} role="status">
          {say}
        </p>
      )}

      {open && !sleeping && (
        <div className={styles.menu} role="toolbar" aria-label="Play with Nimbus">
          <button type="button" onClick={() => doTrick()}>Trick</button>
          <button type="button" onClick={cycleHat}>Hat</button>
          <button type="button" onClick={chat}>Talk</button>
          <button type="button" onClick={() => hide(true)} aria-label="Hide Nimbus">×</button>
        </div>
      )}

      <button
        type="button"
        className={`${styles.pet} ${trick ? styles[trick] : ""} ${sleeping ? styles.sleeping : ""}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            pet();
            setOpen((o) => !o);
          }
        }}
        aria-label="Nimbus, a pet cloud. Click to pet and play, drag to move."
      >
        <svg viewBox="0 0 120 96" className={styles.svg} aria-hidden="true">
          {/* shadow */}
          <ellipse cx="60" cy="90" rx="30" ry="4" className={styles.shadow} />

          <g className={styles.body}>
            {/* cloud body */}
            <path
              d="M28 74c-11 0-19-8-19-18 0-9 7-17 16-18 1-13 12-23 25-23 9 0 17 5 21 12 3-2 7-3 11-3 12 0 21 9 21 21 0 1 0 2-1 3 8 2 13 9 13 16 0 6-6 10-12 10H28z"
              className={styles.cloud}
            />

            {/* cheeks */}
            <ellipse cx="38" cy="58" rx="6" ry="3.5" className={styles.cheek} />
            <ellipse cx="82" cy="58" rx="6" ry="3.5" className={styles.cheek} />

            {/* eyes */}
            {sleeping || happy ? (
              <g className={styles.closed}>
                {sleeping ? (
                  <>
                    <path d="M40 50 q5 4 10 0" />
                    <path d="M70 50 q5 4 10 0" />
                  </>
                ) : (
                  <>
                    <path d="M40 52 q5 -6 10 0" />
                    <path d="M70 52 q5 -6 10 0" />
                  </>
                )}
              </g>
            ) : (
              <g>
                <ellipse cx="45" cy="49" rx="5" ry={blink ? 0.8 : 6} className={styles.eye} />
                <ellipse cx="75" cy="49" rx="5" ry={blink ? 0.8 : 6} className={styles.eye} />
                {!blink && (
                  <>
                    <circle cx={46.5 + eye.x} cy={47 + eye.y} r="1.8" className={styles.glint} />
                    <circle cx={76.5 + eye.x} cy={47 + eye.y} r="1.8" className={styles.glint} />
                  </>
                )}
              </g>
            )}

            {/* mouth */}
            {sleeping ? (
              <circle cx="60" cy="61" r="2" className={styles.mouthO} />
            ) : (
              <path d={happy || trick ? "M53 59 q7 8 14 0" : "M55 60 q5 4 10 0"} className={styles.mouth} />
            )}

            {/* hats */}
            {hat === "toque" && (
              <g>
                <path d="M34 24 q26 -30 52 0 z" fill="#e5484d" stroke="#1b1b1f" strokeWidth="2.5" strokeLinejoin="round" />
                <rect x="31" y="20" width="58" height="10" rx="5" fill="#f4f1ea" stroke="#1b1b1f" strokeWidth="2.5" />
                <circle cx="60" cy="3" r="6" fill="#f4f1ea" stroke="#1b1b1f" strokeWidth="2.5" />
              </g>
            )}
            {hat === "grad" && (
              <g>
                <rect x="47" y="14" width="26" height="9" rx="2" fill="#1b1b1f" />
                <path d="M34 14 L60 4 L86 14 L60 22 Z" fill="#1b1b1f" />
                <path d="M84 14 v12" stroke="#f5b301" strokeWidth="2" />
                <circle cx="84" cy="27" r="2.5" fill="#f5b301" />
              </g>
            )}
            {hat === "party" && (
              <g>
                <path d="M50 22 L60 -2 L70 22 Z" fill="#7c5cff" stroke="#1b1b1f" strokeWidth="2.5" strokeLinejoin="round" />
                <circle cx="56" cy="14" r="1.8" fill="#ffd23f" />
                <circle cx="63" cy="8" r="1.8" fill="#3ddc97" />
                <circle cx="60" cy="-3" r="3.5" fill="#ff6b9a" stroke="#1b1b1f" strokeWidth="2" />
              </g>
            )}
            {hat === "headphones" && (
              <g fill="none" stroke="#1b1b1f" strokeWidth="3" strokeLinecap="round">
                <path d="M22 44 q38 -44 76 0" />
                <rect x="14" y="40" width="12" height="18" rx="5" fill="#3ddc97" />
                <rect x="94" y="40" width="12" height="18" rx="5" fill="#3ddc97" />
              </g>
            )}
          </g>

          {/* rain trick */}
          {trick === "rain" && (
            <g className={styles.rain}>
              {[30, 44, 58, 72, 86].map((x, i) => (
                <path key={x} d={`M${x} 78 l-2 8`} style={{ animationDelay: `${i * 90}ms` }} />
              ))}
            </g>
          )}
          {/* deploy trick */}
          {trick === "deploy" && <path d="M64 70 l-8 12 h7 l-5 12 l12 -16 h-7 l5 -8z" className={styles.bolt} />}
        </svg>

        {sleeping && (
          <span className={styles.zzz} aria-hidden="true">
            <i>z</i>
            <i>z</i>
            <i>Z</i>
          </span>
        )}
        {hearts.map((h, i) => (
          <span key={h} className={styles.heart} style={{ left: `${40 + ((i * 17) % 30)}%` }} aria-hidden="true">
            ♥
          </span>
        ))}
      </button>
    </div>
  );
}
