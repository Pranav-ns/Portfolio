"use client";

import { useEffect, useRef } from "react";

export default function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Function to set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();

    // Matrix characters
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
    const fontSize = 14;
    const columns = Math.max(1, Math.floor(canvas.width / fontSize));

    const drops: number[] = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = 1 + Math.random() * 50; // Add some initial random stagger
    }

    const draw = () => {
      // Create trailing effect by drawing semi-transparent dark background
      ctx.fillStyle = "rgba(2, 2, 4, 0.05)"; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        
        // Matrix green with slight variation in opacity for depth
        ctx.fillStyle = `rgba(0, 255, 179, ${Math.random() * 0.4 + 0.1})`;
        
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop randomly when it goes off screen
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33); // ~30fps

    window.addEventListener("resize", setCanvasSize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.15 }}
    />
  );
}
