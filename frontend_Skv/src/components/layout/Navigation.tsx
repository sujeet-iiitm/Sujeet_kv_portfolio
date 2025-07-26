"use client"

import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { ProfileImage } from "@/components/common/ProfileImage"
import { useNavigation } from "@/hooks/useNavigation"
import { useMenuToggle } from "@/hooks/useMenuToggle"
import { NAVIGATION_ITEMS, MENU_ITEMS, PERSONAL_INFO } from "@/constants"

interface NavigationProps {
  isVisible: boolean
}

export function Navigation({ isVisible }: NavigationProps) {
  const { handleNavigation } = useNavigation()
  const { isOpen, toggle, close } = useMenuToggle()

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : -20,
      }}
      transition={{ duration: 0.3 }}
      className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50"
    >
      <div className="flex items-center gap-4" data-menu>
        <ProfileImage src={PERSONAL_INFO.profileImage} alt={(PERSONAL_INFO.name.toUpperCase())[0]} size="md" />

        <div className="glass-effect rounded-2xl px-6 py-3 shadow-lg">
          <div className="flex items-center gap-6">
            {NAVIGATION_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item)}
                className="text-white/80 hover:text-white transition-colors duration-200 text-sm font-medium hover-lift"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <button
            onClick={toggle}
            className="w-12 h-12 rounded-full glass-effect flex items-center justify-center text-white/80 hover:text-white transition-colors duration-200 hover-lift"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="absolute top-14 right-0 glass-effect rounded-xl p-4 shadow-lg min-w-[200px]"
            >
              <div className="flex flex-col gap-2">
                {MENU_ITEMS.map((item, index) => (
                  <div key={item.id}>
                    <button
                      onClick={close}
                      className="w-full text-white/80 hover:text-white transition-colors duration-200 text-sm font-medium text-left py-2 px-3 rounded-lg hover:bg-white/10"
                    >
                      {item.label}
                    </button>
                    {index === MENU_ITEMS.length - 2 && <hr className="border-white/10 my-2" />}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.nav>
  )
}
