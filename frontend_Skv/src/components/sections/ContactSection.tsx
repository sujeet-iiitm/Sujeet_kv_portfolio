"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { PERSONAL_INFO } from "@/constants"
import { formatMailto, formatTel } from "@/lib/utils"
import { useState } from "react"
const VITE_BACKEND_URL = (import.meta as ImportMeta & { env: { VITE_BACKEND_URL: string } }).env.VITE_BACKEND_URL;
const VITE_jwt_secretkey = (import.meta as ImportMeta & { env: { VITE_jwt_secretkey: string } }).env.VITE_jwt_secretkey;


interface ContactSectionProps {
  isVisible: boolean
}

export function ContactSection({ isVisible }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  const contactItems = [
    {
      id: "email",
      icon: "📧",
      label: "Email",
      value: PERSONAL_INFO.email,
      href: formatMailto(PERSONAL_INFO.email, "Hello!"),
    },
    {
      id: "phone",
      icon: "📱",
      label: "Phone",
      value: PERSONAL_INFO.phone,
      href: formatTel(PERSONAL_INFO.phone),
    },
    {
      id: "location",
      icon: "📍",
      label: "Location",
      value: PERSONAL_INFO.location,
      href: null,
    },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    // Clear status when typing
    if (status.type) setStatus({ type: null, message: "" })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: "error", message: "Please fill in all required fields" })
      return
    }

    setIsSubmitting(true)
    setStatus({ type: null, message: "" })

    try {
      const response = await fetch(`${VITE_BACKEND_URL}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          jwt_secretkey: VITE_jwt_secretkey,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus({ type: "success", message: data.message })
        setFormData({ name: "", email: "", phone: "", message: "" })
      } else {
        setStatus({ type: "error", message: data.error })
      }
    } catch (error) {
      console.error("Frontend error:", error)
      setStatus({ type: "error", message: "Network error. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="text-center mb-12">
      <Card className="p-8 mb-16 text-left">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-16">
          <div className="-mt-5 text-2xl text-center">My Contacts</div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ delay: 1.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4"
          >
            {contactItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.8 + index * 0.1 }}
              >
                <Card
                  className={`p-6 text-center hover-lift ${item.href ? "cursor-pointer" : ""}`}
                  onClick={() => item.href && window.open(item.href, "_self")}
                >
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <div className="text-white font-medium">{item.label}</div>
                  <div className="text-neutral-400 text-sm">{item.value}</div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8 + contactItems.length * 0.1 }}
          className="-mt-10"
        >
          <Card className="p-6 mt-4 w-full">
            <h3 className="text-2xl font-semibold mb-4 text-center">Contact Me</h3>

            {/* Status Message */}
            {status.type && (
              <div
                className={`mb-4 p-3 rounded-lg text-center ${
                  status.type === "success"
                    ? "bg-green-500/20 border border-green-500/30 text-green-400"
                    : "bg-red-500/20 border border-red-500/30 text-red-400"
                }`}
              >
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name *"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-neutral-600 rounded-lg bg-transparent text-white placeholder-neutral-400 focus:border-blue-500 focus:outline-none transition-colors"
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email *"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-neutral-600 rounded-lg bg-transparent text-white placeholder-neutral-400 focus:border-blue-500 focus:outline-none transition-colors"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Your Phone (Optional)"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border border-neutral-600 rounded-lg bg-transparent text-white placeholder-neutral-400 focus:border-blue-500 focus:outline-none transition-colors"
              />

              <textarea
                name="message"
                placeholder="Your Message *"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full p-3 border border-neutral-600 rounded-lg bg-transparent text-white placeholder-neutral-400 focus:border-blue-500 focus:outline-none transition-colors resize-none"
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                variant="primary"
                className="w-full"
                isLoading={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Your Message"}
              </Button>
            </form>
          </Card>
        </motion.div>
      </Card>
    </div>
  )
}