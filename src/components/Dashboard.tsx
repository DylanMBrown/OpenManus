import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  MessageSquare, 
  Github, 
  Settings, 
  Activity,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import AgentInterface from './AgentInterface'
import RepositoryManager from './RepositoryManager'
import ConnectionStatus from './ConnectionStatus'

type DashboardTab = 'agent' | 'repositories' | 'settings'

interface DashboardProps {
  onBack: () => void
}

const Dashboard: React.FC<DashboardProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('agent')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const tabs = [
    {
      id: 'agent' as const,
      name: 'Agent Interface',
      icon: <MessageSquare className="w-5 h-5" />,
      description: 'Run AI agents and view results'
    },
    {
      id: 'repositories' as const,
      name: 'Repositories',
      icon: <Github className="w-5 h-5" />,
      description: 'Manage imported repositories'
    },
    {
      id: 'settings' as const,
      name: 'Settings',
      icon: <Settings className="w-5 h-5" />,
      description: 'Configure OpenManus settings'
    }
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'agent':
        return <AgentInterface />
      case 'repositories':
        return <RepositoryManager />
      case 'settings':
        return (
          <div className="text-center py-12">
            <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-300 mb-2">Settings</h3>
            <p className="text-gray-400">Configuration options coming soon...</p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ width: sidebarCollapsed ? 80 : 280 }}
        className="bg-gray-900/50 backdrop-blur-sm border-r border-gray-800 flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <div>
                <h1 className="text-xl font-bold text-gray-100">OpenManus</h1>
                <p className="text-sm text-gray-400">AI Agent Platform</p>
              </div>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 text-gray-400 hover:text-gray-300 transition-colors"
            >
              {sidebarCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800/50'
                }`}
              >
                {tab.icon}
                {!sidebarCollapsed && (
                  <div className="text-left">
                    <div className="font-medium">{tab.name}</div>
                    <div className="text-xs opacity-75">{tab.description}</div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* Connection Status */}
        <div className="p-4 border-t border-gray-800">
          <ConnectionStatus collapsed={sidebarCollapsed} />
        </div>

        {/* Back Button */}
        <div className="p-4">
          <button
            onClick={onBack}
            className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-gray-400 hover:text-gray-300 hover:bg-gray-800/50 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            {!sidebarCollapsed && <span>Back to Home</span>}
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Content Header */}
        <div className="bg-gray-950/80 backdrop-blur-sm border-b border-gray-800 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-100">
                {tabs.find(tab => tab.id === activeTab)?.name}
              </h2>
              <p className="text-gray-400">
                {tabs.find(tab => tab.id === activeTab)?.description}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-green-400" />
              <span className="text-sm text-gray-400">System Active</span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8 overflow-y-auto">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard