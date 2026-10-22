import { useCallback, useState } from 'react'
import Welcome from './pages/Welcome'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import VerifyLogin from './pages/VerifyLogin'
import Dashboard from './pages/Dashboard'
import './App.css'

function App() {
  const [page, setPage] = useState(localStorage.getItem('token') ? 'dashboard' : 'welcome')
  const [message, setMessage] = useState('')
  const [resetEmail, setResetEmail] = useState('')
  // Kept in memory only (never saved) so "Resend code" can log in again; cleared after 2FA
  const [loginCreds, setLoginCreds] = useState(null)

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

  if (page === 'forgot') {
    return (
      <div className="page">
        <ForgotPassword
          onCodeSent={(email) => { setResetEmail(email); setPage('reset') }}
          onBackToLogin={() => { setMessage(''); setPage('login') }}
        />
      </div>
    )
  }

  if (page === 'reset') {
    return (
      <div className="page">
        <ResetPassword
          email={resetEmail}
          onSuccess={() => { setMessage('Password updated! Please log in with your new password.'); setPage('login') }}
          onBackToLogin={() => { setMessage(''); setPage('login') }}
        />
      </div>
    )
  }

  if (page === 'verify') {
    return (
      <div className="page">
        <VerifyLogin
          email={loginCreds.email}
          password={loginCreds.password}
          onSuccess={() => { setLoginCreds(null); setPage('dashboard') }}
          onBackToLogin={() => { setLoginCreds(null); setMessage(''); setPage('login') }}
        />
      </div>
    )
  }

  if (page === 'dashboard') {
    // Full-screen layout with its own menu, so no centred .page wrapper
    return <Dashboard onLogout={handleLogout} />
  }

  return (
    <div className="page">
      <Login
        message={message}
        onSuccess={(email, password) => { setLoginCreds({ email, password }); setPage('verify') }}
        onGoToSignup={() => setPage('signup')}
        onForgotPassword={() => { setMessage(''); setPage('forgot') }}
      />
    </div>
  )
}

export default App
