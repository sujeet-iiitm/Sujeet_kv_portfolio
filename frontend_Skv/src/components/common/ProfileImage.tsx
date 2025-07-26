"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface ProfileImageProps {
  src: string
  alt: string
  size?: "sm" | "md" | "lg"
  className?: string
}

export function ProfileImage({ src, alt, size = "md", className }: ProfileImageProps) {
  const [imageError, setImageError] = useState(false)

  const sizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  }

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <div
      className={cn(
        "rounded-full overflow-hidden border-2 border-white/20 backdrop-blur-md bg-black/20 hover:scale-125 transition-transform duration-300",
        sizes[size],
        className,
      )}
    >
      {!imageError ? (
        <img
          src={src || "/skv_photo.jpg"}
          alt={alt}
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
          {alt.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  )
}
