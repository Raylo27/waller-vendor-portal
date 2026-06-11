import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Vendor pages
import VendorLogin from './pages/vendor/VendorLogin'
import Homepage from './pages/vendor/Homepage'
import Register from './pages/vendor/Register'
import RegisterConfirm from './pages/vendor/RegisterConfirm'
import Dashboard from './pages/vendor/Dashboard'
import Opportunities from './pages/vendor/Opportunities'
import OpportunityDetail from './pages/vendor/OpportunityDetail'
import Submit from './pages/vendor/Submit'
import SubmitConfirm from './pages/vendor/SubmitConfirm'

// Staff pages
import StaffLogin from './pages/staff/StaffLogin'
import StaffDashboard from './pages/staff/StaffDashboard'
import PostOpportunity from './pages/staff/PostOpportunity'
import VendorRegistry from './pages/staff/VendorRegistry'
import SubmissionsReview from './pages/staff/SubmissionsReview'

// Auth
import { AuthProvider } from './auth/AuthContext'
import ProtectedRoute from './auth/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public vendor routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<VendorLogin />} />
          <Route path="/register/confirm" element={<RegisterConfirm />} />
          <Route path="/opportunities" element={<Opportunities />} />
          <Route path="/opportunities/:id" element={<OpportunityDetail />} />

          {/* Protected vendor routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute allowedType="vendor">
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/opportunities/:id/submit" element={
            <ProtectedRoute allowedType="vendor">
              <Submit />
            </ProtectedRoute>
          } />
          <Route path="/submit/confirm" element={
            <ProtectedRoute allowedType="vendor">
              <SubmitConfirm />
            </ProtectedRoute>
          } />

          {/* Staff routes */}
          <Route path="/staff/login" element={<StaffLogin />} />
          <Route path="/staff/dashboard" element={
            <ProtectedRoute allowedType="staff">
              <StaffDashboard />
            </ProtectedRoute>
          } />
          <Route path="/staff/opportunities/new" element={
            <ProtectedRoute allowedType="staff">
              <PostOpportunity />
            </ProtectedRoute>
          } />
          <Route path="/staff/vendors" element={
            <ProtectedRoute allowedType="staff">
              <VendorRegistry />
            </ProtectedRoute>
          } />
          <Route path="/staff/submissions" element={
            <ProtectedRoute allowedType="staff">
              <SubmissionsReview />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App