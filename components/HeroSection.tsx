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
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      
      {/* Floating Elements */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute top-20 left-10 w-20 h-20 bg-primary-200 rounded-full opacity-20 blur-xl"
      />
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute bottom-20 right-10 w-32 h-32 bg-accent-200 rounded-full opacity-20 blur-xl"
        style={{ animationDelay: '2s' }}
      />
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary-300 rounded-full opacity-10 blur-lg"
        style={{ animationDelay: '4s' }}
      />

      <div className="relative z-10 container-width section-padding">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Content */}
          <div className="text-center lg:text-left">
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
                Available for new projects
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight">
                <span className="block">{hero.tagline?.split(' ').slice(0, 2).join(' ') || 'Welcome to'}</span>
                <span className="gradient-text">
                  {hero.tagline?.split(' ').slice(2).join(' ') || 'My Portfolio'}
                </span>
              </h1>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg lg:text-xl text-neutral-600 mb-8 max-w-2xl leading-relaxed"
            >
              {hero.fullIntro}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              {hero.ctas.map((cta: any, index: number) => (
                <Link
                  key={index}
                  href={cta.href}
                  className={`${getCtaClass(cta.type)} group`}
                >
                  {cta.label}
                  <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1">
                    {getCtaIcon(cta.type)}
                  </span>
                </Link>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-neutral-200"
            >
              <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl font-bold text-neutral-900">8+</div>
                <div className="text-sm text-neutral-600">Years Experience</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl font-bold text-neutral-900">50+</div>
                <div className="text-sm text-neutral-600">Projects Completed</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl font-bold text-neutral-900">15+</div>
                <div className="text-sm text-neutral-600">Happy Clients</div>
              </div>
            </motion.div>
          </div>

          {/* Profile Image */}
          <motion.div
            variants={itemVariants}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative w-80 h-80 lg:w-96 lg:h-96"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full opacity-20 blur-2xl" />
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl">
                  <Image
                    src={hero.profileImage || '/images/placeholder-profile.jpg'}
                    alt={config.site.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </motion.div>
              
              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -bottom-4 -right-4 bg-white rounded-full p-4 shadow-lg border border-neutral-200"
              >
                <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-neutral-300 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-neutral-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}