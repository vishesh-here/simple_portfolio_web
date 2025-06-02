'use client'

import React from 'react'
import Link from 'next/link'
import { Heart, ArrowUp } from 'lucide-react'
import { usePortfolioConfig } from '@/lib/hooks'

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()
  const config = usePortfolioConfig()

  // Show loading state if config is not loaded yet
  if (!config || !config.site) {
    return (
      <footer className="bg-neutral-900 text-white">
        <div className="container-width section-padding">
          <div className="py-16 text-center">
            <div className="w-32 h-6 bg-neutral-700 animate-pulse rounded mx-auto"></div>
          </div>
        </div>
      </footer>
    )
  }
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="container-width section-padding">
        {/* Main Footer Content */}
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <div className="text-2xl font-bold gradient-text">
                {config.site.title}
              </div>
            </Link>
            <p className="text-neutral-400 mb-6 max-w-md leading-relaxed">
              {config.site.description}. Creating digital experiences that make a difference.
            </p>
            <div className="flex gap-4">
              {config.contact.social.map((social: any) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-neutral-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-all duration-200"
                  aria-label={social.platform}
                >
                  <span className="text-sm">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '#hero' },
                { label: 'Services', href: '#services' },
                { label: 'Projects', href: '#projects' },
                { label: 'About', href: '#about' },
                { label: 'Contact', href: '#contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Get in Touch</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${config.contact.email}`}
                  className="text-neutral-400 hover:text-white transition-colors duration-200"
                >
                  {config.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${config.contact.phone}`}
                  className="text-neutral-400 hover:text-white transition-colors duration-200"
                >
                  {config.contact.phone}
                </a>
              </li>
              <li>
                <span className="text-neutral-400">
                  {config.contact.location}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-neutral-400">
            <span>© {currentYear} {config.site.title}. Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>in San Francisco</span>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/admin"
              className="text-neutral-400 hover:text-white transition-colors duration-200"
            >
              Admin
            </Link>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors duration-200"
              aria-label="Back to top"
            >
              Back to top
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}