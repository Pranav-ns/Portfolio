"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const rawHashtags = [
  "#ResearchDriven", "#ContinuousLearner", "#Innovation", "#AIEngineering", "#MachineLearning",
  "#CloudComputing", "#AWS", "#MLOps", "#DevOps", "#FullStackDevelopment", "#SoftwareEngineering",
  "#Docker", "#Kubernetes", "#LLMs", "#GenerativeAI", "#Funny", "#Friendly", "#Ambitious",
  "#HardWorking", "#SmartWorking", "#Confident", "#Curious", "#Creative", "#Motivated",
  "#Positive", "#Reliable", "#Helpful", "#Honest", "#Dedicated", "#Passionate", "#Focused",
  "#Adaptable", "#TeamPlayer", "#QuickLearner", "#Responsible", "#Optimistic", "#Respectful",
  "#Determined", "#Outgoing", "#Enthusiastic", "#Disciplined", "#Supportive", "#OpenMinded",
  "#SelfMotivated", "#EasyGoing", "#Driven", "#SmartWorker", "#TechEnthusiast", "#AIBuilder",
  "#CloudLearner", "#ProblemSolver", "#FastLearner", "#Innovative", "#Resourceful", "#CareerFocused",
  "#GoalOriented", "#Analytical", "#CreativeThinker", "#Persistent", "#Collaborative",
  "#NetworkingPro", "#LeadershipPotential", "#GrowthMindset", "#Entrepreneurial", "#DevOpsMindset",
  "#LifelongLearner"
];

// Remove duplicates
const hashtags = Array.from(new Set(rawHashtags));

type TagData = {
  text: string;
  x: number;
  y: number;
  duration: number;
  delay: number;
  driftX: number;
};

export default function FloatingHashtags() {
  const [tags, setTags] = useState<TagData[]>([]);

  useEffect(() => {
    // To prevent overcrowding, we scatter them across the entire scrollable height of the page.
    // We treat the area as a grid of (cols x rows)
    const cols = 5; // 5 columns horizontally
    const rows = Math.ceil(hashtags.length / cols);
    
    const mapped = hashtags.map((tag, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      
      // Calculate base percentage positions
      // X varies from 0% to 100%
      const baseX = (col / cols) * 100 + (100 / cols) / 2;
      // Y varies from 0% to 100%
      const baseY = (row / rows) * 100 + (100 / rows) / 2;
      
      // Add random jitter (-15% to 15% for X, -8% to 8% for Y)
      const x = baseX + (Math.random() * 30 - 15);
      const y = baseY + (Math.random() * 16 - 8);
      
      // Randomize animation params
      const duration = 20 + Math.random() * 20; // 20s to 40s
      const delay = Math.random() * -30; // Start at different times
      const driftX = (Math.random() > 0.5 ? 1 : -1) * (15 + Math.random() * 20); // Drift 15-35px left or right

      return { text: tag, x, y, duration, delay, driftX };
    });
    
    setTags(mapped);
  }, []);

  return (
    <div 
      style={{ 
        position: "fixed", 
        top: 0, 
        left: 0, 
        width: "100vw", 
        height: "100vh", 
        overflow: "hidden", 
        zIndex: -1, 
        pointerEvents: "none" 
      }}
    >
      {tags.map((tag, i) => (
        <motion.div
          key={i}
          initial={{ y: 0, x: 0 }}
          animate={{ 
            y: [0, -30, 0, 30, 0],
            x: [0, tag.driftX, 0, -tag.driftX, 0]
          }}
          transition={{
            duration: tag.duration,
            delay: tag.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            left: `${Math.max(2, Math.min(98, tag.x))}%`, 
            top: `${Math.max(2, Math.min(98, tag.y))}%`,
            color: "rgba(255, 255, 255, 0.08)", // Light grey, slightly more visible
            fontSize: "0.85rem",
            fontWeight: 500,
            fontFamily: "var(--font-mono)",
            whiteSpace: "nowrap",
            transform: "translate(-50%, -50%)",
            userSelect: "none",
          }}
        >
          {tag.text}
        </motion.div>
      ))}
    </div>
  );
}
