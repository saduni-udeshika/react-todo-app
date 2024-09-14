import React from 'react'
import { Link } from 'react-router-dom'
import { Register } from '../components'

export const RegisterPage: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Register</h1>
        <Register />
        <div className="text-center">
          Or <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  )
}
