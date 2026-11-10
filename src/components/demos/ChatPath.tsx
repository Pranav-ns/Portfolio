"use client";
import DemoFrame from "./DemoFrame";
import { useInView, usePrefersReducedMotion } from "../ui/useInView";
import { useSequence } from "./useSequence";
import styles from "./demos.module.css";

const CONVOS = [
  {
    ask: "I have spinach, eggs and feta. Dinner in 20 min?",
    reply: "Spinach & feta frittata. Wilt the spinach, pour in the eggs, crumble feta, finish under the grill for 5 min.",
  },
  {
    ask: "Something vegan with chickpeas?",
    reply: "Crispy chickpea wraps: roast with smoked paprika, then wrap with greens and a lemon-tahini drizzle.",
  },
];

const HOPS = ["cognito", "appsync", "bedrock"];
// steps: 0 idle, 1 ask, 2 cognito, 3 appsync, 4 bedrock, 5 reply (hold)
const DURATIONS = [500, 1100, 650, 650, 1300, 4200];

/** Papo AI: a question travels through auth → GraphQL → Bedrock and comes back as a recipe. */
export default function ChatPath() {
  const { ref, inView } = useInView<HTMLDivElement>({ repeat: true });
  const reduced = usePrefersReducedMotion();
  const { step, loop, restart } = useSequence(DURATIONS, inView, reduced);
  const convo = CONVOS[loop % CONVOS.length];

  return (
    <DemoFrame label="papo ai · request" onReplay={restart} frameRef={ref}>
      <div className={styles.chat}>
        <p className={`${styles.bubble} ${styles.user} ${step >= 1 ? styles.in : ""}`}>{convo.ask}</p>

        <ol className={styles.hops} aria-label="Request path">
          {HOPS.map((h, i) => {
            const at = step === i + 2;
            const done = step > i + 2;
            return (
              <li key={h} className={`${styles.hop} ${at ? styles.hopAt : ""} ${done ? styles.hopDone : ""}`}>
                {h}
              </li>
            );
          })}
        </ol>

        {step === 4 ? (
          <p className={`${styles.bubble} ${styles.bot} ${styles.in}`} aria-label="Thinking">
            <span className={styles.typing}><i /><i /><i /></span>
          </p>
        ) : (
          <p className={`${styles.bubble} ${styles.bot} ${step >= 5 ? styles.in : ""}`}>{convo.reply}</p>
        )}
      </div>
    </DemoFrame>
  );
}
