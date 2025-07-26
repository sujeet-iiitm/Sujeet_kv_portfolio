"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/Card"

interface AboutSectionProps {
  isVisible: boolean
}

export function AboutSection({ isVisible }: AboutSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ delay: 1.4 }}
    >
      <Card className="p-8 mb-16 text-left">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-16 text-left"> 
  <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 text-">About Me</h3>

  <p className="text-neutral-300 text-lg leading-relaxed mb-4">
    Passionate about technology and driven by curiosity, I love building solutions that blend creativity with code. 
    Always eager to learn, explore, and grow in the ever-evolving tech landscape.
  </p>

  <h4 className="text-white font-semibold mb-2"><b>Education :</b></h4>
  <ul className="text-neutral-300 text-lg leading-relaxed list-disc list-inside mb-4">
    <li>10th: @ D.A.V Public School — 81.4%</li>
    <li>12th: B.S.E.B Board — 71.4%</li>
    <li>Currently: Pursuing B.Tech in CSE (AI & DS) @ IIIT Senapati, Manipur — CPI: 7.05</li>
  </ul>

  
</div>

      </Card>
    </motion.div>
  )
}
