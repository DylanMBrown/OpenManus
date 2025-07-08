import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import WelcomeScreen from './components/WelcomeScreen'
import ImportModal from './components/ImportModal'
import Dashboard from './components/Dashboard'
import Toast from './components/Toast'
import { ToastProvider } from './contexts/ToastContext'
import { OpenManusProvider } from './contexts/OpenManusContext'

function App() {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)
  const [showDashboard, setShowDashboard] = useState(false)

  return (
    <ToastProvider>
      <OpenManusProvider>
      <div className="min-h-screen bg-gray-950 text-gray-100">
        {showDashboard ? (
          <Dashboard onBack={() => setShowDashboard(false)} />
        ) : (
          <>
            <Header 
              onImportClick={() => setIsImportModalOpen(true)}
              onDashboardClick={() => setShowDashboard(true)}
            />
            
            <main className="relative">
              <WelcomeScreen 
                onImportClick={() => setIsImportModalOpen(true)}
                onGetStarted={() => setShowDashboard(true)}
              />
            </main>
          </>
        )}

        <AnimatePresence>
          {isImportModalOpen && (
            <ImportModal
              isOpen={isImportModalOpen}
              onClose={() => setIsImportModalOpen(false)}
            />
          )}
        </AnimatePresence>

        <Toast />
      </div>
      </OpenManusProvider>
    </ToastProvider>
  )
}

export default App