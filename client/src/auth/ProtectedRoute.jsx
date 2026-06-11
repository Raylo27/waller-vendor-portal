import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

function ProtectedRoute({ children, allowedType }) {
  const { user, token } = useAuth()

  if (!token || !user) {
    if (allowedType === 'staff') {
      return <Navigate to="/staff/login" replace />
    }
    return <Navigate to="/login" replace />
  }

  if (allowedType && user.type !== allowedType) {
    if (user.type === 'staff') {
      return <Navigate to="/staff/dashboard" replace />
    }
    return <Navigate to="/dashboard" replace />
  }

  return children
}

export default ProtectedRoute