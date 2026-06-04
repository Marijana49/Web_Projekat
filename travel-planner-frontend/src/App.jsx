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
import { DestinationsList } from './components/destination/DestinationsList'
import { EditDestinationForm } from './components/destination/EditDestination'
import { AddActivity } from './components/activity/AddActivity'

function App() {

  return (
    <AuthProvider>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<LogInForm />} />
      <Route path="/register" element={<RegisterForm />} />

      {/*Planovi */}
      <Route path="/newPlan" element={<CreatePlan />}/>
      <Route path="/plans" element={<TravelList/>}/>
      <Route path="/edit/:id" element={<EditTravelPlanForm/>}/>

      {/**Destinacije */}
      <Route path="/newDestination/:id" element={<AddDestionation/>}/>
      <Route path="/travel-plans/destinations/:id" element={<DestinationsList/>}/>
      <Route path="/destinations/edit/:id" element={<EditDestinationForm/>}/>

      {/**Aktivnosti */}
      <Route path="/calendars" element={<AddActivity/>}/>
    </Routes>
    </AuthProvider>
  )
}

export default App
