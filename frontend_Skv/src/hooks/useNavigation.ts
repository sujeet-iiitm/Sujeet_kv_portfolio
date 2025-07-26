"use client"

import { useCallback } from "react"
import { scrollToElement } from "@/lib/utils"
import type { NavigationItem } from "@/types"

export function useNavigation() {
  const handleNavigation = useCallback((item: NavigationItem) => {
    if (item.external) {
      window.open(item.href, "_blank", "noopener,noreferrer")
      return
    }

    if (item.href.startsWith("#")) {
      const elementId = item.href.substring(1)
      if (elementId === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" })
      } else {
        scrollToElement(elementId)
      }
    }
  }, [])

  return { handleNavigation }
}
