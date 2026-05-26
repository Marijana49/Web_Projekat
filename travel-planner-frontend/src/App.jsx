import './App.css'
import LogInPage from './pages/auth/LogInPage'
import RegisterPage from './pages/auth/RegisterPage'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<LogInPage />} />
      <Route path="/login" element={<LogInPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
    </>
  )
}

export default App
