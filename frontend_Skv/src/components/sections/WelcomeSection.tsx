"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { ArrowDown } from "lucide-react"

interface WelcomeSectionProps {
  scrollProgress: number
}

const SCROLL_THRESHOLDS = {
  HIDE_WELCOME: 100
}

function AnimatedLetter({ letter }: { letter: string }) {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <span 
      className={`relative z-10 block transition-colors duration-300 ${
        isHovered ? "text-white" : "text-stone-400"
      }`}
      style={{
        fontFamily: "'Bitcount Prop Single', system-ui",
        fontWeight: 400,
        fontVariationSettings: '"slnt" 0, "CRSV" 0.5, "ELSH" 0, "ELXP" 0',
        letterSpacing: "-0.05em",
        padding: "0.01em 0.005em",
        fontSize: "clamp(2.25rem, 12vw, 30rem)", 
        lineHeight: "0.85"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {letter}
    </span>
  )
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
      className={`relative overflow-hidden rounded ${className}`}
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
            <div className="w-6 h-6 mx-auto mb-1 opacity-50">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span className="text-xs font-medium">
              Video {delay === 0 ? "1" : delay === 0.3 ? "2" : delay === 0.6 ? "3" : "4"}
            </span>
          </div>
        </div>
      )}
    </motion.div>
  )
}

