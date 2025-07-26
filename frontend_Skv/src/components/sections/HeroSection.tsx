"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { PERSONAL_INFO } from "@/constants"

interface HeroSectionProps {
  isVisible: boolean
}

export function HeroSection({ isVisible }: HeroSectionProps) {
  const handleViewWork = () => {
    console.log("View work clicked")
  }

  const handleGetInTouch = () => {
    console.log("Get in touch clicked")
  }

  return (
    <motion.div
      className="text-center max-w-6xl"
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 100,
      }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl md:text-7xl font-bold text-white mb-6"
      >
        {PERSONAL_INFO.name}
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-lg md:text-3xl text-neutral-200 mb-8 font-light"
      >
        {PERSONAL_INFO.title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-base md:text-xl text-neutral-400 mb-12 leading-relaxed max-w-4xl mx-auto"
      >
        {PERSONAL_INFO.description}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
      >
        <Button onClick={handleViewWork} variant="primary">
          View My Work
        </Button>
        <Button onClick={handleGetInTouch} variant="secondary">
          Get In Touch
        </Button>
      </motion.div>
    </motion.div>
  )
}
