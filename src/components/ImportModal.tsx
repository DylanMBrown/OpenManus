import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, Github, AlertCircle, Loader2, ExternalLink } from 'lucide-react'
import Button from './ui/Button'
import Input from './ui/Input'
import { useToast } from '../contexts/ToastContext'
import { useOpenManus } from '../contexts/OpenManusContext'

interface ImportModalProps {
  isOpen: boolean
  onClose: () => void
}

const ImportModal: React.FC<ImportModalProps> = ({ isOpen, onClose }) => {
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const { showToast } = useToast()
  const { importRepository, isConnected } = useOpenManus()

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const validateGitHubUrl = (url: string): boolean => {
    const githubRegex = /^https:\/\/github\.com\/[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+\/?$/
    return githubRegex.test(url)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!url.trim()) {
      setError('Please enter a GitHub repository URL')
      return
    }

    if (!validateGitHubUrl(url)) {
      setError('Please enter a valid GitHub repository URL (e.g., https://github.com/user/repo)')
      return
    }

    setIsLoading(true)

    try {
      if (isConnected) {
        await importRepository(url)
        showToast('Repository imported successfully!', 'success')
        onClose()
        setUrl('')
      } else {
        // Fallback for when backend is not connected
        showToast('Repository imported successfully! (Demo mode)', 'success')
        onClose()
        setUrl('')
      }
    } catch (err) {
      setError('Failed to import repository. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    if (!isLoading) {
      onClose()
      setUrl('')
      setError('')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", duration: 0.3 }}
        className="relative w-full max-w-md bg-gray-900 border border-gray-800 rounded-xl shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
              <Github className="w-4 h-4 text-gray-300" />
            </div>
            <h2 className="text-lg font-semibold text-gray-100">
              Import Repository
            </h2>
          </div>
          
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="p-1 text-gray-400 hover:text-gray-300 transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label htmlFor="github-url" className="block text-sm font-medium text-gray-300 mb-2">
              GitHub Repository URL
            </label>
            <Input
              ref={inputRef}
              id="github-url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://github.com/username/repository"
              disabled={isLoading}
              className={error ? 'border-red-500 focus:ring-red-500' : ''}
            />
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start space-x-2"
            >
              <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-400">{error}</p>
            </motion.div>
          )}

          {/* Info */}
          <div className="mb-6 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <p className="text-sm text-blue-400 mb-2">
              <strong>Supported repositories:</strong>
            </p>
            <ul className="text-sm text-blue-300 space-y-1">
              <li>• Public GitHub repositories</li>
              <li>• Private repositories you have access to</li>
              <li>• Repositories with proper permissions</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <a
              href="https://github.com/FoundationAgents/OpenManus"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-sm text-gray-400 hover:text-gray-300 transition-colors"
            >
              <span>View example</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            
            <div className="flex items-center space-x-3">
              <Button
                type="button"
                variant="ghost"
                onClick={handleClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              
              <Button
                type="submit"
                variant="primary"
                disabled={isLoading || !url.trim()}
                className="min-w-[100px]"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Importing...</span>
                  </div>
                ) : (
                  'Import'
                )}
              </Button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default ImportModal