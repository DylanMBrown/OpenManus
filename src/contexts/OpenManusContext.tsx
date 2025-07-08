import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { api, AgentRequest, AgentResponse, Repository } from '../services/api'
import { useToast } from './ToastContext'

interface OpenManusContextType {
  // Agent state
  currentAgent: AgentResponse | null
  isAgentRunning: boolean
  agentHistory: AgentResponse[]
  
  // Repository state
  repositories: Repository[]
  currentRepository: Repository | null
  
  // Connection state
  isConnected: boolean
  isLoading: boolean
  
  // Actions
  runAgent: (request: AgentRequest) => Promise<void>
  stopAgent: () => Promise<void>
  importRepository: (url: string) => Promise<Repository>
  selectRepository: (repo: Repository) => void
  refreshRepositories: () => Promise<void>
  checkConnection: () => Promise<boolean>
}

const OpenManusContext = createContext<OpenManusContextType | undefined>(undefined)

export const useOpenManus = () => {
  const context = useContext(OpenManusContext)
  if (!context) {
    throw new Error('useOpenManus must be used within an OpenManusProvider')
  }
  return context
}

export const OpenManusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentAgent, setCurrentAgent] = useState<AgentResponse | null>(null)
  const [isAgentRunning, setIsAgentRunning] = useState(false)
  const [agentHistory, setAgentHistory] = useState<AgentResponse[]>([])
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [currentRepository, setCurrentRepository] = useState<Repository | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const { showToast } = useToast()

  // Check backend connection
  const checkConnection = useCallback(async (): Promise<boolean> => {
    try {
      await api.healthCheck()
      setIsConnected(true)
      return true
    } catch (error) {
      setIsConnected(false)
      return false
    }
  }, [])

  // Run agent
  const runAgent = useCallback(async (request: AgentRequest) => {
    if (isAgentRunning) {
      showToast('An agent is already running', 'warning')
      return
    }

    setIsLoading(true)
    setIsAgentRunning(true)

    try {
      const response = await api.runAgent(request)
      setCurrentAgent(response)
      
      // Poll for updates if agent is running
      if (response.status === 'running') {
        const pollInterval = setInterval(async () => {
          try {
            const status = await api.getAgentStatus(response.id)
            setCurrentAgent(status)
            
            if (status.status === 'completed' || status.status === 'error') {
              clearInterval(pollInterval)
              setIsAgentRunning(false)
              setAgentHistory(prev => [...prev, status])
              
              if (status.status === 'completed') {
                showToast('Agent completed successfully!', 'success')
              } else {
                showToast('Agent encountered an error', 'error')
              }
            }
          } catch (error) {
            clearInterval(pollInterval)
            setIsAgentRunning(false)
            showToast('Failed to get agent status', 'error')
          }
        }, 2000)
      } else {
        setIsAgentRunning(false)
        setAgentHistory(prev => [...prev, response])
      }
    } catch (error) {
      setIsAgentRunning(false)
      showToast('Failed to run agent', 'error')
      console.error('Agent run failed:', error)
    } finally {
      setIsLoading(false)
    }
  }, [isAgentRunning, showToast])

  // Stop agent
  const stopAgent = useCallback(async () => {
    if (!currentAgent || !isAgentRunning) return

    try {
      await api.stopAgent(currentAgent.id)
      setIsAgentRunning(false)
      showToast('Agent stopped', 'info')
    } catch (error) {
      showToast('Failed to stop agent', 'error')
      console.error('Agent stop failed:', error)
    }
  }, [currentAgent, isAgentRunning, showToast])

  // Import repository
  const importRepository = useCallback(async (url: string): Promise<Repository> => {
    setIsLoading(true)
    try {
      const repository = await api.importRepository(url)
      setRepositories(prev => [...prev, repository])
      showToast('Repository imported successfully!', 'success')
      return repository
    } catch (error) {
      showToast('Failed to import repository', 'error')
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [showToast])

  // Select repository
  const selectRepository = useCallback((repo: Repository) => {
    setCurrentRepository(repo)
    showToast(`Selected repository: ${repo.name}`, 'info')
  }, [showToast])

  // Refresh repositories
  const refreshRepositories = useCallback(async () => {
    try {
      const repos = await api.getRepositories()
      setRepositories(repos)
    } catch (error) {
      console.error('Failed to refresh repositories:', error)
    }
  }, [])

  // Initialize connection on mount
  useEffect(() => {
    checkConnection()
    refreshRepositories()
  }, [checkConnection, refreshRepositories])

  const value: OpenManusContextType = {
    currentAgent,
    isAgentRunning,
    agentHistory,
    repositories,
    currentRepository,
    isConnected,
    isLoading,
    runAgent,
    stopAgent,
    importRepository,
    selectRepository,
    refreshRepositories,
    checkConnection,
  }

  return (
    <OpenManusContext.Provider value={value}>
      {children}
    </OpenManusContext.Provider>
  )
}