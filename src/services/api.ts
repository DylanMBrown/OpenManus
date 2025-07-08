// API service for OpenManus backend integration
export interface OpenManusConfig {
  baseUrl: string
  apiKey?: string
}

export interface AgentRequest {
  prompt: string
  agent_type?: 'manus' | 'browser' | 'swe' | 'data_analysis'
  max_steps?: number
}

export interface AgentResponse {
  id: string
  status: 'running' | 'completed' | 'error'
  result?: string
  error?: string
  steps?: AgentStep[]
}

export interface AgentStep {
  step: number
  action: string
  result: string
  timestamp: string
}

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

class OpenManusAPI {
  private config: OpenManusConfig
  private baseUrl: string

  constructor(config: OpenManusConfig = { baseUrl: 'http://localhost:8000' }) {
    this.config = config
    this.baseUrl = config.baseUrl
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    const headers = {
      'Content-Type': 'application/json',
      ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` }),
      ...options.headers,
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Agent operations
  async runAgent(request: AgentRequest): Promise<AgentResponse> {
    return this.request<AgentResponse>('/api/agent/run', {
      method: 'POST',
      body: JSON.stringify(request),
    })
  }

  async getAgentStatus(id: string): Promise<AgentResponse> {
    return this.request<AgentResponse>(`/api/agent/${id}/status`)
  }

  async stopAgent(id: string): Promise<void> {
    await this.request(`/api/agent/${id}/stop`, {
      method: 'POST',
    })
  }

  // Repository operations
  async importRepository(url: string): Promise<Repository> {
    return this.request<Repository>('/api/repository/import', {
      method: 'POST',
      body: JSON.stringify({ url }),
    })
  }

  async getRepositories(): Promise<Repository[]> {
    return this.request<Repository[]>('/api/repositories')
  }

  async getRepository(id: string): Promise<Repository> {
    return this.request<Repository>(`/api/repository/${id}`)
  }

  // Template operations
  async getTemplates(): Promise<any[]> {
    return this.request<any[]>('/api/templates')
  }

  async createFromTemplate(templateId: string, name: string): Promise<any> {
    return this.request('/api/template/create', {
      method: 'POST',
      body: JSON.stringify({ templateId, name }),
    })
  }

  // Health check
  async healthCheck(): Promise<{ status: string; version: string }> {
    return this.request<{ status: string; version: string }>('/api/health')
  }
}

export const api = new OpenManusAPI()
export default OpenManusAPI