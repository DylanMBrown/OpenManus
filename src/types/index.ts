export interface Repository {
  id: string
  name: string
  fullName: string
  url: string
  description?: string
  isPrivate: boolean
  language?: string
  stars: number
  forks: number
  updatedAt: string
}

export interface ImportResult {
  success: boolean
  repository?: Repository
  error?: string
}

export interface QuickStartTemplate {
  id: string
  title: string
  description: string
  icon: string
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedTime: string
  technologies: string[]
}