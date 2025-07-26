import type React from "react"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "solid"
  children: React.ReactNode
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "glass", children, ...props }, ref) => {
    const variants = {
      default: "bg-white/5 border border-white/10",
      glass: "glass-effect",
      solid: "bg-gray-800 border border-gray-700",
    }

    return (
      <div ref={ref} className={cn("rounded-xl backdrop-blur-sm", variants[variant], className)} {...props}>
        {children}
      </div>
    )
  },
)

Card.displayName = "Card"