function SocialLinks() {
  const links = [
    { name: "Instagram", url: "https://instagram.com/sujeet_kv" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/sujeet-kumar-693b5128b/" },
  ]

  return (
    <motion.div
      className="bg-stone-400 h-full p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col justify-center rounded"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6">
        {links.map((link, index) => (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 sm:gap-3 md:gap-4 text-black hover:text-gray-600 transition-colors touch-manipulation min-h-[44px] -m-1 p-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-sm sm:text-lg md:text-2xl">—</span>
            <span className="text-sm sm:text-base md:text-xl font-medium">{link.name}</span>
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
        className="inline-block w-0.5 bg-white ml-1"
        style={{ height: "1em" }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
      />
    </span>
  )
}

export function WelcomeSection({ scrollProgress }: WelcomeSectionProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 })

  const isVisible = scrollProgress <= SCROLL_THRESHOLDS.HIDE_WELCOME

  useEffect(() => {
    setIsLoaded(true)
    
    const updateScreenSize = () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight })
    }
    
    updateScreenSize()
    window.addEventListener('resize', updateScreenSize)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener('resize', updateScreenSize)
    }
  }, [])

  const shrinkStart = SCROLL_THRESHOLDS.HIDE_WELCOME * 0.3
  const shrinkProgress = Math.max(
    0,
    Math.min(1, (scrollProgress - shrinkStart) / (SCROLL_THRESHOLDS.HIDE_WELCOME - shrinkStart)),
  )

  const scale = 1 - shrinkProgress * 0.8
  const opacity = 1 - shrinkProgress * 0.7

  const centerX = shrinkProgress * (screenSize.width < 640 ? 8 : screenSize.width < 1024 ? 20 : 50)
  const centerY = shrinkProgress * (screenSize.width < 640 ? 5 : screenSize.width < 1024 ? 15 : 30)

  if (!isVisible) return null

  const letters = "SUJEET".split("")

  return (
    <motion.div
      className="fixed inset-0 z-10 overflow-hidden"
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
        <div className="block md:hidden min-h-screen relative">
          <div className="flex flex-col min-h-screen p-4 gap-4">
            
            <div className="flex justify-between items-start mb-4">
              <motion.div
                animate={{
                  y: shrinkProgress * -10,
                  x: shrinkProgress * 3,
                }}
                transition={{ duration: 0.1 }}
              >
                <VideoBlock className="w-16 h-12 sm:w-20 sm:h-14" delay={0} videoSrc="/silver.mp4" />
              </motion.div>
              
              <motion.div
                animate={{
                  y: shrinkProgress * -8,
                  x: shrinkProgress * -3,
                }}
                transition={{ duration: 0.1 }}
              >
                <VideoBlock className="w-20 h-14 sm:w-24 sm:h-16" delay={0.3} videoSrc="/astranaut.mp4" />
              </motion.div>
            </div>

            <motion.div
              className="flex-1 flex flex-col items-center justify-center text-center px-2"
              animate={{
                x: shrinkProgress * 2,
                y: shrinkProgress * -5,
              }}
              transition={{ duration: 0.1 }}
            >
              {/* SUJEET text with better mobile sizing */}
              <div className="flex items-center justify-center flex-wrap mb-4">
                {letters.map((letter, index) => (
                  <AnimatedLetter key={index} letter={letter} />
                ))}
              </div>

              {/* Subtitle with proper mobile sizing */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoaded ? 1 : 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="px-4"
              >
                <TypewriterText
                  texts={["Full Stack Developer", "Problem Solver"]}
                  className="text-base sm:text-lg text-white/80 font-light"
                />
              </motion.div>
            </motion.div>

            {/* Middle section with video and social links */}
            <div className="flex items-center gap-4 mb-4">
              <motion.div
                className="flex-shrink-0"
                animate={{
                  y: shrinkProgress * -12,
                  x: shrinkProgress * 4,
                }}
                transition={{ duration: 0.1 }}
              >
                <VideoBlock className="w-20 h-16 sm:w-24 sm:h-18" delay={0.6} videoSrc="/robo.mp4" />
              </motion.div>

              <motion.div
                className="flex-1 min-h-[60px]"
                animate={{
                  y: shrinkProgress * -10,
                  x: shrinkProgress * -2,
                }}
                transition={{ duration: 0.1 }}
              >
                <SocialLinks />
              </motion.div>
            </div>

            {/* Bottom section */}
            <div className="flex justify-between items-end">
              <motion.div
                className="text-white/60 text-sm font-light max-w-[60%] leading-relaxed"
                initial={{ opacity: 0, y: 15 }}
                animate={{
                  opacity: 1 - shrinkProgress,
                  y: shrinkProgress * 10,
                }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                Reach me out through the mail below or connect with me on social media.
              </motion.div>

              <motion.div
                animate={{
                  y: shrinkProgress * -8,
                  x: shrinkProgress * -2,
                }}
                transition={{ duration: 0.1 }}
              >
                <VideoBlock className="w-18 h-12 sm:w-20 sm:h-14" delay={0.9} videoSrc="/venera.mp4" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Tablet Layout (768px - 1024px) */}
        <div className="hidden md:block lg:hidden">
          <motion.div
            animate={{
              x: shrinkProgress * 120,
              y: shrinkProgress * 80,
            }}
            transition={{ duration: 0.1 }}
          >
            <VideoBlock className="absolute top-16 left-16 w-40 h-40" delay={0} videoSrc="/silver.mp4" />
          </motion.div>

          <motion.div
            animate={{
              x: shrinkProgress * -60,
              y: shrinkProgress * 80,
            }}
            transition={{ duration: 0.1 }}
          >
            <VideoBlock className="absolute z-10 left-64 w-56 h-40 overflow-hidden" delay={0.3} videoSrc="/robo.mp4" />
          </motion.div>

          <motion.div
            className="absolute top-12 right-12 w-56 h-40"
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <VideoBlock videoSrc="/astranaut.mp4" className="w-full h-full" />
          </motion.div>

          <motion.div
            className="absolute top-64 left-12 transform -translate-y-1/2 flex items-center"
            animate={{
              x: shrinkProgress * 60,
              y: shrinkProgress * -30,
            }}
            transition={{ duration: 0.1 }}
          >
            <div className="flex items-center">
              {letters.map((letter, index) => (
                <AnimatedLetter key={index} letter={letter} />
              ))}
            </div>

            <motion.div
              className="absolute bottom-2 left-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: isLoaded ? 1 : 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              <TypewriterText
                texts={["Full Stack Developer", "Problem Solver"]}
                className="text-xl text-white/80 font-light"
              />
            </motion.div>
          </motion.div>

          <motion.div
            animate={{
              x: shrinkProgress * -100,
              y: shrinkProgress * -60,
            }}
            transition={{ duration: 0.1 }}
          >
            <motion.div className="absolute m-4 top-64 right-0 w-64 h-36 overflow-hidden">
              <SocialLinks />
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute bottom-24 right-32 w-56 h-28 m-6"
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <VideoBlock videoSrc="/venera.mp4" className="w-full h-full" />
          </motion.div>

          <motion.div
            className="absolute bottom-12 left-12 text-white text-opacity-60 text-base font-light max-w-md leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1 - shrinkProgress,
              y: 0 + shrinkProgress * 60,
            }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            Reach me out through the mail below or connect with me on social media.
          </motion.div>
        </div>

        {/* Desktop Layout (> 1024px) - UPDATED */}
        <div className="hidden lg:block">
          <motion.div
            animate={{
              x: shrinkProgress * 200,
              y: shrinkProgress * 150,
            }}
            transition={{ duration: 0.1 }}
          >
            <VideoBlock className="absolute top-20 left-20 w-48 h-48 xl:w-60 xl:h-60" delay={0} videoSrc="/silver.mp4" />
          </motion.div>

          <motion.div
            animate={{
              x: shrinkProgress * -100,
              y: shrinkProgress * 150,
            }}
            transition={{ duration: 0.1 }}
          >
            <VideoBlock className="absolute z-10 left-80 w-80 h-60 overflow-hidden" delay={0.3} videoSrc="/robo.mp4" />
          </motion.div>

          <motion.div
            className="absolute top-16 right-16 w-80 h-64"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <VideoBlock videoSrc="/astranaut.mp4" className="w-full h-full" />
          </motion.div>

          <motion.div
            className="relative -top-36 left-16 transform -translate-y-1/2 flex flex-col items-start"
            animate={{
              x: shrinkProgress * 100,
              y: shrinkProgress * -50,
            }}
            transition={{ duration: 0.1 }}
          >
            <div className="flex items-center mb-12">
              {letters.map((letter, index) => (
                <AnimatedLetter key={index} letter={letter} />
              ))}
            </div>

            <motion.div
              className="relative z-50 ml-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: isLoaded ? 1 : 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              <TypewriterText
                texts={["Full Stack Developer", "Problem Solver"]}
                className="text-3xl xl:text-5xl text-white/80 font-light"
              />
            </motion.div>
          </motion.div>

          <motion.div
            animate={{
              x: shrinkProgress * -150,
              y: shrinkProgress * -100,
            }}
            transition={{ duration: 0.1 }}
          >
            <motion.div className="absolute m-6 top-80 right-0 w-96 h-50 overflow-hidden">
              <SocialLinks />
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute -bottom-2 right-40 w-80 h-40 m-10"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <VideoBlock videoSrc="/venera.mp4" className="w-full h-full" />
          </motion.div>

          <motion.div
            className="absolute bottom-16 left-16 text-white text-opacity-60 text-lg font-light max-w-md leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1 - shrinkProgress,
              y: 0 + shrinkProgress * 100,
            }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            Reach me out through the mail below or connect with me on social media.
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 15 }}
          transition={{ delay: 3.5, duration: 0.8 }}
        >
          <motion.div
            className="flex flex-col items-center gap-1 sm:gap-2 text-white/50"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <span className="text-xs sm:text-sm font-medium">Scroll to explore</span>
            <ArrowDown size={16} className="sm:w-5 sm:h-5" />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}