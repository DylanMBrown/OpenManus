import React from 'react'
import { motion } from 'framer-motion'
import { Github, Zap } from 'lucide-react'
import Button from './ui/Button'

interface HeaderProps {
  onImportClick: () => void
  onDashboardClick: () => void
}

const Header: React.FC<HeaderProps> = ({ onImportClick, onDashboardClick }) => {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              OpenManus
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              Documentation
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              Examples
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              Community
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={onImportClick}
              className="hidden sm:flex items-center space-x-2"
            >
              <Github className="w-4 h-4" />
              <span>Import Repository</span>
            </Button>
            
            <Button variant="primary" onClick={onDashboardClick}>
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

export default Header