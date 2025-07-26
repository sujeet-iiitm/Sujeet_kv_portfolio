"use client"

import { useState, useEffect } from "react"
import { throttle } from "@/lib/utils"
import { SCROLL_THRESHOLDS } from "@/constants"
import type { ScrollState } from "@/types"

export function useScrollState(): ScrollState {
  const [scrollState, setScrollState] = useState<ScrollState>({
    scrollY: 0,
    isScrolled: false,
    showMainContent: false,
  })

  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollY = window.pageYOffset

      setScrollState({
        scrollY,
        isScrolled: scrollY > 50,
        showMainContent: scrollY > SCROLL_THRESHOLDS.SHOW_MAIN_CONTENT,
      })
    }, 16)

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return scrollState
}
