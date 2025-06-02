export interface Project {
  id: string
  title: string
  description: string
  thumbnail: string
  tags: string[]
  year: string
  client: string
  duration: string
  role: string
  overview: string
  challenge: string
  solution: string
  results: string[]
  images: string[]
  content: ProjectContent[]
}

export interface ProjectContent {
  type: 'text' | 'image' | 'table'
  content?: string
  src?: string
  caption?: string
  headers?: string[]
  rows?: string[][]
}

export interface CareerItem {
  id: string
  title: string
  company: string
  location: string
  startDate: string
  endDate: string | null
  description: string
  technologies: string[]
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  avatar: string
  rating: number
}

export interface Config {
  name: string
  title: string
  description: string
  email: string
  phone: string
  location: string
  website: string
  social: {
    linkedin: string
    github: string
    twitter: string
    dribbble: string
  }
  resume: string
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
}