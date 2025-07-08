import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Star, GitFork, Calendar, ExternalLink, Trash2, RefreshCw } from 'lucide-react'
import Button from './ui/Button'
import { useOpenManus } from '../contexts/OpenManusContext'
import { Repository } from '../services/api'

const RepositoryManager: React.FC = () => {
  const {
    repositories,
    currentRepository,
    selectRepository,
    refreshRepositories,
    isLoading
  } = useOpenManus()

  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await refreshRepositories()
    setIsRefreshing(false)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getLanguageColor = (language?: string) => {
    const colors: Record<string, string> = {
      JavaScript: 'bg-yellow-500',
      TypeScript: 'bg-blue-500',
      Python: 'bg-green-500',
      Java: 'bg-red-500',
      'C++': 'bg-purple-500',
      Go: 'bg-cyan-500',
      Rust: 'bg-orange-500',
      PHP: 'bg-indigo-500',
    }
    return colors[language || ''] || 'bg-gray-500'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-100">Repositories</h2>
        <Button
          variant="secondary"
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center space-x-2"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </Button>
      </div>

      {/* Current Repository */}
      {currentRepository && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <Github className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-100">Current Repository</h3>
              <p className="text-sm text-blue-400">{currentRepository.fullName}</p>
            </div>
          </div>
          
          {currentRepository.description && (
            <p className="text-gray-300 mb-4">{currentRepository.description}</p>
          )}
          
          <div className="flex items-center space-x-6 text-sm text-gray-400">
            {currentRepository.language && (
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${getLanguageColor(currentRepository.language)}`} />
                <span>{currentRepository.language}</span>
              </div>
            )}
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4" />
              <span>{currentRepository.stars}</span>
            </div>
            <div className="flex items-center space-x-1">
              <GitFork className="w-4 h-4" />
              <span>{currentRepository.forks}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>Updated {formatDate(currentRepository.updatedAt)}</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Repository List */}
      {repositories.length > 0 ? (
        <div className="grid gap-4">
          {repositories.map((repo) => (
            <motion.div
              key={repo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-gray-900/50 backdrop-blur-sm border rounded-xl p-6 transition-all duration-200 hover:border-gray-600 ${
                currentRepository?.id === repo.id
                  ? 'border-blue-500 bg-blue-500/5'
                  : 'border-gray-800'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-100">{repo.name}</h3>
                    {repo.isPrivate && (
                      <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">
                        Private
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{repo.fullName}</p>
                  {repo.description && (
                    <p className="text-gray-300 mb-3">{repo.description}</p>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(repo.url, '_blank')}
                    className="flex items-center space-x-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6 text-sm text-gray-400">
                  {repo.language && (
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)}`} />
                      <span>{repo.language}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4" />
                    <span>{repo.stars}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <GitFork className="w-4 h-4" />
                    <span>{repo.forks}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Updated {formatDate(repo.updatedAt)}</span>
                  </div>
                </div>
                
                <Button
                  variant={currentRepository?.id === repo.id ? "secondary" : "primary"}
                  size="sm"
                  onClick={() => selectRepository(repo)}
                  disabled={currentRepository?.id === repo.id}
                >
                  {currentRepository?.id === repo.id ? 'Selected' : 'Select'}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Github className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-300 mb-2">No repositories imported</h3>
          <p className="text-gray-400 mb-6">Import a GitHub repository to get started</p>
        </div>
      )}
    </div>
  )
}

export default RepositoryManager