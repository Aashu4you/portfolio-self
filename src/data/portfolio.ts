export const portfolioData = {
  name: "Aashutosh Sharma",
  shortName: "Aashutosh",
  title: "Full-Stack Developer",
  location: "Indore, Madhya Pradesh, India",
  email: "ats4219511@gmail.com",
  availability: "Open for freelance and full-time roles",
  intro:
    "I build modern web apps with clean interfaces, solid backends, and careful attention to performance.",
  about: [
    "I'm Aashutosh Sharma, a full-stack developer based in Indore. I work across React/Next.js frontends and Node/Python backends, with a focus on clear UX and maintainable code.",
    "I enjoy shipping personal and open-source projects, exploring AI-assisted workflows, and turning rough ideas into usable products.",
  ],
  socialLinks: {
    github: "https://github.com/Aashu4you",
    linkedin: "https://www.linkedin.com/in/aashutosh-sharma-207bab2b5/",
  },
  resumeHref: "/resume.pdf",
  heroImage: "/aashu.webp",
  aboutImage: "/aashu-alt.webp",
  typedRoles: [
    "Frontend Developer",
    "Full-Stack Builder",
    "UI Engineer",
    "Open Source Contributor",
  ],
  siteUrl: "https://portfolio-self.vercel.app",
};

export const stats = [
  { value: 4, suffix: "", label: "Featured Projects", icon: "code" },
  { value: 12, suffix: "+", label: "Technologies Used", icon: "layers" },
  { value: 2, suffix: "+", label: "Years Building", icon: "calendar" },
  { value: 24, suffix: "h", label: "Typical Reply Time", icon: "smile" },
];

export const aboutDetails = [
  "Indore, Madhya Pradesh, India",
  "B.Tech — Computer Science",
  "Open Source Contributor",
  "Available for freelance & full-time",
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
    { name: "JavaScript", pct: 88, color: "#c9a227" },
    { name: "React.js", pct: 82, color: "#2dd4bf" },
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
    { name: "AWS / Cloud", pct: 68, color: "#0d9488" },
  ],
};

export type ProjectCategory = "all" | "fullstack" | "ml" | "frontend";

export const projectFilters: { id: ProjectCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "fullstack", label: "Full Stack" },
  { id: "ml", label: "ML / AI" },
  { id: "frontend", label: "Frontend" },
];

export type Project = {
  title: string;
  year: string;
  type: string;
  category: Exclude<ProjectCategory, "all">;
  description: string;
  stack: string[];
  github: string;
  demo?: string;
  image: string;
  accent: string;
  icon: "brain" | "hands" | "leaf" | "book";
};

export const projects: Project[] = [
  {
    title: "Mental Health Monitoring Website",
    year: "2024",
    type: "Full Stack",
    category: "fullstack" as const,
    description:
      "A wellness platform for mood tracking, journaling, and surfacing helpful insights through a clean product experience.",
    stack: ["React", "Node.js", "MongoDB", "Chart.js"],
    github: "https://github.com/Aashu4you/MediPred01",
    image: "/projects/mental-health.svg",
    accent: "#0d9488",
    icon: "brain",
  },
  {
    title: "Speech to Sign Language Converter",
    year: "2024",
    type: "ML / AI",
    category: "ml" as const,
    description:
      "An AI-assisted app that explores converting spoken language into sign-language-oriented output using NLP and computer vision concepts.",
    stack: ["Python", "TensorFlow", "Flask", "OpenCV"],
    github: "https://github.com/Aashu4you/SignBridge",
    image: "/projects/sign-bridge.svg",
    accent: "#2563eb",
    icon: "hands",
  },
  {
    title: "Crop Scheduling Platform",
    year: "2023",
    type: "Full Stack",
    category: "fullstack" as const,
    description:
      "A farm planning tool that combines weather signals and recommendation logic to help schedule crop cycles.",
    stack: ["React", "FastAPI", "PostgreSQL", "ML"],
    github: "https://github.com/Aashu4you/Farmify-",
    image: "/projects/farmify.svg",
    accent: "#16a34a",
    icon: "leaf",
  },
  {
    title: "Book Mart Website",
    year: "2023",
    type: "Frontend",
    category: "frontend" as const,
    description:
      "An online bookstore UI with discovery flows, cart management, and structured product browsing.",
    stack: ["React", "Redux", "Node.js"],
    github: "https://github.com/Aashu4you",
    image: "/projects/book-mart.svg",
    accent: "#c2410c",
    icon: "book",
  },
];

export const services = [
  {
    title: "Full-Stack Web Apps",
    description: "Build and ship web products with modern React/Next.js frontends and reliable APIs.",
    items: ["Next.js / React apps", "REST APIs", "Database design"],
    color: "#0d9488",
  },
  {
    title: "UI Engineering",
    description: "Turn designs into responsive, accessible interfaces with strong visual hierarchy.",
    items: ["Design systems", "Responsive layouts", "Micro-interactions"],
    color: "#2563eb",
  },
  {
    title: "Product Polish",
    description: "Refresh existing sites with clearer branding, better UX, and faster performance.",
    items: ["Portfolio / landing redesigns", "Performance passes", "Component cleanup"],
    color: "#c2410c",
  },
];

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];
