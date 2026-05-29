import './App.css'
import { AuthProvider } from './context/auth/AuthContext'
import LogInPage from './pages/auth/LogInPage'
import RegisterPage from './pages/auth/RegisterPage'
import { Routes, Route } from 'react-router-dom'
import { Dashboard } from './pages/dashboard/Dashboard'

function App() {

  return (
    <AuthProvider>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<LogInPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
    </AuthProvider>
  )
}

export default App
