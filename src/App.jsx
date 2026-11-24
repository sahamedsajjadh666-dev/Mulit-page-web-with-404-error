import { Routes, Route, Navigate } from 'react-router-dom'
import DashboardLayout from './layouts/DashboardLayout'
import Dashboard from './pages/Dashboard'
import Students from './pages/Students'
import About from './pages/About'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      {/* Root redirect */}
      <Route path="/" element={<Navigate to="/studentdashboard" replace />} />

      {/* Studentdashboard routes with shared nav layout */}
      <Route path="/studentdashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="students" element={<Students />} />
        <Route path="about" element={<About />} />
        {/* Catch-all inside /studentdashboard */}
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Root-level catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
