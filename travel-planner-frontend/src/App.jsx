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
import { ActivityCalendar } from './components/activity/ActivityCalendar'
import { AddActivityForm } from './components/activity/AddActivityForm'
import { ActivityList } from './components/activity/ActivityList'
import { EditActivityForm } from './components/activity/EditActivityForm'
import { PlanDetails } from './components/plan/PlanDetails'; 
import { AddExpensForm } from './components/expens/AddExpensForm'

function App() {

  return (
    <AuthProvider>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<LogInForm />} />
      <Route path="/register" element={<RegisterForm />} />

      {/*Planovi */}
      <Route path="/travel-plans/new" element={<CreatePlan />}/>
      <Route path="/travel-plans" element={<TravelList/>}/>
      <Route path="/travel-plans/:id" element={<EditTravelPlanForm/>}/>
      <Route path="/travel-plans/:id/details" element={<PlanDetails />}/>

      {/**Destinacije */}
      <Route path="/travel-plans/:id/destinations/new" element={<AddDestionation/>}/>
      <Route path="/travel-plans/:id/destinations" element={<DestinationsList/>}/>
      <Route path="/destinations/:id/edit" element={<EditDestinationForm/>}/>

      {/**Aktivnosti */}
      <Route path="/travel-plans/:id/calendars" element={<ActivityCalendar/>}/>
      <Route path="/travel-plans/:planId/activities/new" element={<AddActivityForm/>}/>
      <Route path="/travel-plans/:planId/activities/:selectedDate" element={<ActivityList/>}/>
      <Route path="/travel-plans/:planId/activities/edit" element={<EditActivityForm/>}/>

      {/**Troskovi */}
      <Route path="/travel-plans/:id/expenses" element={<AddExpensForm/>}/>
    </Routes>
    </AuthProvider>
  )
}

export default App
