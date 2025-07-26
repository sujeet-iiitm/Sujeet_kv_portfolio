"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { motion } from "motion/react"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = ["Home", "About", "Contact Me", "Resume", "Blog"]

  const scrollToSection = (section: string) => {
    if (section === "Home") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
    // Add more navigation logic for other sections later
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50"
    >
      <div className="flex items-center gap-4">
        {/* Profile Photo */}
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 backdrop-blur-md bg-black/20">
          <img src="/placeholder.svg?height=48&width=48" alt="Portfolio Owner" className="w-full h-full object-cover" />
        </div>

        {/* Navigation Bar */}
        <div className="bg-gray-800/30 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-3 shadow-lg">
          <div className="flex items-center gap-6">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(item)}
                className="text-white/80 hover:text-white transition-colors duration-200 text-sm font-medium hover:scale-105 transform transition-transform"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Button */}
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-12 h-12 rounded-full bg-gray-800/30 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-colors duration-200 hover:scale-105 transform transition-transform"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="absolute top-14 right-0 bg-gray-800/40 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-lg min-w-[200px]"
            >
              <div className="flex flex-col gap-2">
                <button className="text-white/80 hover:text-white transition-colors duration-200 text-sm font-medium text-left py-2 px-3 rounded-lg hover:bg-white/10"></button>

                <button className="text-white/80 hover:text-white transition-colors duration-200 text-sm font-medium text-left py-2 px-3 rounded-lg hover:bg-white/10" id="projects">
                  Projects
                </button>
                <button className="text-white/80 hover:text-white transition-colors duration-200 text-sm font-medium text-left py-2 px-3 rounded-lg hover:bg-white/10" id="skills">
                  Skills
                </button>
                <button className="text-white/80 hover:text-white transition-colors duration-200 text-sm font-medium text-left py-2 px-3 rounded-lg hover:bg-white/10" id="contacts">
                  Experience
                </button>
                <hr className="border-white/10 my-2" />
                <button className="text-white/80 hover:text-white transition-colors duration-200 text-sm font-medium text-left py-2 px-3 rounded-lg hover:bg-white/10" id="">
                  Play GAME's
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.nav>
  )
}
