import './App.css'
import { AuthProvider } from './context/auth/AuthContext'
import LogInPage from './pages/auth/LogInPage'
import RegisterPage from './pages/auth/RegisterPage'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <AuthProvider>
    <Routes>
      <Route path="/" element={<LogInPage />} />
      <Route path="/login" element={<LogInPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
    </AuthProvider>
  )
}

export default App
