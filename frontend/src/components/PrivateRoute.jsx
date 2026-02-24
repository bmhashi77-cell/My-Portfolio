import { Navigate } from 'react-router-dom'
import { useAuth } from '../providers/AuthProvider'

const PrivateRoute = ({ children, roles = ['admin'] }) => {
  const { user, loading } = useAuth()
  if (loading) return <div className="p-8 text-center">Loading...</div>
  if (!user || (roles.length && !roles.includes(user.role))) {
    return <Navigate to="/login" replace />
  }
  return children
}

export default PrivateRoute