"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { PROJECTS } from "@/constants"
import { ExternalLink, Github } from "lucide-react"

interface ProjectsSectionProps {
  isVisible: boolean
}

export function ProjectsSection({ isVisible }: ProjectsSectionProps) {
  const handleProjectClick = (link: string) => {
    window.open(link, "_blank", "noopener,noreferrer")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ delay: 0.2 }}
      className="container-max section-padding"
    >
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-6xl font-bold text-white mb-6"
        >
          My Projects
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-neutral-400 max-w-2xl mx-auto"
        >
          Here are some of my recent works that showcase my skills and creativity
        </motion.p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="group"
          >
            <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white/5 border-white/10">
              {/* Project Image/Video */}
              <div className="relative h-48 overflow-hidden">
                {project.image.endsWith(".mp4") ? (
                  <video
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src={project.image} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      // Fallback for broken images
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.svg?height=200&width=400&text=Project+Image"
                    }}
                  />
                )}

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex gap-3">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleProjectClick(project.link)}
                      className="flex items-center gap-2"
                    >
                      {project.link.includes("github.com") ? (
                        <>
                          <Github size={16} />
                          Code
                        </>
                      ) : (
                        <>
                          <ExternalLink size={16} />
                          Live Demo
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>

                <p className="text-neutral-400 text-sm leading-relaxed mb-4 line-clamp-3">{project.description}</p>

                {/* Project Link */}
                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleProjectClick(project.link)}
                    className="text-blue-400 hover:text-blue-300 p-0 h-auto font-medium"
                  >
                    View Project →
                  </Button>

                  {/* Project Type Badge */}
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                    {project.link.includes("github.com") ? "Open Source" : "Live Project"}
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-center mt-16"
      >
        <p className="text-neutral-400 mb-6">Want to see more of my work or collaborate on a project?</p>
        <Button
          variant="primary"
          onClick={() => {
            const contactSection = document.getElementById("contact")
            contactSection?.scrollIntoView({ behavior: "smooth" })
          }}
        >
          Get In Touch
        </Button>
      </motion.div>
    </motion.div>
  )
}
