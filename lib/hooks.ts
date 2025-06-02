import { useState, useEffect } from 'react'
import React from 'react'

export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.pageYOffset)
    }

    window.addEventListener('scroll', updatePosition)
    updatePosition()

    return () => window.removeEventListener('scroll', updatePosition)
  }, [])

  return scrollPosition
}

export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold: 0.1, ...options }
    )

    observer.observe(element)
    return () => observer.unobserve(element)
  }, [elementRef, options])

  return isIntersecting
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue] as const
}

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    const listener = () => setMatches(media.matches)
    media.addListener(listener)
    return () => media.removeListener(listener)
  }, [matches, query])

  return matches
}

// Portfolio Data Hooks - Read from localStorage with static JSON fallback
export function usePortfolioConfig() {
  // Import static data as fallback
  const [staticConfig, setStaticConfig] = useState<any>(null)
  
  useEffect(() => {
    // Dynamically import static config
    import('@/data/config.json').then((data) => {
      setStaticConfig(data.default)
    })
  }, [])

  const [storedConfig] = useLocalStorage('admin-config', null)
  
  // Return localStorage data if available, otherwise static data
  return storedConfig || staticConfig
}

export function usePortfolioProjects() {
  const [staticProjects, setStaticProjects] = useState<any[]>([])
  
  useEffect(() => {
    import('@/data/projects.json').then((data) => {
      setStaticProjects(data.default)
    })
  }, [])

  const [storedProjects] = useLocalStorage('admin-projects', [])
  
  return storedProjects.length > 0 ? storedProjects : staticProjects
}

export function usePortfolioCareer() {
  const [staticCareer, setStaticCareer] = useState<any[]>([])
  
  useEffect(() => {
    import('@/data/career.json').then((data) => {
      setStaticCareer(data.default)
    })
  }, [])

  const [storedCareer] = useLocalStorage('admin-career', [])
  
  return storedCareer.length > 0 ? storedCareer : staticCareer
}

export function usePortfolioTestimonials() {
  const [staticTestimonials, setStaticTestimonials] = useState<any[]>([])
  
  useEffect(() => {
    import('@/data/testimonials.json').then((data) => {
      setStaticTestimonials(data.default)
    })
  }, [])

  const [storedTestimonials] = useLocalStorage('admin-testimonials', [])
  
  return storedTestimonials.length > 0 ? storedTestimonials : staticTestimonials
}