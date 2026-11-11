import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Consultation from './pages/Consultation'
import SpotList from './pages/SpotList'
import SpotDetail from './pages/SpotDetail'
import './App.css'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('user')
    if (saved) {
      setUser(JSON.parse(saved))
    }
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          user ? <Navigate to="/dashboard" replace /> : <Login onLogin={handleLogin} />
        }
      />
      <Route
        path="/dashboard"
        element={
          user ? <Dashboard user={user} onLogout={handleLogout} /> : <Navigate to="/" replace />
        }
      />
      <Route
        path="/consultation"
        element={
          user ? <Consultation user={user} onLogout={handleLogout} /> : <Navigate to="/" replace />
        }
      />
      <Route
        path="/spots"
        element={
          user ? <SpotList user={user} onLogout={handleLogout} /> : <Navigate to="/" replace />
        }
      />
      <Route
        path="/spots/:id"
        element={
          user ? <SpotDetail user={user} onLogout={handleLogout} /> : <Navigate to="/" replace />
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
