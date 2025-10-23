"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useState } from "react"

const socialLinks = [
  { icon: "🐙", label: "GitHub", url: "https://github.com/tejaswa-jaiswal" },
  { icon: "💼", label: "LinkedIn", url: "https://www.linkedin.com/in/tejaswa-jaiswal-278a282a2/" },
  { icon: "📸", label: "Instagram", url: "https://instagram.com/tejaswa_jaiswal_" },
  { icon: "📊", label: "Kaggle", url: "https://www.kaggle.com/tejaswajaiswal" },
]

export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
  

    const phoneNumber = "917879668529"; // your number (no + sign, no spaces)
    const text = `Hello, I'm ${formData.name} (${formData.email}).%0A%0A${formData.message}`;
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${text}`;

    // Open WhatsApp chat
    window.open(whatsappURL, "_blank");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }
  
  return (
    <section id="contact" className="relative py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={inView ? "visible" : "hidden"}>
          {/* Section Title */}
          <motion.div variants={itemVariants} className="mb-16 text-center">
            <h2 className="font-orbitron text-4xl md:text-5xl font-bold glow-text-cyan mb-4">Get In Touch</h2>
            <p className="text-muted-foreground text-lg">
              Let's collaborate and create something extraordinary together
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div variants={itemVariants} className="glass p-8 rounded-xl border border-border/50">
             <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Your name"
          className="w-full px-4 py-2 border rounded-lg"
          required
        />

        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="your@email.com"
          className="w-full px-4 py-2 border rounded-lg"
          required
        />

        <textarea
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Your message..."
          className="w-full px-4 py-2 border rounded-lg h-32"
          required
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary text-primary rounded-lg font-semibold"
        >
          Send via WhatsApp
        </motion.button>
      </form>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex flex-col justify-center space-y-8">
              <div>
                <h3 className="font-orbitron text-2xl font-bold text-primary mb-6">Connect With Me</h3>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((link, i) => (
                    <motion.a
                      key={i}
                      href={link.url}
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="glass p-6 rounded-lg border border-border/50 hover:border-primary/50 flex flex-col items-center justify-center gap-3 transition-all group"
                    >
                      <span className="text-4xl">{link.icon}</span>
                      <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                        {link.label}
                      </span>
                      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-50 glow-purple pointer-events-none" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Quick Info */}
              <div className="glass p-6 rounded-lg border border-border/50">
                <p className="text-muted-foreground">
                  <span className="text-primary font-semibold">Available for:</span> Freelance projects, collaborations,
                  and full-time opportunities.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
