import './App.css'
import { AuthProvider } from './context/auth/AuthContext'
import { Routes, Route } from 'react-router-dom'
import { Dashboard } from './pages/dashboard/Dashboard'
import { CreatePlan } from './components/plan/CreatePlan'
import { TravelList } from './components/plan/TravelList'
import { EditTravelPlanForm } from './components/plan/EditPlan'
import { LogInForm } from './components/auth/LogIn'
import { RegisterForm } from './components/auth/Register'
import { AddDestionation } from './components/destination/AddDestination'

function App() {

  return (
    <AuthProvider>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<LogInForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/newPlan" element={<CreatePlan />}/>
      <Route path="/plans" element={<TravelList/>}/>
      <Route path="/edit/:id" element={<EditTravelPlanForm/>}/>
      <Route path="/newDestination/:id" element={<AddDestionation/>}/>
    </Routes>
    </AuthProvider>
  )
}

export default App
