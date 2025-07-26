"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { SCROLL_THRESHOLDS } from "@/constants"
import { ArrowDown } from "lucide-react"


interface WelcomeSectionProps {
  scrollProgress: number
}


function AnimatedLetter({ letter }: { letter: string }) {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <span 
    className={`relative z-10 block text-[8rem] md:text-[12rem] lg:text-[15rem] leading-none transition-colors duration-300 ${
      isHovered ? "text-white" : "text-stone-400"
    }`}
    style={{
      fontFamily: "'Bitcount Prop Single', system-ui",
      fontWeight: 400,
      fontVariationSettings: '"slnt" 0, "CRSV" 0.5, "ELSH" 0, "ELXP" 0',
      letterSpacing: "-0.05em",
      padding: "0.1em 0.05em",
    }}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    >
      {letter}
    </span>
  )
}

// Video block component with specific styling
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
            <div className="text-sm mt-1 opacity-70">video</div>
          </div>
        </div>
      )}
    </motion.div>
  )
}

// Social links component
function SocialLinks() {
  const links = [
    { name: "Instagram", url: "https://instagram.com/sujeet_kv" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/sujeet-kumar-693b5128b/" },
  ]

  return (
    <motion.div
      className="bg-stone-400 h-full p-8 flex flex-col justify-center rounded-lg"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div className="space-y-6">
        {links.map((link, index) => (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 text-black hover:text-gray-600 transition-colors"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
            whileHover={{ x: 10 }}
          >
            <span className="text-2xl">—</span>
            <span className="text-xl font-medium hover-underline">{link.name}</span>
          </motion.a>
        ))}
      </div>
    </motion.div>
  )
}

function TypewriterText({ texts, className }: { texts: string[]; className?: string }) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        const fullText = texts[currentTextIndex]

        if (isDeleting) {
          setCurrentText(fullText.substring(0, currentText.length - 1))
        } else {
          setCurrentText(fullText.substring(0, currentText.length + 1))
        }

        if (!isDeleting && currentText === fullText) {
          setTimeout(() => setIsDeleting(true), 2000)
        } else if (isDeleting && currentText === "") {
          setIsDeleting(false)
          setCurrentTextIndex((prev) => (prev + 1) % texts.length)
        }
      },
      isDeleting ? 50 : 100,
    )

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, texts, currentTextIndex])

  return (
    <span className={className}>
      {currentText}
      <motion.span
        className="inline-block w-1 h-8 bg-white ml-1"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
      />
    </span>
  )
}

export function WelcomeSection({ scrollProgress }: WelcomeSectionProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)

  const isVisible = scrollProgress <= SCROLL_THRESHOLDS.HIDE_WELCOME

  useEffect(() => {
    setIsLoaded(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Calculate shrinking effect based on scroll
  const shrinkStart = SCROLL_THRESHOLDS.HIDE_WELCOME * 0.3 // Start shrinking at 30% of scroll threshold
  const shrinkProgress = Math.max(
    0,
    Math.min(1, (scrollProgress - shrinkStart) / (SCROLL_THRESHOLDS.HIDE_WELCOME - shrinkStart)),
  )

  // Scale and position calculations for shrinking effect
  const scale = 1 - shrinkProgress * 0.8 // Shrink to 20% of original size
  const opacity = 1 - shrinkProgress * 0.7 // Fade out slightly

  // Move elements toward center
  const centerX = shrinkProgress * 50 // Move toward center horizontally
  const centerY = shrinkProgress * 30 // Move toward center vertically

  if (!isVisible) return null

  const letters = "SUJEET".split("")

  return (
    <motion.div
      className="fixed inset-0 z-1 overflow-hidden"
      animate={{
        opacity,
        scale,
      }}
      transition={{ duration: 0.1 }}
      style={{
        transformOrigin: "center center",
      }}
    >
      <motion.div
        className="h-full w-full relative"
        animate={{
          x: centerX,
          y: centerY,
        }}
        transition={{ duration: 0.1 }}
      >
        {/* Top left video block */}
        <motion.div
          animate={{
            x: shrinkProgress * 200, // Move toward center
            y: shrinkProgress * 150,
          }}
          transition={{ duration: 0.1 }}
        >
          <VideoBlock className="absolute top-20 left-20 w-60 h-60 rounded-lg" delay={0} videoSrc="/silver.mp4" />
        </motion.div>

        {/* Top right video block */}
        <motion.div
          animate={{
            x: shrinkProgress * -200, // Move toward center
            y: shrinkProgress * 150,
          }}
          transition={{ duration: 0.1 }}
        >
          <VideoBlock className="absolute z-10 left-80 w-80 h-60 overflow-hidden" delay={0.3} videoSrc="/robo.mp4" />
        </motion.div>

        {/* top right most video block */}
        <motion.div
          className="absolute top-16 right-16 w-80 h-64"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <VideoBlock videoSrc="/astranaut.mp4" className="w-full h-full" />
        </motion.div>


        {/* Large "SUJEET" text with brain visualization */}
        <motion.div
          className="absolute top-80 left-16 transform -translate-y-1/2 flex items-center"
          animate={{
            x: shrinkProgress * 100,
            y: shrinkProgress * -50,
          }}
          transition={{ duration: 0.1 }}
        >
          <div className="flex items-center">
            {letters.map((letter) => (
              <AnimatedLetter letter={letter} />
            ))}
          </div>

          {/* Subtitle with Typewriter Effect */}
          <motion.div
            className="absolute bottom-2 left-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <TypewriterText
              texts={["Full Stack Developer ", "Problem Solver "]}
              className="text-2xl md:text-4xl text-white/80 font-light"
            />
          </motion.div>
        </motion.div>
        

        {/* Social links block */}
        <motion.div
          animate={{
            x: shrinkProgress * -150,
            y: shrinkProgress * -100,
          }}
          transition={{ duration: 0.1 }}
        >
        <motion.div
          className="absolute m-6 top-80 right-0 w-96 h-50 overflow-hidden pointer-events-auto"
        >
          <SocialLinks />
        </motion.div>
        </motion.div>


        {/* bottom right video block */}
        <motion.div
          className="absolute top-140 right-40 w-80 h-40 m-10"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <VideoBlock videoSrc="/venera.mp4" className="w-full h-full" />
        </motion.div>

        {/* Subtitle text */}
        <motion.div
          className="absolute bottom-16 left-16 text-white text-opacity-60 text-lg font-light max-w-md leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1 - shrinkProgress,
            y: 0 + shrinkProgress * 100,
          }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          Reach me out through the mail below -or-<br/>connect with me on social media.
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ delay: 3.5, duration: 0.8 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2 text-white/50"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <span className="text-sm font-medium">Scroll to explore</span>
            <ArrowDown size={20} />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}