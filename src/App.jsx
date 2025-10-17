import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, createContext, useContext, useEffect } from 'react'
import './App.css'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import MainPage from './pages/MainPage'
import ConversationPage from './pages/ConversationPage'
import ProfilePage from './pages/ProfilePage'

// Authentication Context
const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" replace />
}

function App() {
  const [user, setUser] = useState(null)

  // Check if user is logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('aicad_user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = (userData) => {
    setUser(userData)
    localStorage.setItem('aicad_user', JSON.stringify(userData))
  }

  const register = (userData) => {
    setUser(userData)
    localStorage.setItem('aicad_user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('aicad_user')
  }

  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData }
    setUser(updatedUser)
    localStorage.setItem('aicad_user', JSON.stringify(updatedUser))
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={user ? <Navigate to="/main" replace /> : <LoginPage />} />
          <Route path="/register" element={user ? <Navigate to="/main" replace /> : <RegisterPage />} />
          <Route
            path="/main"
            element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/conversation"
            element={
              <ProtectedRoute>
                <ConversationPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthContext.Provider>
  )
}

export default App

