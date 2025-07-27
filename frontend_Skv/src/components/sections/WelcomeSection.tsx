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
      className={`relative z-10 block text-2xl xxs:text-3xl xs:text-4xl sm:text-5xl md:text-7xl lg:text-[10rem] xl:text-[12rem] 2xl:text-[15rem] leading-none transition-colors duration-300 ${
        isHovered ? "text-white" : "text-stone-400"
      }`}
      style={{
        fontFamily: "'Bitcount Prop Single', system-ui",
        fontWeight: 400,
        fontVariationSettings: '"slnt" 0, "CRSV" 0.5, "ELSH" 0, "ELXP" 0',
        letterSpacing: "-0.05em",
        padding: "0.01em 0.005em",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {letter}
    </span>
  )
}

// Video block component with ultra-responsive styling
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
            <div className="w-4 h-4 xxs:w-5 xxs:h-5 xs:w-6 xs:h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 mx-auto mb-1 opacity-50">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span className="text-xs xxs:text-xs xs:text-sm sm:text-base font-medium">
              Video {delay === 0 ? "1" : delay === 0.3 ? "2" : delay === 0.6 ? "3" : "4"}
            </span>
          </div>
        </div>
      )}
    </motion.div>
  )
}

// Ultra-responsive social links
function SocialLinks() {
  const links = [
    { name: "Instagram", url: "https://instagram.com/sujeet_kv" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/sujeet-kumar-693b5128b/" },
  ]

  return (
    <motion.div
      className="bg-stone-400 h-full p-2 xxs:p-3 xs:p-4 sm:p-6 md:p-8 flex flex-col justify-center rounded"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div className="space-y-1.5 xxs:space-y-2 xs:space-y-3 sm:space-y-4 md:space-y-6">
        {links.map((link, index) => (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 xxs:gap-2 xs:gap-3 md:gap-4 text-black hover:text-gray-600 transition-colors touch-manipulation"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-xs xxs:text-sm xs:text-base sm:text-lg md:text-2xl">—</span>
            <span className="text-xs xxs:text-xs xs:text-sm sm:text-base md:text-xl font-medium hover-underline">{link.name}</span>
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
    <span className={className} >
      {currentText}
      <motion.span
        className="inline-block w-0.5 xxs:w-0.5 xs:w-1 h-2.5 xxs:h-3 xs:h-4 sm:h-6 md:h-8 bg-white ml-0.5 xs:ml-1"
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
    
    // Check screen size with more granular breakpoints
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

  // Calculate shrinking effect based on scroll
  const shrinkStart = SCROLL_THRESHOLDS.HIDE_WELCOME * 0.3
  const shrinkProgress = Math.max(
    0,
    Math.min(1, (scrollProgress - shrinkStart) / (SCROLL_THRESHOLDS.HIDE_WELCOME - shrinkStart)),
  )

  // Scale and position calculations for shrinking effect
  const scale = 1 - shrinkProgress * 0.8
  const opacity = 1 - shrinkProgress * 0.7

  // Ultra-responsive center adjustments
  const isXXS = screenSize.width < 360
  const isXS = screenSize.width >= 360 && screenSize.width < 480
  const isSM = screenSize.width >= 480 && screenSize.width < 640
  const isMD = screenSize.width >= 640 && screenSize.width < 768
  const isTablet = screenSize.width >= 768 && screenSize.width < 1024
  
  const centerX = shrinkProgress * (isXXS ? 8 : isXS ? 10 : isSM ? 12 : isMD ? 15 : isTablet ? 30 : 50)
  const centerY = shrinkProgress * (isXXS ? 5 : isXS ? 8 : isSM ? 10 : isMD ? 12 : isTablet ? 20 : 30)

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
        {/* Ultra Mobile Layout (< 768px) */}
        <div className="block md:hidden min-h-screen px-1 xxs:px-2 xs:px-3 sm:px-4">
          {/* Floating top videos - asymmetric placement */}
          <motion.div
            className="absolute top-2 xxs:top-3 xs:top-4 sm:top-6 left-1 xxs:left-2 xs:left-3"
            animate={{
              y: shrinkProgress * -15,
              x: shrinkProgress * 5,
            }}
            transition={{ duration: 0.1 }}
          >
            <VideoBlock className="w-14 h-12 xxs:w-16 xxs:h-14 xs:w-20 xs:h-16 sm:w-28 sm:h-20" delay={0} videoSrc="/silver.mp4" />
          </motion.div>

          <motion.div
            className="absolute top-1 xxs:top-2 xs:top-3 sm:top-4 right-1 xxs:right-2 xs:right-3"
            animate={{
              y: shrinkProgress * -12,
              x: shrinkProgress * -5,
            }}
            transition={{ duration: 0.1 }}
          >
            <VideoBlock className="w-20 h-14 xxs:w-24 xxs:h-16 xs:w-28 xs:h-18 sm:w-36 sm:h-24" delay={0.3} videoSrc="/astranaut.mp4" />
          </motion.div>

          {/* Additional floating video - top right */}
          <motion.div
            className="absolute top-16 xxs:top-18 xs:top-20 sm:top-24 right-8 xxs:right-10 xs:right-12 sm:right-16"
            animate={{
              y: shrinkProgress * -18,
              x: shrinkProgress * -8,
            }}
            transition={{ duration: 0.1 }}
          >
            <VideoBlock className="w-12 h-10 xxs:w-14 xxs:h-12 xs:w-16 xs:h-14 sm:w-20 sm:h-16" delay={0.6} videoSrc="/robo.mp4" />
          </motion.div>

          {/* Main title - optimized for very small screens */}
          <motion.div
            className="absolute top-20 xxs:top-24 xs:top-28 sm:top-36 left-0 right-0 flex flex-col items-center px-1"
            animate={{
              x: shrinkProgress * 5,
              y: shrinkProgress * -10,
            }}
            transition={{ duration: 0.1 }}
          >
            <div className="flex flex-wrap justify-center items-center mb-1 xxs:mb-2 xs:mb-3 sm:mb-4 leading-none">
              {letters.map((letter, index) => (
                <AnimatedLetter key={index} letter={letter} />
              ))}
            </div>

            {/* Subtitle with Typewriter Effect - more compact */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isLoaded ? 1 : 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="text-center px-1 xxs:px-2"
            >
              <TypewriterText
                texts={["Full Stack Developer", "Problem Solver"]}
                className="text-xs xxs:text-sm xs:text-base sm:text-lg text-white/80 font-light"
              />
            </motion.div>
          </motion.div>

          {/* Middle section - robot video floating left */}
          <motion.div
            className="absolute top-44 xxs:top-52 xs:top-60 sm:top-72 left-1 xxs:left-2 xs:left-3"
            animate={{
              y: shrinkProgress * -25,
              x: shrinkProgress * 8,
            }}
            transition={{ duration: 0.1 }}
          >
            <VideoBlock className="w-16 h-14 xxs:w-20 xxs:h-16 xs:w-24 xs:h-20 sm:w-32 sm:h-24" delay={0.6} videoSrc="/robo.mp4" />
          </motion.div>

          {/* Social links - positioned to balance layout */}
          <motion.div
            className="absolute top-48 xxs:top-56 xs:top-64 sm:top-76 right-1 xxs:right-2 xs:right-3 left-20 xxs:left-24 xs:left-28 sm:left-36"
            animate={{
              y: shrinkProgress * -20,
              x: shrinkProgress * -5,
            }}
            transition={{ duration: 0.1 }}
          >
            <div className="h-12 xxs:h-14 xs:h-16 sm:h-20">
              <SocialLinks />
            </div>
          </motion.div>

          {/* Bottom floating video */}
          <motion.div
            className="absolute bottom-20 xxs:bottom-24 xs:bottom-28 sm:bottom-32 right-1 xxs:right-2 xs:right-3"
            animate={{
              y: shrinkProgress * -15,
              x: shrinkProgress * -3,
            }}
            transition={{ duration: 0.1 }}
          >
            <VideoBlock className="w-18 h-12 xxs:w-20 xxs:h-14 xs:w-24 xs:h-16 sm:w-32 sm:h-20" delay={0.9} videoSrc="/venera.mp4" />
          </motion.div>

          {/* Bottom text - more compact */}
          <motion.div
            className="absolute bottom-8 xxs:bottom-10 xs:bottom-12 sm:bottom-14 left-1 right-1 text-white text-opacity-60 text-xs xxs:text-xs xs:text-sm font-light text-center leading-tight px-2 xxs:px-3 xs:px-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{
              opacity: 1 - shrinkProgress,
              y: 0 + shrinkProgress * 20,
            }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            Reach me out through the mail below -or-<br className="xxs:hidden" />
            <span className="hidden xxs:inline"><br /></span>
            connect with me on social media.
          </motion.div>
        </div>

        {/* Tablet Layout (768px - 1024px) */}
        <div className="hidden md:block lg:hidden">
          {/* Top left video block */}
          <motion.div
            animate={{
              x: shrinkProgress * 120,
              y: shrinkProgress * 80,
            }}
            transition={{ duration: 0.1 }}
          >
            <VideoBlock className="absolute top-16 left-16 w-40 h-40" delay={0} videoSrc="/silver.mp4" />
          </motion.div>

          {/* Top center video block */}
          <motion.div
            animate={{
              x: shrinkProgress * -60,
              y: shrinkProgress * 80,
            }}
            transition={{ duration: 0.1 }}
          >
            <VideoBlock className="absolute z-10 left-64 w-56 h-40 overflow-hidden" delay={0.3} videoSrc="/robo.mp4" />
          </motion.div>

          {/* Top right video block */}
          <motion.div
            className="absolute top-12 right-12 w-56 h-40"
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <VideoBlock videoSrc="/astranaut.mp4" className="w-full h-full" />
          </motion.div>

          {/* Large "SUJEET" text */}
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

            {/* Subtitle with Typewriter Effect */}
            <motion.div
              className="absolute bottom-2 left-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: isLoaded ? 1 : 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              <TypewriterText
                texts={["Full Stack Developer ", "Problem Solver "]}
                className="text-xl text-white/80 font-light"
              />
            </motion.div>
          </motion.div>

          {/* Social links block */}
          <motion.div
            animate={{
              x: shrinkProgress * -100,
              y: shrinkProgress * -60,
            }}
            transition={{ duration: 0.1 }}
          >
            <motion.div className="absolute m-4 top-64 right-0 w-64 h-36 overflow-hidden pointer-events-auto">
              <SocialLinks />
            </motion.div>
          </motion.div>

          {/* Bottom right video block */}
          <motion.div
            className="absolute bottom-24 right-32 w-56 h-28 m-6"
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <VideoBlock videoSrc="/venera.mp4" className="w-full h-full" />
          </motion.div>

          {/* Subtitle text */}
          <motion.div
            className="absolute bottom-12 left-12 text-white text-opacity-60 text-base font-light max-w-md leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1 - shrinkProgress,
              y: 0 + shrinkProgress * 60,
            }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            Reach me out through the mail below -or-<br/>connect with me on social media.
          </motion.div>
        </div>

        {/* Desktop Layout (> 1024px) */}
        <div className="hidden lg:block">
          {/* Top left video block */}
          <motion.div
            animate={{
              x: shrinkProgress * 200,
              y: shrinkProgress * 150,
            }}
            transition={{ duration: 0.1 }}
          >
            <VideoBlock className="absolute top-20 left-20 w-48 h-48 xl:w-60 xl:h-60" delay={0} videoSrc="/silver.mp4" />
          </motion.div>

          {/* Top center video block */}
          <motion.div
            animate={{
              x: shrinkProgress * -100,
              y: shrinkProgress * 150,
            }}
            transition={{ duration: 0.1 }}
          >
            <VideoBlock className="absolute z-10 left-80 w-80 h-60 overflow-hidden" delay={0.3} videoSrc="/robo.mp4" />
          </motion.div>

          {/* Top right video block */}
          <motion.div
            className="absolute top-16 right-16 w-80 h-64"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <VideoBlock videoSrc="/astranaut.mp4" className="w-full h-full" />
          </motion.div>

          {/* Large "SUJEET" text */}
          <motion.div
            className="absolute top-80 left-16 transform -translate-y-1/2 flex items-center"
            animate={{
              x: shrinkProgress * 100,
              y: shrinkProgress * -50,
            }}
            transition={{ duration: 0.1 }}
          >
            <div className="flex items-center">
              {letters.map((letter, index) => (
                <AnimatedLetter key={index} letter={letter} />
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
                className="text-2xl xl:text-4xl text-white/80 font-light"
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
            <motion.div className="absolute m-6 top-80 right-0 w-96 h-50 overflow-hidden pointer-events-auto">
              <SocialLinks />
            </motion.div>
          </motion.div>

          {/* Bottom right video block */}
          <motion.div
            className="absolute bottom-42 right-40 w-80 h-40 m-10"
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
        </div>

        {/* Ultra-responsive Scroll Indicator */}
        <motion.div
          className="absolute bottom-1 xxs:bottom-2 xs:bottom-3 sm:bottom-4 md:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 15 }}
          transition={{ delay: 3.5, duration: 0.8 }}
        >
          <motion.div
            className="flex flex-col items-center gap-0.5 xxs:gap-1 xs:gap-1.5 sm:gap-2 text-white/50"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <span className="text-xs xxs:text-xs xs:text-sm font-medium">Scroll to explore</span>
            <ArrowDown size={12} className="xxs:w-3 xxs:h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}