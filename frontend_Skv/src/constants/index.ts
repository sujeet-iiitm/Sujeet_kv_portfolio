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
  { id: "resume", label: "Resume", href: "/Skv_resume.pdf", external: true },
]

export const SKILLS: Skill[] = [
  { id: "javascript", name: "JavaScript", icon: "🟨", category: "frontend" },
  { id: "css", name: "CSS", icon: "🎨", category: "design"},
  { id: "react", name: "React", icon: "⚛️", category: "frontend" },
  { id: "nextjs", name: "Next.js", icon: "🚀", category: "frontend" },
  { id: "nodejs", name: "Node.js", icon: "💾", category: "backend" },
  { id: "mysql", name: "MySQL", icon: "🗄️", category: "backend" },
  { id: "mongodb", name: "MongoDB", icon: "🍃", category: "backend" },
  { id: "pgsql", name: "PostgreSQL", icon: "🐘", category: "backend" },
  { id: "prisma", name: "Prisma-ORM", icon: "🔗", category: "backend" },
  { id: "docker", name: "Docker", icon: "🐳", category: "tools" },
  { id: "expressjs", name: "Express.js", icon: "🛠️", category: "backend" },
  { id: "git", name: "Git", icon: "🐙", category: "tools" },
  { id: "design", name: "Design", icon: "🎨", category: "design" },
  { id: "redis", name: "Redis Pub/Sub", icon: "📢", category: "backend" }
]

export const PROJECTS: Projects[] = [
  // {
  //   id: "project1",
  //   title: "Portfolio Website",
  //   description: "A personal portfolio website showcasing my skills and projects.",
  //   image: "/project1.jpg",
  //   link: "https://example.com/project1",
  // },
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
