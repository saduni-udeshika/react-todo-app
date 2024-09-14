import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { Button } from '..'
import { AuthContext } from '../../context/AuthContext'

interface LoginFormValues {
  email: string
  password: string
}

export const Login = () => {
  const authContext = useContext(AuthContext)
  const navigate = useNavigate()

  const initialValues: LoginFormValues = { email: '', password: '' }

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be 6 characters').required('Password is Required'),
  })

  const handleLogin = (values: LoginFormValues) => {
    authContext.login(values.email, values.password)
    navigate('/')
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleLogin}>
        <Form className="space-y-4">
          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="text-gray-700 font-semibold mb-1 text-start">
              Email
            </label>
            <Field
              type="email"
              name="email"
              id="email"
              className="bg-gray-100 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="max.brown@gmail.com"
            />
            <ErrorMessage name="email" component="div" className="text-red-600 mt-1 text-sm" />
          </div>

          <div className="flex flex-col mb-6">
            <label htmlFor="password" className="text-gray-700 font-semibold mb-1 text-start">
              Password
            </label>
            <Field
              type="password"
              name="password"
              id="password"
              className="bg-gray-100 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="******************"
            />
            <ErrorMessage name="password" component="div" className="text-red-600 mt-1 text-sm" />
          </div>
          <Button label="Login" type="submit" className="w-full" />
        </Form>
      </Formik>
    </div>
  )
}
