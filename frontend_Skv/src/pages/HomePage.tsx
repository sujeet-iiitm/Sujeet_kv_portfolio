"use client"

import { motion } from "framer-motion"
import { AuroraBackground } from "@/components/ui/AuroraBackground"
import { Navigation } from "@/components/layout/Navigation"
import { Hero3DSection } from "@/components/sections/Hero3DSection"
import { WelcomeSection } from "@/components/sections/WelcomeSection"
import { SkillsSection } from "@/components/sections/SkillsSection"
import { AboutSection } from "@/components/sections/AboutSection"
import { ContactSection } from "@/components/sections/ContactSection"
import { useScrollState } from "@/hooks/useScrollState"
import { ProjectsSection } from "@/components/sections/ProjectsSection"
import { useEffect, useState } from "react"

export function HomePage() {
  const { scrollY, showMainContent } = useScrollState();
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollProgress(window.pageYOffset)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Add your Sketchfab model URL here
  const sketchfabModelUrl = "/models/solar_system_animation.glb" // We'll add this when you provide the Sketchfab link

  return (
    <div className="relative">
      <AuroraBackground>
        <WelcomeSection scrollProgress={scrollProgress} />
      </AuroraBackground>

      <Navigation isVisible={showMainContent} />

      <div className="relative z-20">
        <div className="h-screen" />

        {/* HOME SECTION with 3D */}
        <motion.section
          className="min-h-screen flex items-center justify-center section-padding bg-black pt-24"
          id="home"
        >
          <div className="container-max">
            <Hero3DSection isVisible={showMainContent} modelUrl={sketchfabModelUrl} />
          </div>
        </motion.section>

        {/* ABOUT SECTION */}
        <motion.section
          className="min-h-screen flex items-center justify-center section-padding bg-black pt-24"
          id="about"
        >
          <div className="container-max">
            <AboutSection isVisible={showMainContent} />
          </div>
        </motion.section>

        {/* SKILLS SECTION */}
        <motion.section
          className="min-h-screen flex items-center justify-center section-padding bg-black pt-24"
          id="skills"
        >
          <div className="container-max">
            <div className="text-center max-w-6xl">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">Skills</h2>
              <SkillsSection isVisible={showMainContent} />
            </div>
          </div>
        </motion.section>
        
        {/* PROJECTS SECTION */}
        <motion.section
          className="min-h-screen flex items-center justify-center section-padding bg-black pt-24"
          id="projects"
        >
          <div className="container-max">
            <div className="text-center max-w-6xl">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">My Projects</h2>
              <p className="text-xl text-neutral-400 mb-12">Here are some of my recent works</p>
              <ProjectsSection isVisible={showMainContent} />
            </div>
          </div>
        </motion.section>

        {/* CONTACT SECTION */}
        <motion.section
          className="min-h-screen flex items-center justify-center section-padding bg-black pt-24"
          id="contact"
        >
          <div className="container-max">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">Contacts</h2>
              <ContactSection isVisible={showMainContent} />
            </div>
          </div>
        </motion.section>

        <div className="h-32 bg-black" />
      </div>
    </div>
  )
}
