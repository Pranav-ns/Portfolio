"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number;
    const move = (e: MouseEvent) => {
      raf = requestAnimationFrame(() => {
        if (ref.current) {
          ref.current.style.background = `radial-gradient(550px circle at ${e.clientX}px ${e.clientY}px, color-mix(in srgb, var(--violet-dim) 7%, transparent), transparent 40%)`;
        }
      });
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        background: "transparent",
        pointerEvents: "none",
      }}
    />
  );
}
