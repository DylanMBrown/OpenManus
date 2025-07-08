import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Square, Loader2, MessageSquare, Code, Database, Globe } from 'lucide-react'
import Button from './ui/Button'
import Input from './ui/Input'
import { useOpenManus } from '../contexts/OpenManusContext'

const AgentInterface: React.FC = () => {
  const [prompt, setPrompt] = useState('')
  const [selectedAgent, setSelectedAgent] = useState<'manus' | 'browser' | 'swe' | 'data_analysis'>('manus')
  
  const {
    currentAgent,
    isAgentRunning,
    agentHistory,
    isConnected,
    runAgent,
    stopAgent
  } = useOpenManus()

  const agentTypes = [
    {
      id: 'manus' as const,
      name: 'Manus Agent',
      description: 'General-purpose AI agent for various tasks',
      icon: <MessageSquare className="w-5 h-5" />,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      id: 'browser' as const,
      name: 'Browser Agent',
      description: 'Web automation and browser-based tasks',
      icon: <Globe className="w-5 h-5" />,
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'swe' as const,
      name: 'SWE Agent',
      description: 'Software engineering and code-related tasks',
      icon: <Code className="w-5 h-5" />,
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: 'data_analysis' as const,
      name: 'Data Analysis',
      description: 'Data processing and analysis tasks',
      icon: <Database className="w-5 h-5" />,
      color: 'from-orange-500 to-red-600'
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim() || isAgentRunning) return

    await runAgent({
      prompt: prompt.trim(),
      agent_type: selectedAgent,
      max_steps: 20
    })
  }

  const handleStop = async () => {
    await stopAgent()
  }

  if (!isConnected) {
    return (
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 text-center">
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageSquare className="w-8 h-8 text-red-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-100 mb-2">
          Backend Not Connected
        </h3>
        <p className="text-gray-400 mb-6">
          Make sure the OpenManus backend is running on localhost:8000
        </p>
        <div className="bg-gray-800/50 rounded-lg p-4 text-left">
          <p className="text-sm text-gray-300 mb-2">To start the backend:</p>
          <code className="text-sm text-green-400 bg-gray-900 px-2 py-1 rounded">
            python main.py
          </code>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Agent Selection */}
      <div>
        <h3 className="text-lg font-semibold text-gray-100 mb-4">Select Agent Type</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {agentTypes.map((agent) => (
            <button
              key={agent.id}
              onClick={() => setSelectedAgent(agent.id)}
              className={`p-4 rounded-lg border transition-all duration-200 text-left ${
                selectedAgent === agent.id
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
              }`}
            >
              <div className={`w-8 h-8 bg-gradient-to-br ${agent.color} rounded-lg flex items-center justify-center mb-3 text-white`}>
                {agent.icon}
              </div>
              <h4 className="font-medium text-gray-100 mb-1">{agent.name}</h4>
              <p className="text-xs text-gray-400">{agent.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Prompt Input */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">
            Enter your prompt
          </label>
          <div className="relative">
            <Input
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe what you want the agent to do..."
              disabled={isAgentRunning}
              className="pr-24"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              {isAgentRunning ? (
                <Button
                  type="button"
                  variant="danger"
                  size="sm"
                  onClick={handleStop}
                  className="flex items-center space-x-1"
                >
                  <Square className="w-3 h-3" />
                  <span>Stop</span>
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={!prompt.trim()}
                  className="flex items-center space-x-1"
                >
                  <Play className="w-3 h-3" />
                  <span>Run</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </form>

      {/* Current Agent Status */}
      {currentAgent && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-100">Current Agent</h3>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              currentAgent.status === 'running' 
                ? 'bg-blue-500/20 text-blue-400'
                : currentAgent.status === 'completed'
                ? 'bg-green-500/20 text-green-400'
                : 'bg-red-500/20 text-red-400'
            }`}>
              {isAgentRunning && <Loader2 className="w-3 h-3 animate-spin inline mr-1" />}
              {currentAgent.status}
            </div>
          </div>

          {currentAgent.result && (
            <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
              <h4 className="text-sm font-medium text-gray-300 mb-2">Result:</h4>
              <pre className="text-sm text-gray-100 whitespace-pre-wrap">{currentAgent.result}</pre>
            </div>
          )}

          {currentAgent.error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-4">
              <h4 className="text-sm font-medium text-red-400 mb-2">Error:</h4>
              <pre className="text-sm text-red-300 whitespace-pre-wrap">{currentAgent.error}</pre>
            </div>
          )}

          {currentAgent.steps && currentAgent.steps.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-3">Steps:</h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {currentAgent.steps.map((step, index) => (
                  <div key={index} className="bg-gray-800/30 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-gray-400">Step {step.step}</span>
                      <span className="text-xs text-gray-500">{step.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-300 mb-1">{step.action}</p>
                    <p className="text-xs text-gray-400">{step.result}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Agent History */}
      {agentHistory.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-100 mb-4">Recent Runs</h3>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {agentHistory.slice(-5).reverse().map((agent, index) => (
              <div key={agent.id} className="bg-gray-900/30 border border-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-300">Run #{agentHistory.length - index}</span>
                  <div className={`px-2 py-1 rounded text-xs ${
                    agent.status === 'completed'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {agent.status}
                  </div>
                </div>
                {agent.result && (
                  <p className="text-sm text-gray-400 truncate">{agent.result.substring(0, 100)}...</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default AgentInterface