import type { PersonalInfo, NavigationItem, Skill, Projects } from "@/types"

export const PERSONAL_INFO: PersonalInfo = {
  name: "Sujeet Kumar",
  title: "Full Stack Developer & Creative Technologist",
  description:
    "Crafting digital experiences with passion, precision, and a touch of magic. Specializing in modern web technologies and innovative solutions that bring ideas to life.",
  email: "122333sujeet@gmail.com",
  phone: "+91 8539898838",
  location: "Bodh-Gaya, Bihar, India",
  profileImage: "/skv_photo.jpg",
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "contact", label: "Contact Me", href: "#contact" },
  { id: "resume", label: "Resume", href: "/sujeet-iiitm-resume.pdf", external: true },
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
]

export const PROJECTS: Projects[] = [
  {
    id: "project1",
    title: "Portfolio Website",
    description:
      "A modern, responsive portfolio website built with React, TypeScript, and Framer Motion. Features include smooth animations, 3D elements, and a contact form with SMTP integration.",
    image: "/portfolio_skv.png",
    link: "https://sujeet-kv-portfolio.vercel.app/",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    featured: true,
  },
  {
    id: "project2",
    title: "Daily Notes Tracker",
    description:
      "A full-stack web application with user authentication for tracking daily note-taking practices. Built with modern web technologies and secure user management.",
    image: "/notesTrackingImage.png",
    link: "https://github.com/sujeet-iiitm/noteTracker",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    featured: true,
  },
  {
    id: "project3",
    title: "This Section is Cooking",
    description:"It is being cooked by the owner...",
    image: "/Cooking.mp4",
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
