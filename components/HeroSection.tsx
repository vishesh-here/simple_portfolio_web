'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Download, Mail, Linkedin } from 'lucide-react'
import { usePortfolioConfig } from '@/lib/hooks'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

const floatingVariants = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

export function HeroSection() {  const config = usePortfolioConfig()
  
  // Return loading state if config is not yet loaded
  if (!config || !config.hero) {
    return (
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-neutral-600">Loading...</p>
        </div>
      </section>
    )
  }
  const { hero } = config

  const getCtaIcon = (type: string) => {
    switch (type) {
      case 'primary':
        return <ArrowRight size={18} />
      case 'secondary':
        return <Mail size={18} />
      case 'outline':
        return <Download size={18} />
      case 'link':
        return <Linkedin size={18} />
      default:
        return null
    }
  }

  const getCtaClass = (type: string) => {
    switch (type) {
      case 'primary':
        return 'btn-primary'
      case 'secondary':
        return 'btn-secondary'
      case 'outline':
        return 'btn-outline'
      case 'link':
        return 'btn-link'
      default:
        return 'btn-primary'
    }
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-hero-gradient bg-300% animate-gradient-shift opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
      
      {/* Enhanced Floating Elements */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full opacity-20 blur-3xl animate-pulse-slow"
      />
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-15 blur-3xl animate-pulse-slow"
        style={{ animationDelay: '2s' }}
      />
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-pink-400 to-indigo-500 rounded-full opacity-10 blur-2xl animate-pulse-slow"
        style={{ animationDelay: '4s' }}
      />
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute top-1/3 right-1/3 w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full opacity-15 blur-2xl animate-pulse-slow"
        style={{ animationDelay: '6s' }}
      />

      <div className="relative z-10 container-width section-padding">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Enhanced Content */}
          <div className="text-center lg:text-left">
            <motion.div variants={itemVariants} className="mb-8">
              <motion.span 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-sm border border-indigo-200/50 text-indigo-700 rounded-full text-sm font-semibold mb-6 shadow-lg"
              >
                <span className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></span>
                Available for new projects
              </motion.span>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-slate-900 leading-[0.85] tracking-tight mb-6">
                <motion.span 
                  className="block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  {hero.tagline?.split(' ').slice(0, 2).join(' ') || 'Welcome to'}
                </motion.span>
                <motion.span 
                  className="gradient-text block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  {hero.tagline?.split(' ').slice(2).join(' ') || 'My Portfolio'}
                </motion.span>
              </h1>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-xl lg:text-2xl text-slate-600 mb-12 max-w-3xl leading-relaxed font-light"
            >
              {hero.fullIntro}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mb-16"
            >
              {hero.ctas.map((cta: any, index: number) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={cta.href}
                    className={`${getCtaClass(cta.type)} group glow-effect`}
                  >
                    {cta.label}
                    <span className="ml-3 transition-transform duration-300 group-hover:translate-x-2">
                      {getCtaIcon(cta.type)}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-8 pt-12 border-t border-slate-200/60"
            >
              <motion.div 
                className="text-center lg:text-left group"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors duration-300">8+</div>
                <div className="text-sm text-slate-500 font-medium">Years Experience</div>
              </motion.div>
              <motion.div 
                className="text-center lg:text-left group"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">50+</div>
                <div className="text-sm text-slate-500 font-medium">Projects Completed</div>
              </motion.div>
              <motion.div 
                className="text-center lg:text-left group"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2 group-hover:text-pink-600 transition-colors duration-300">15+</div>
                <div className="text-sm text-slate-500 font-medium">Happy Clients</div>
              </motion.div>
            </motion.div>
          </div>

          {/* Enhanced Profile Image */}
          <motion.div
            variants={itemVariants}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Glow Effect Background */}
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute inset-0 bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 rounded-full opacity-30 blur-3xl"
              />
              
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  rotate: 2
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative w-80 h-80 lg:w-96 lg:h-96 xl:w-[28rem] xl:h-[28rem]"
              >
                {/* Premium Border */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full p-1">
                  <div className="w-full h-full rounded-full overflow-hidden bg-white">
                    <Image
                      src={hero.profileImage || '/images/placeholder-profile.jpg'}
                      alt={config.site.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
                
                {/* Floating Decorative Elements */}
                <motion.div
                  animate={{ 
                    y: [-10, 10, -10],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg"
                />
                <motion.div
                  animate={{ 
                    y: [10, -10, 10],
                    rotate: [360, 180, 0]
                  }}
                  transition={{ 
                    duration: 8, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: 2
                  }}
                  className="absolute -bottom-6 -left-6 w-6 h-6 bg-gradient-to-br from-green-400 to-blue-500 rounded-full shadow-lg"
                />
              </motion.div>
              
              {/* Enhanced Status Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 1.2, duration: 0.6, ease: "backOut" }}
                className="absolute -bottom-6 -right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border border-white/50 premium-shadow"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
                  <span className="text-xs font-semibold text-slate-700">Online</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-7 h-12 border-2 border-slate-300/60 rounded-full flex justify-center bg-white/20 backdrop-blur-sm shadow-lg"
        >
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-4 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full mt-2 shadow-sm"
          />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 0.5 }}
          className="text-xs text-slate-500 mt-3 text-center font-medium"
        >
          Scroll to explore
        </motion.p>
      </motion.div>
    </section>
  )
}