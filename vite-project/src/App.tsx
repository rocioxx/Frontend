import React, { useEffect } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Header from './components/Header'
import Settings from './pages/Settings'
import Tasks from './pages/Tasks'
import Hola from './pages/Hola'
import Adios from './pages/Adios'
import Imagenes from './pages/Imagenes'
import { useStore } from '@tanstack/react-store'
import { appStore } from './store/appStore'

// Create a client for React Query
const queryClient = new QueryClient()

function App() {
  const theme = useStore(appStore, (s) => s.theme)

  // Apply theme to body for global styles
  useEffect(() => {
    // keep compatibility with existing tailwind theme class ('.dark')
    document.body.classList.remove('theme-light', 'theme-dark', 'light', 'dark')
    document.body.classList.add(`theme-${theme}`)
    // also/alternatively add the `.dark` or `.light` class used by tailwind tokens
    document.body.classList.add(theme === 'dark' ? 'dark' : 'light')
  }, [theme])

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Hola />} />
            <Route path="/Hola" element={<Hola />} />
            <Route path="/Adios" element={<Adios />} />
            <Route path="/Settings" element={<Settings />} />
            <Route path="/Tasks" element={<Tasks />} />
            <Route path="/Imagenes" element={<Imagenes />} />
          </Routes>
        </main>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App