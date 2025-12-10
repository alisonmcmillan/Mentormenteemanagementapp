import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { projectId, publicAnonKey } from './utils/supabase/info'
import { Login } from './components/Login'
import { Signup } from './components/Signup'
import { Dashboard } from './components/Dashboard'

export default function App() {
  const [view, setView] = useState<'login' | 'signup' | 'dashboard'>('login')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkSession()
  }, [])

  const checkSession = async () => {
    try {
      const supabase = createClient(
        `https://${projectId}.supabase.co`,
        publicAnonKey
      )

      const { data: { session }, error } = await supabase.auth.getSession()

      if (session && !error) {
        setIsAuthenticated(true)
        setView('dashboard')
      }
    } catch (err) {
      console.error('Error checking session:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAuthSuccess = () => {
    setIsAuthenticated(true)
    setView('dashboard')
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setView('login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  if (view === 'signup') {
    return (
      <Signup 
        onSuccess={handleAuthSuccess}
        onSwitchToLogin={() => setView('login')}
      />
    )
  }

  if (view === 'login' && !isAuthenticated) {
    return (
      <Login 
        onSuccess={handleAuthSuccess}
        onSwitchToSignup={() => setView('signup')}
      />
    )
  }

  return <Dashboard onLogout={handleLogout} />
}