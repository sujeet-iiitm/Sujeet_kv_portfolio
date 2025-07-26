"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/Card"
import { SKILLS } from "@/constants"

interface SkillsSectionProps {
  isVisible: boolean
}

export function SkillsSection({ isVisible }: SkillsSectionProps) {
  return (
    <div className="text-center mb-12">
        <Card className="p-8 mb-16 text-left">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-16 text-left"> 

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ delay: 1.0 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
    >
      {SKILLS.map((skill, index) => (
        <motion.div
          key={skill.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 + index * 0.1 }}
        >
          <Card className="p-6 text-center hover-lift cursor-pointer">
            <div className="text-2xl mb-2">{skill.icon}</div>
            <div className="text-white font-medium">{skill.name}</div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
    </div>
    </Card>
    </div>
  )
}
