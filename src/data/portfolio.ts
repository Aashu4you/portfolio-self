export const portfolioData = {
  name: "Aashutosh Sharma",
  shortName: "Aashutosh",
  title: "Full-Stack Developer",
  location: "Indore, Madhya Pradesh, India",
  email: "ats4219511@gmail.com",
  availability: "Open for freelance and full-time roles",
  intro:
    "Crafting digital experiences that blend elegant design with powerful engineering. Turning ideas into performant, beautiful web applications.",
  about: [
    "I'm Aashutosh Sharma, a developer who thrives at the intersection of design and technology. I specialize in building accessible, human-centered digital products — from pixel-perfect interfaces to robust backend systems.",
    "When I'm not coding, you'll find me exploring emerging tech, contributing to open-source projects, or sketching ideas for my next product. I believe great software is built with empathy, curiosity, and relentless attention to detail.",
  ],
  socialLinks: {
    github: "https://github.com/Aashu4you",
    linkedin: "https://www.linkedin.com/in/aashutosh-sharma-207bab2b5/",
  },
  resumeHref: "/resume.pdf",
  heroImage: "/aashu.png",
  aboutImage: "/aashu-alt.png",
  typedRoles: [
    "Frontend Developer",
    "JavaScript Developer",
    "UI/UX Enthusiast",
    "Full-Stack Builder",
    "Open Source Lover",
  ],
};

export const stats = [
  { value: 20, suffix: "+", label: "Projects Completed", icon: "code" },
  { value: 15, suffix: "+", label: "Technologies Known", icon: "layers" },
  { value: 2, suffix: "+", label: "Years Experience", icon: "calendar" },
  { value: 10, suffix: "+", label: "Happy Clients", icon: "smile" },
];

export const aboutDetails = [
  "Indore, Madhya Pradesh, India",
  "Computer Science Graduate",
  "Open Source Enthusiast",
  "Coffee-driven Developer",
];

export type SkillTab = "frontend" | "backend" | "tools";

export const skillTabs: { id: SkillTab; label: string }[] = [
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "tools", label: "Tools & Others" },
];

export const skills: Record<SkillTab, { name: string; pct: number; color: string }[]> = {
  frontend: [
    { name: "HTML5", pct: 95, color: "#e34f26" },
    { name: "CSS3", pct: 90, color: "#264de4" },
    { name: "JavaScript", pct: 88, color: "#f7df1e" },
    { name: "React.js", pct: 82, color: "#61dafb" },
    { name: "Tailwind", pct: 85, color: "#38bdf8" },
    { name: "TypeScript", pct: 75, color: "#3178c6" },
  ],
  backend: [
    { name: "Node.js", pct: 85, color: "#3c873a" },
    { name: "Python", pct: 80, color: "#3776ab" },
    { name: "MongoDB", pct: 78, color: "#47a248" },
    { name: "PostgreSQL", pct: 75, color: "#336791" },
    { name: "Express.js", pct: 70, color: "#ff6b35" },
    { name: "Redis", pct: 65, color: "#dc382d" },
  ],
  tools: [
    { name: "Git / GitHub", pct: 92, color: "#f05032" },
    { name: "Docker", pct: 80, color: "#2496ed" },
    { name: "Firebase", pct: 75, color: "#ff9a00" },
    { name: "Figma", pct: 78, color: "#f24e1e" },
    { name: "Postman", pct: 72, color: "#ff6c37" },
    { name: "AWS / Cloud", pct: 68, color: "#a259ff" },
  ],
};

export type ProjectCategory = "all" | "fullstack" | "ml" | "frontend";

export const projectFilters: { id: ProjectCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "fullstack", label: "Full Stack" },
  { id: "ml", label: "ML / AI" },
  { id: "frontend", label: "Frontend" },
];

export const projects = [
  {
    title: "Mental Health Monitoring Website",
    year: "2024",
    type: "Full Stack",
    category: "fullstack" as const,
    description:
      "A comprehensive platform for mental health tracking, mood analysis, journaling, and connecting with wellness resources.",
    stack: ["React", "Node.js", "MongoDB", "Chart.js"],
    href: "https://github.com/Aashu4you/MediPred01",
    gradient: "from-violet-600/80 via-purple-700/60 to-indigo-900/80",
    icon: "brain",
  },
  {
    title: "Speech to Sign Language Converter",
    year: "2024",
    type: "ML / AI",
    category: "ml" as const,
    description:
      "AI-powered application that converts spoken language into real-time sign language animations using NLP and computer vision.",
    stack: ["Python", "TensorFlow", "Flask", "OpenCV"],
    href: "https://github.com/Aashu4you/SignBridge",
    gradient: "from-cyan-500/70 via-blue-600/60 to-slate-900/80",
    icon: "hands",
  },
  {
    title: "Crop Scheduling Platform",
    year: "2023",
    type: "Full Stack",
    category: "fullstack" as const,
    description:
      "Smart agricultural platform helping farmers plan crop cycles using weather data, soil analysis, and AI-driven recommendations.",
    stack: ["React", "FastAPI", "PostgreSQL", "ML"],
    href: "https://github.com/Aashu4you/Farmify-",
    gradient: "from-emerald-500/70 via-green-600/60 to-slate-900/80",
    icon: "leaf",
  },
  {
    title: "Book Mart Website",
    year: "2023",
    type: "Frontend",
    category: "frontend" as const,
    description:
      "A full-featured online bookstore with advanced search, personalized recommendations, cart management, and secure checkout.",
    stack: ["React", "Redux", "Node.js", "Stripe"],
    href: "#contact",
    gradient: "from-amber-500/70 via-orange-600/60 to-slate-900/80",
    icon: "book",
  },
];

export const services = [
  {
    title: "Web Development",
    description:
      "End-to-end web application development with modern stacks. Clean code, scalable architecture, and lightning-fast performance.",
    items: ["React / Next.js Applications", "REST & WebSocket APIs", "Database Architecture"],
    color: "#a259ff",
  },
  {
    title: "UI/UX Design",
    description:
      "Crafting visually stunning, intuitive interfaces that users love. From wireframes to polished designs with Figma.",
    items: ["User Research & Wireframing", "High-Fidelity Prototypes", "Design Systems"],
    color: "#00d4ff",
  },
  {
    title: "Responsive Design",
    description:
      "Mobile-first, pixel-perfect layouts that work flawlessly on every device and screen size without compromise.",
    items: ["Mobile-First Development", "Cross-browser Compatibility", "Performance Optimization"],
    color: "#ff6b6b",
  },
  {
    title: "Frontend Engineering",
    description:
      "High-quality frontend engineering focused on performance, accessibility, and maintainable component architectures.",
    items: ["Responsive UI Systems", "Smooth Animations", "Accessible Components"],
    color: "#00ffaa",
  },
];

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];
