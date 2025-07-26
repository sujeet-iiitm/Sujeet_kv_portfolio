"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { Scene3D } from "@/components/3d/Scene3D"
import { PERSONAL_INFO } from "@/constants"

interface Hero3DSectionProps {
  isVisible: boolean
  modelUrl?: string
}

export function Hero3DSection({ isVisible, modelUrl }: Hero3DSectionProps) {
  const handleViewWork = () => {
    const projectsSection = document.getElementById("projects")
    projectsSection?.scrollIntoView({ behavior: "smooth" })
  }

  const handleGetInTouch = () => {
    const contactSection = document.getElementById("contact")
    contactSection?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center min-h-screen w-full"
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 100,
      }}
      transition={{ duration: 0.5 }}
    >
      {/* Left Side - Content (Takes 2/5 of space) */}
      <div className="lg:col-span-2 space-y-6 z-10 pr-4">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
            HI, I AM{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              {PERSONAL_INFO.name}
            </span>
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl text-neutral-300 font-light mb-6 leading-relaxed">
            {PERSONAL_INFO.title}
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="text-base md:text-lg text-neutral-400 leading-relaxed"
        >
          {PERSONAL_INFO.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button onClick={handleViewWork} variant="primary" size="md">
            View My Work
          </Button>
          <Button onClick={handleGetInTouch} variant="secondary" size="md">
            Get In Touch
          </Button>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap gap-2"
        >
          {["React", "JavaScript","TypeScript", "Node.js", "Next.js", "MySql", "psql" ,"ORM" ,"Docker", "mongoDb", "Three.js", "CSS"].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm text-white/80"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Right Side - 3D Scene (Takes 3/5 of space - Landscape) */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="lg:col-span-3 h-[500px] lg:h-[700px] relative"
      >
        {/* 3D Container with proper aspect ratio */}
        <div className="w-full h-full bg-gradient-to-br from-gray-900/20 to-black/40 rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm">
          <Scene3D modelUrl={modelUrl} className="w-full h-full" />
        </div>

        {/* 3D Scene Controls Info */}
        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg p-3 border border-white/20">
          <p className="text-white/80 text-sm flex items-center gap-2">
            <span>🖱️</span> Drag to rotate
            <span className="text-white/40">•</span>
            <span>🔍</span> Scroll to zoom
          </p>
        </div>

        {/* Optional: 3D Scene Title */}
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20">
          <p className="text-white/80 text-sm font-medium">Interactive 3D</p>
        </div>
      </motion.div>
    </motion.div>
  )
}
