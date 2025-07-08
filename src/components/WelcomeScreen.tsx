import React from 'react'
import { motion } from 'framer-motion'
import { Github, Sparkles, Code, Database, Globe, Zap } from 'lucide-react'
import Button from './ui/Button'
import QuickStartButton from './QuickStartButton'

interface WelcomeScreenProps {
  onImportClick: () => void
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onImportClick }) => {
  const quickStartOptions = [
    {
      icon: <Code className="w-5 h-5" />,
      title: "Create a financial app",
      description: "Build a modern financial dashboard with charts and analytics",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: "Make a landing page",
      description: "Design a beautiful landing page with modern components",
      gradient: "from-blue-500 to-cyan-600"
    },
    {
      icon: <Database className="w-5 h-5" />,
      title: "Build a data dashboard",
      description: "Create interactive dashboards with real-time data visualization",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "AI-powered chatbot",
      description: "Develop an intelligent chatbot with natural language processing",
      gradient: "from-orange-500 to-red-600"
    }
  ]

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Hero Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Build anything
            </span>
            <br />
            <span className="text-gray-100">
              with AI agents
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            OpenManus is an open-source framework for building general AI agents. 
            Create powerful applications without invitation codes or limitations.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button
              variant="primary"
              size="lg"
              onClick={onImportClick}
              className="flex items-center space-x-2 min-w-[200px]"
            >
              <Github className="w-5 h-5" />
              <span>Import Repository</span>
            </Button>
            
            <Button
              variant="secondary"
              size="lg"
              className="min-w-[200px]"
            >
              Start from Scratch
            </Button>
          </div>
        </motion.div>

        {/* Quick Start Options */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-2xl font-semibold text-gray-200 mb-8">
            Or start with a template
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {quickStartOptions.map((option, index) => (
              <QuickStartButton
                key={index}
                {...option}
                delay={0.1 * index}
              />
            ))}
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Code className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-200 mb-2">No Invite Codes</h3>
            <p className="text-gray-400">
              Open source and free to use. No waiting lists or restrictions.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-200 mb-2">Powerful Agents</h3>
            <p className="text-gray-400">
              Build sophisticated AI agents with multiple tools and capabilities.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Globe className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-200 mb-2">Community Driven</h3>
            <p className="text-gray-400">
              Join a growing community of developers building the future of AI.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default WelcomeScreen