'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useScrollPosition, usePortfolioConfig } from '@/lib/hooks'

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#career' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const scrollPosition = useScrollPosition()
  const isScrolled = scrollPosition > 50
  const config = usePortfolioConfig()
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])
  // Show loading state if config is not loaded yet
  if (!config || !config.site) {
    return (
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-md border-b border-neutral-200/50 shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <nav className="container-width section-padding">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="w-32 h-6 bg-neutral-200 animate-pulse rounded"></div>
          </div>
        </nav>
      </motion.header>
    )
  }
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-2xl premium-shadow'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-width section-padding">
        <div className="flex items-center justify-between h-18 lg:h-22">
          {/* Enhanced Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ duration: 0.3 }}
              className="text-2xl lg:text-3xl font-display font-bold gradient-text"
            >
              {config.site.title}
            </motion.div>
          </Link>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-10">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="relative text-slate-600 hover:text-slate-900 transition-all duration-300 font-semibold text-sm tracking-wide group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Enhanced Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="lg:hidden p-3 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/30 hover:bg-white/90 transition-all duration-300 shadow-lg"
            aria-label="Toggle menu"
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? <X size={20} className="text-slate-700" /> : <Menu size={20} className="text-slate-700" />}
            </motion.div>
          </motion.button>
        </div>
      </nav>

      {/* Enhanced Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="lg:hidden bg-white/90 backdrop-blur-xl border-t border-white/30 shadow-2xl"
          >
            <div className="container-width section-padding py-8">
              <div className="flex flex-col space-y-6">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block text-xl font-semibold text-slate-700 hover:text-slate-900 transition-all duration-300 py-2 px-4 rounded-xl hover:bg-slate-50/80 group"
                    >
                      <span className="flex items-center justify-between">
                        {item.label}
                        <motion.span
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          className="text-indigo-500 group-hover:translate-x-2 transition-transform duration-300"
                        >
                          →
                        </motion.span>
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}