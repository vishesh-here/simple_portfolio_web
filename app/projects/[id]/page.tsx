import React from 'react'
import { ProjectDetail } from '@/components/ProjectDetail'
import projects from '@/data/projects.json'

interface ProjectPageProps {
  params: {
    id: string
  }
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }))
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const project = projects.find((p) => p.id === params.id)
  
  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: `${project.title} - Alex Morgan`,
    description: project.description,
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  return <ProjectDetail projectId={params.id} />
}