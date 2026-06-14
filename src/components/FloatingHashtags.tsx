"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const rawHashtags = [
  "#Ambitious", "#Curious", "#HardWorking", "#SmartWorker", "#ProblemSolver", 
  "#LifelongLearner", "#Adaptable", "#Resilient", "#Innovative", "#AnalyticalThinker", 
  "#Collaborative", "#Leader", "#Mentor", "#Reliable", "#Creative", "#Driven", 
  "#Funny", "#Friendly", "#OpenMinded", "#GrowthMindset", "#AIForGood", 
  "#ScalableSystems", "#CloudNative", "#IntelligentSystems", "#Mentorship", 
  "#CommunityBuilding", "#Builder", "#TechLeader", "#ResearchDriven", 
  "#ContinuousLearner", "#Innovation", "#AIEngineering", "#MachineLearning", 
  "#CloudComputing", "#AWS", "#MLOps", "#DevOps", "#FullStackDevelopment", 
  "#SoftwareEngineering", "#Docker", "#Kubernetes", "#LLMs", "#GenerativeAI"
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
    const cols = 4; // 4 columns horizontally
    const rows = Math.ceil(hashtags.length / cols);
    
    const mapped = hashtags.map((tag, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      
      // Calculate base percentage positions
      // X varies from 5% to 95%
      const baseX = (col / cols) * 100 + (100 / cols) / 2;
      // Y varies from 5% to 95%
      const baseY = (row / rows) * 100 + (100 / rows) / 2;
      
      // Add random jitter to break the rigid grid look (-10% to 10% for X, -5% to 5% for Y)
      const x = baseX + (Math.random() * 20 - 10);
      const y = baseY + (Math.random() * 10 - 5);
      
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
        position: "absolute", 
        top: 0, 
        left: 0, 
        width: "100%", 
        height: "100%", 
        overflow: "hidden", 
        zIndex: -10, 
        pointerEvents: "none" 
      }}
    >
      {tags.map((tag, i) => (
        <motion.div
          key={i}
          initial={{ y: 0, x: 0 }}
          animate={{ 
            y: [0, -40, 0, 40, 0],
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
            left: `${Math.max(5, Math.min(95, tag.x))}%`, // keep within screen bounds roughly
            top: `${Math.max(2, Math.min(98, tag.y))}%`,
            color: "var(--text-muted)", // Use theme's muted text color
            opacity: 0.15, // Extremely faint
            fontSize: "0.85rem",
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
