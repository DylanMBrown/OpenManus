import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react'
import { useToast } from '../contexts/ToastContext'

const Toast: React.FC = () => {
  const { toasts, removeToast } = useToast()

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'error':
        return <XCircle className="w-5 h-5 text-red-400" />
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-400" />
      default:
        return <AlertCircle className="w-5 h-5 text-blue-400" />
    }
  }

  const getStyles = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-500/10 border-green-500/20'
      case 'error':
        return 'bg-red-500/10 border-red-500/20'
      case 'warning':
        return 'bg-yellow-500/10 border-yellow-500/20'
      default:
        return 'bg-blue-500/10 border-blue-500/20'
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 300, scale: 0.3 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.5 }}
            transition={{ type: "spring", duration: 0.4 }}
            className={`flex items-center space-x-3 p-4 rounded-lg border backdrop-blur-sm min-w-[300px] max-w-md ${getStyles(toast.type)}`}
          >
            {getIcon(toast.type)}
            <p className="text-sm text-gray-100 flex-1">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-gray-300 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default Toast