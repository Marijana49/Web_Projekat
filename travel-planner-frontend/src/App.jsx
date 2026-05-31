import './App.css'
import { AuthProvider } from './context/auth/AuthContext'
import LogInPage from './pages/auth/LogInPage'
import RegisterPage from './pages/auth/RegisterPage'
import { Routes, Route } from 'react-router-dom'
import { Dashboard } from './pages/dashboard/Dashboard'
import { CreatePlan } from './components/plan/CreatePlan'
import { TravelList } from './components/plan/TravelList'

function App() {

  return (
    <AuthProvider>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<LogInPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/newPlan" element={<CreatePlan />}/>
      <Route path="/plans" element={<TravelList/>}/>
    </Routes>
    </AuthProvider>
  )
}

export default App
