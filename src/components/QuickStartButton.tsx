import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface QuickStartButtonProps {
  icon: React.ReactNode
  title: string
  description: string
  gradient: string
  delay?: number
  onClick?: () => void
}

const QuickStartButton: React.FC<QuickStartButtonProps> = ({
  icon,
  title,
  description,
  gradient,
  delay = 0,
  onClick
}) => {
  return (
    <motion.button
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 text-left hover:border-gray-700 transition-all duration-300 hover:bg-gray-900/70"
    >
      {/* Gradient overlay on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300`} />
      
      {/* Icon */}
      <div className={`w-10 h-10 bg-gradient-to-br ${gradient} rounded-lg flex items-center justify-center mb-4 text-white`}>
        {icon}
      </div>
      
      {/* Content */}
      <h3 className="text-lg font-semibold text-gray-100 mb-2 group-hover:text-white transition-colors">
        {title}
      </h3>
      
      <p className="text-sm text-gray-400 mb-4 leading-relaxed group-hover:text-gray-300 transition-colors">
        {description}
      </p>
      
      {/* Arrow */}
      <div className="flex items-center text-gray-500 group-hover:text-gray-300 transition-colors">
        <span className="text-sm font-medium mr-2">Get started</span>
        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
      </div>
    </motion.button>
  )
}

export default QuickStartButton