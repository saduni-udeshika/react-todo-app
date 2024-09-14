import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../context'

interface PrivateRouteProps {
  children: React.ReactNode
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const authContext = useAuthContext()

  if (!authContext.isAuthenticated()) {
    return <Navigate to="/login" />
  }

  return <>{children}</>
}
