import React from 'react'
import { Link } from 'react-router-dom'
import { Login } from '../components'

export const LoginPage: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
        <Login />
        <div className="text-center">
          Or <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  )
}
