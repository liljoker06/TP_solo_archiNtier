import { Navigate } from 'react-router-dom'

export default function RequireAuth({ children, adminOnly = false }) {
  const isAuth = localStorage.getItem('isAuth') === 'true'
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  if (!isAuth) {
    return <Navigate to="/login" replace />
  }

  if (adminOnly && user?.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  return children
}
