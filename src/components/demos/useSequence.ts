"use client";
import { useEffect, useState } from "react";

/**
 * Steps through `durations` (ms per step) while `active`, looping forever.
 * Returns the current step and a loop counter. With reduced motion it jumps to the last step.
 */
export function useSequence(durations: number[], active: boolean, reduced: boolean) {
  const [step, setStep] = useState(0);
  const [loop, setLoop] = useState(0);
  const last = durations.length - 1;

  useEffect(() => {
    if (reduced || !active) return;
    const id = setTimeout(() => {
      if (step >= last) {
        setStep(0);
        setLoop((l) => l + 1);
      } else {
        setStep(step + 1);
      }
    }, durations[step]);
    return () => clearTimeout(id);
  }, [step, active, reduced, durations, last]);

  const restart = () => {
    setStep(0);
    setLoop((l) => l + 1);
  };

  return { step: reduced ? last : step, loop, restart };
}
