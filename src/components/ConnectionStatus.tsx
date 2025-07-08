import React from 'react'
import { motion } from 'framer-motion'
import { Wifi, WifiOff, RefreshCw } from 'lucide-react'
import { useOpenManus } from '../contexts/OpenManusContext'

interface ConnectionStatusProps {
  collapsed?: boolean
}

const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ collapsed = false }) => {
  const { isConnected, checkConnection } = useOpenManus()
  const [isChecking, setIsChecking] = React.useState(false)

  const handleRefresh = async () => {
    setIsChecking(true)
    await checkConnection()
    setTimeout(() => setIsChecking(false), 1000)
  }

  return (
    <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'} space-x-2`}>
      <div className="flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`} />
        {!collapsed && (
          <span className={`text-sm ${isConnected ? 'text-green-400' : 'text-red-400'}`}>
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        )}
      </div>
      
      {!collapsed && (
        <button
          onClick={handleRefresh}
          disabled={isChecking}
          className="p-1 text-gray-400 hover:text-gray-300 transition-colors"
        >
          <RefreshCw className={`w-3 h-3 ${isChecking ? 'animate-spin' : ''}`} />
        </button>
      )}
    </div>
  )
}

export default ConnectionStatus