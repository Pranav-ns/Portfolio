// All page content lives here so it can be edited without touching layout code.

export const profile = {
  name: "Pranav Namah Satish",
  shortName: "Pranav NS",
  location: "Edmonton, AB",
  email: "pns@ualberta.ca",
  availability: "Open to 4, 8 or 12-month internships",
  // The headline is split so the middle part can be highlighted.
  headline: ["I build cloud-native apps and the ", "AI systems", " that run inside them."],
  now: "DevOps intern at StackPro",
  intro:
    "Computing Science (AI) student at the University of Alberta. I like taking an idea from a repo to a monitored production deploy: full-stack apps, AWS infrastructure, CI/CD, and LLM features that hold up under real traffic.",
};

export const links = {
  github: "https://github.com/Pranav-ns",
  linkedin: "https://www.linkedin.com/in/pranav-ns-/",
  calendly: "https://calendly.com/pranav-ns",
  instagram: "https://www.instagram.com/pranav._.ns/",
  coffee: "https://buymeacoffee.com/pranavns",
};

export type Project = {
  slug: string;
  title: string;
  kind: string;
  summary: string;
  metrics?: { value: string; label: string }[];
  stack: string[];
  live?: string;
  code?: string;
  // Which interactive demo panel to show beside the project.
  demo: "status" | "chat" | "shelf";
};

export const projects: Project[] = [
  {
    slug: "caterbridge",
    title: "CaterBridge",
    kind: "Full-stack cloud marketplace",
    summary:
      "A catering marketplace I deployed and run on AWS EC2, with a Gemini-powered assistant, Stripe payments, and Prometheus + Grafana watching every request.",
    metrics: [
      { value: "<2s", label: "page loads" },
      { value: "99.9%", label: "uptime" },
      { value: "−70%", label: "time to detect incidents" },
    ],
    stack: ["React", "Node.js", "MongoDB", "AWS EC2", "Nginx", "Grafana"],
    live: "https://frontend-red-two-anl6ojt6h4.vercel.app/",
    demo: "status",
  },
  {
    slug: "papo-ai",
    title: "Papo AI",
    kind: "Serverless AI cooking assistant",
    summary:
      "Personalised recipe recommendations from Amazon Bedrock, served through AppSync GraphQL with Cognito auth, shipped by GitHub Actions and monitored with Grafana Faro.",
    stack: ["React", "AWS Amplify", "AppSync", "Cognito", "Bedrock", "GitHub Actions"],
    live: "https://papo-ai.pranavns.com",
    code: "https://github.com/Pranav-ns/Papo-AI",
    demo: "chat",
  },
  {
    slug: "shelfout",
    title: "ShelfOut",
    kind: "AI book discovery",
    summary:
      "Snap a photo of a bookshelf and get recommendations back. Computer vision reads the spines, metadata enrichment fills the gaps, and an AI ranker picks what to read next.",
    stack: ["Python", "Computer Vision", "Node.js", "Docker", "Kubernetes"],
    live: "https://shelf-out.pranavns.com",
    demo: "shelf",
  },
];

export const buildingNow = [
  {
    title: "Failure Forensics",
    summary: "Root-cause analysis for LLM and RAG pipelines, from retrieval through inference.",
    href: "https://github.com/Pranav-ns/Failure-Forensics",
  },
  {
    title: "LLM Cost Autopilot",
    summary: "Routes each prompt to the cheapest model that still clears the quality bar.",
    href: "https://github.com/Pranav-ns/LLM-Cost-Autopilot",
  },
];

export type Role = {
  role: string;
  org: string;
  orgUrl?: string;
  period: string;
  place: string;
  points: string[];
};

export const experience: Role[] = [
  {
    role: "DevOps Engineer Intern",
    org: "StackPro",
    period: "Jul 2026 – now",
    place: "Bangalore",
    points: [
      "Building cloud-native automation pipelines for scalable backend workflows and AI feature rollout.",
      "Leading GenAI product prototypes from experiment to production-ready software.",
    ],
  },
  {
    role: "Co-Facilitator",
    org: "University of Alberta, International House",
    orgUrl:
      "https://www.ualberta.ca/en/international/global-education/international-house/index.html",
    period: "Sep 2025 – Apr 2026",
    place: "Edmonton",
    points: [
      "Ran events and programs that helped international students settle in and get involved on campus.",
    ],
  },
  {
    role: "Technical Support Intern",
    org: "Joint Role Media",
    orgUrl: "https://jointrolemedia.com/",
    period: "Mar – Aug 2025",
    place: "Bangalore",
    points: [
      "Diagnosed software issues end to end over email and live chat, and worked with engineering to fix them.",
      "Wrote knowledge-base articles and FAQs that cut repeat tickets.",
      "Escalated critical incidents with full context for fast cross-team resolution.",
    ],
  },
  {
    role: "Tech Mentor",
    org: "Global Academy of Technology",
    orgUrl: "https://www.gat.ac.in/",
    period: "Jun 2024 – Jun 2025",
    place: "Bangalore",
    points: [
      "Mentored students in Theory of Computation and programming fundamentals.",
    ],
  },
];

export const toolkit = [
  "Python",
  "TypeScript",
  "React / Next.js",
  "Node.js",
  "GraphQL",
  "AWS",
  "Docker",
  "Kubernetes",
  "GitHub Actions",
  "Prometheus / Grafana",
  "Amazon Bedrock",
  "PyTorch",
];

export const extras = [
  "Maple Leaf Award 2025 for academic excellence",
  "I speak English, Hindi, Telugu and Kannada, and I am learning French",
];
