import type { PersonalInfo, NavigationItem, Skill, Projects } from "@/types"

export const PERSONAL_INFO: PersonalInfo = {
  name: "Sujeet Kumar",
  title: "Full Stack Developer & Creative Technologist",
  description:
    "Crafting digital experiences with passion, precision, and a touch of magic. Specializing in modern web technologies and innovative solutions that bring ideas to life.",
  email: "122333sujeet@gmail.com",
  phone: "+91 8539898838",
  location: "Bodh-Gaya, Bihar, India",
  profileImage: "/sujeet-photo-diwali.jpeg",
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "contact", label: "Contact Me", href: "#contact" },
  { id: "resume", label: "Resume", href: "/sujeet-iiitm(2).pdf", external: true },
]

export const SKILLS: Skill[] = [
  { id: "javascript", name: "JavaScript", icon: "🟨", category: "frontend" },
  { id: "css", name: "CSS", icon: "🎨", category: "design"},
  { id: "react", name: "React", icon: "⚛️", category: "frontend" },
  { id: "tailwind", name: "Tailwind-css", icon: "🌬️", category: "design" },
  { id: "nextjs", name: "Next.js", icon: "🚀", category: "frontend" },
  { id: "nodejs", name: "Node.js", icon: "💾", category: "backend" },
  { id: "mysql", name: "MySQL", icon: "🗄️", category: "backend" },
  { id: "mongodb", name: "MongoDB", icon: "🍃", category: "backend" },
  { id: "pgsql", name: "PostgreSQL", icon: "🐘", category: "backend" },
  { id: "prisma", name: "Prisma-ORM", icon: "🔗", category: "backend" },
  { id: "docker", name: "Docker", icon: "🐳", category: "tools" },
  { id: "expressjs", name: "Express.js", icon: "🛠️", category: "backend" },
  { id: "git", name: "Git", icon: "🐙", category: "tools" },
  { id: "ddos", name: "DDos", icon: "🌊", category: "backend" },
  { id: "redis", name: "Redis Pub/Sub", icon: "📢", category: "backend" },
  { id: "monorepo", name: "Monorepo", icon: "📦", category: "tools" },
  { id: "AI", name: "gemini-api", icon: "🕸️", category: "tools" },

]

export const PROJECTS: Projects[] = [
  {
    id: "project-1",
    title: "Real Time Currency Converter",
    description:
      "Built a real-time currency converter using third-party APIs. Implemented API handling, React hooks, TypeScript, Tailwind CSS, and lottie-react animations for an interactive UI.",
    image: ["/Screenshot (49).png"],
    link: "https://github.com/sujeet-iiitm/currencyConverter",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "lottie-react"],
    featured: true,
  },
  {
    id: "project-2",
    title: "Portfolio Website",
    description:
      "A modern portfolio website built with React and TypeScript. Features smooth animations, 3D elements, and a contact form with SMTP integration.",
    image: ["/portfolio_skv.png", "/Screenshot (100).png"],
    link: "https://sujeet-kv-portfolio.vercel.app/",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    featured: true,
  },
  {
    id: "project-3",
    title: "Daily Notes Tracker",
    description:
      "Full-stack notes tracker with user authentication for daily note-taking. Built with React, Node.js, Express, PostgreSQL and Prisma. Packaged in a monorepo and deployed to AWS EC2 using Docker.",
    image: ["/notetracker/Screenshot (215).png", "/notetracker/Screenshot (217).png", "/notetracker/Screenshot (218).png"],
    link: "https://github.com/sujeet-iiitm/noteTracker",
    technologies: ["React", "Node.js", "Express", "PostgreSQL", "Prisma", "Monorepo", "AWS-EC2", "Docker"],
    featured: true,
  },
  {
    id: "project-4",
    title: "noteTracker v4 — Notes & Password Manager",
    description:
      "The final evolution of noteTracker — now with a secure password manager. Store and manage notes and passwords in one place; every password is encrypted before storage to ensure privacy and security.",
    image: ["/password-manager/Screenshot (233).png", "/password-manager/Screenshot (234).png"],
    link: "https://notestracker.sujeet.xyz",
    technologies: ["React", "Node.js", "PostgreSQL", "Encryption", "JWT"],
    featured: true,
  },
  {
    id: "project-5",
    title: "AI Chatbot",
    description:
      "AI chatbot with JWT-based authentication. On login a JWT is issued and signed; a middleware validates the token before calling the LLM API. Requests with invalid tokens are rejected, preventing unauthorized API calls.",
    image: ["/chatbot-1.png", "/chatbot-2.png","/chatbot-3.png"],
    link: "https://dooper-ass-h7rz.vercel.app/",
    technologies: ["React", "Node.js", "PostgreSQL", "Encryption", "JWT"],
    featured: true,
  },
  {
    id: "project-6",
    title: "This Section is Cooking",
    description:
      "Work in progress — features and demos coming soon. Includes a demo video and a reference repository.",
    image: ["/Cooking.mp4", ""],
    link: "https://github.com/sujeet-iiitm/cooking-app",
    technologies: ["React", "Video.js", "Firebase"],
    featured: false,
  },
]

export const MENU_ITEMS = [
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "Contact", label: "Contact Me", href: "#contact" },
  { id: "games", label: "Play Game's", href: "#games" }

]


export const SCROLL_THRESHOLDS = {
  HIDE_WELCOME: 400,
  SHOW_NAVIGATION: 200,
  SHOW_MAIN_CONTENT: 600,
}
