import { useCallback, useState } from 'react'
import Welcome from './pages/Welcome'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import './App.css'

function App() {
  const [page, setPage] = useState(localStorage.getItem('token') ? 'dashboard' : 'welcome')
  const [message, setMessage] = useState('')

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token')
    setMessage('')
    setPage('welcome')
  }, [])

  if (page === 'welcome') {
    return (
      <div className="page">
        <Welcome
          onGetStarted={() => setPage('signup')}
          onLogin={() => setPage('login')}
        />
      </div>
    )
  }

  if (page === 'signup') {
    return (
      <div className="page">
        <Signup
          onSuccess={() => { setMessage('Account created! Please log in.'); setPage('login') }}
          onGoToLogin={() => { setMessage(''); setPage('login') }}
        />
      </div>
    )
  }

  if (page === 'dashboard') {
    return (
      <div className="page">
        <Dashboard onLogout={handleLogout} />
      </div>
    )
  }

  return (
    <div className="page">
      <Login
        message={message}
        onSuccess={() => setPage('dashboard')}
        onGoToSignup={() => setPage('signup')}
      />
    </div>
  )
}

export default App
