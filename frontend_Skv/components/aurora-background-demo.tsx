"use client"

import { motion } from "motion/react"
import { useEffect, useState } from "react"
import { AuroraBackground } from "@/components/ui/aurora-background"
import { Navigation } from "@/components/navigation"

export default function AuroraBackgroundDemo() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showMainContent, setShowMainContent] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset
      setScrollProgress(scrollTop)

      // Show main content and navigation when scrolled past welcome
      if (scrollTop > 200) {
        setShowMainContent(true)
      } else {
        setShowMainContent(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="relative">
      <AuroraBackground>
        {/* Welcome Section - Disappears on scroll */}
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-10"
          animate={{
            opacity: scrollProgress > 400 ? 0 : 1 - scrollProgress / 400,
            scale: scrollProgress > 400 ? 0.5 : 1 - scrollProgress / 800,
          }}
          transition={{ duration: 0.1 }}
        >
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="text-6xl md:text-9xl font-bold text-white mb-6"
            >
              WELCOME!
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-xl md:text-3xl text-neutral-300 font-light mb-8"
            >
              To My Digital Universe
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="text-neutral-400 animate-bounce text-lg"
            >
              ↓ Scroll to explore ↓
            </motion.div>
          </div>
        </motion.div>
      </AuroraBackground>

      {/* Navigation - Fixed and always visible when main content shows */}
      <motion.div
        className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: showMainContent ? 1 : 0,
          y: showMainContent ? 0 : -20,
        }}
        transition={{ duration: 0.3 }}
      >
        <Navigation />
      </motion.div>

      {/* Main Portfolio Content - Single Page */}
      <div className="relative z-20">
        {/* Spacer for scroll trigger */}
        <div className="h-screen"></div>

        {/* Single Main Portfolio Section */}
        <motion.section
          className="min-h-screen flex items-center justify-center px-4 bg-black pt-24"
          animate={{
            opacity: showMainContent ? 1 : 0,
            y: showMainContent ? 0 : 100,
          }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center max-w-6xl">
            {/* Main Header */}
            <div className="text-4xl md:text-7xl font-bold text-white mb-6">Sujeet Kumar</div>
            <div className="text-lg md:text-3xl text-neutral-200 mb-8 font-light">
              Full Stack Developer & Creative Technologist
            </div>
            <div className="text-base md:text-xl text-neutral-400 mb-12 leading-relaxed max-w-4xl mx-auto">
              Crafting digital experiences with passion, precision, and a touch of magic. Specializing in modern web
              technologies and innovative solutions that bring ideas to life.
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-neutral-200 transition-colors"
              >
                View My Work
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-black transition-colors"
              >
                Get In Touch
              </motion.button>
            </div>

            {/* Skills/Technologies */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
                <div className="text-2xl mb-2">⚛️</div>
                <div className="text-white font-medium">React</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
                <div className="text-2xl mb-2">🚀</div>
                <div className="text-white font-medium">Next.js</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
                <div className="text-2xl mb-2">💾</div>
                <div className="text-white font-medium">Node.js</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
                <div className="text-2xl mb-2">🎨</div>
                <div className="text-white font-medium">Design</div>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-16 text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">About Me</h3>
              <p className="text-neutral-300 text-lg leading-relaxed mb-4">
                I'm a passionate full-stack developer with over 5 years of experience creating digital solutions that
                make a difference. My journey started with curiosity about how websites work, and it has evolved into a
                deep love for crafting exceptional user experiences.
              </p>
              <p className="text-neutral-300 text-lg leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or
                sharing knowledge with the developer community.
              </p>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
                <div className="text-2xl mb-2">📧</div>
                <div className="text-white font-medium">Email</div>
                <div className="text-neutral-400 text-sm">sujeet@example.com</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
                <div className="text-2xl mb-2">📱</div>
                <div className="text-white font-medium">Phone</div>
                <div className="text-neutral-400 text-sm">+1 (555) 123-4567</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
                <div className="text-2xl mb-2">📍</div>
                <div className="text-white font-medium">Location</div>
                <div className="text-neutral-400 text-sm">New York, NY</div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Small spacer */}
        <div className="h-32 bg-black"></div>
      </div>
    </div>
  )
}
