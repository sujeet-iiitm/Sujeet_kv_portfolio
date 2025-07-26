"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/Card"
import { PROJECTS } from "@/constants"

interface ProjectsSectionProps {
  isVisible: boolean
}
function VideoBlock({
  videoSrc,
  className = "",
  delay = 0,
  overlayColor,
}: {
  videoSrc?: string
  className?: string
  delay?: number
  overlayColor?: string
}) {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay }}
    >
      {videoSrc ? (
        <>
          <video className="w-full h-full object-cover" autoPlay loop muted playsInline>
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {overlayColor && (
            <div className="absolute inset-0 mix-blend-multiply opacity-60" style={{ backgroundColor: overlayColor }} />
          )}
        </>
      ) : (
        <div
          className={`w-full h-full flex items-center justify-center ${overlayColor ? "bg-gray-600" : "bg-gray-800"}`}
        >
          <div className="text-gray-400 text-center">
            <div className="w-16 h-16 mx-auto mb-4 opacity-50">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span className="text-lg font-medium">
              Video {delay === 0 ? "1" : delay === 0.3 ? "2" : delay === 0.6 ? "3" : "4"}
            </span>
            <div className="text-sm mt-1 opacity-70">Replace with your video</div>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export function ProjectsSection({ isVisible }:ProjectsSectionProps) {
  return (
    <div className="text-center mb-12">
        <Card className="p-8 mb-16 text-left">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-16 text-left">

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ delay: 1.0 }}
      className="md:grid-cols-4 gap-6 mb-16 m-6"
    >
      {/* {PROJECTS.map((Projects, index) => (
        <motion.div
          key={Projects.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 + index * 0.1 }}
        >
          <Card className="p-6 text-center hover-lift cursor-pointer">
            <div className="text-white font-medium">{Projects.image}</div>
            <div className="text-2xl mb-2">{Projects.title}</div>
            <div className="text-white font-medium">{Projects.description}</div>
            <div className="text-white font-medium">{Projects.link}</div>
            <div className="text-white font-medium">{Projects.description}</div>
          </Card>
        </motion.div>
      ))} */}
      <motion.div
        className="flex flex-col h-60 w-80 mb-10"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <VideoBlock videoSrc="/Cooking.mp4" className="w-full h-full rounded-xl justify-center items-center"/>
      </motion.div>
      <motion.div
        className="text-4xl md:text-6xl font-bold justify-center items-center bottom-10"
        animate={{ rotate: [0, -5, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
      C🍽️🍪king
      </motion.div>

    </motion.div>
    </div>
    </Card>
    </div>
  )
}
