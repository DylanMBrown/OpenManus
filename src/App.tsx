import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import WelcomeScreen from './components/WelcomeScreen'
import ImportModal from './components/ImportModal'
import Toast from './components/Toast'
import { ToastProvider } from './contexts/ToastContext'

function App() {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)

  return (
    <ToastProvider>
      <div className="min-h-screen bg-gray-950 text-gray-100">
        <Header onImportClick={() => setIsImportModalOpen(true)} />
        
        <main className="relative">
          <WelcomeScreen onImportClick={() => setIsImportModalOpen(true)} />
        </main>

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
    </ToastProvider>
  )
}

export default App