import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { Button } from '..'
import { useAuthContext } from '../../context/AuthContext'

interface RegisterFormValues {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export const Register = () => {
  const authContext = useAuthContext()
  const navigate = useNavigate()

  const initialValues: RegisterFormValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  }

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Please confirm your password'),
  })

  const handleRegister = (values: RegisterFormValues) => {
    authContext.register(values.email, values.password)
    navigate('/')
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleRegister}>
        <Form className="w-full max-w-sm">
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-500 font-bold mb-1 pr-4 text-start">
              Name
            </label>
            <Field
              type="text"
              name="name"
              id="name"
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Max Brown"
            />
            <ErrorMessage name="name" component="div" className="text-red-600 mt-1" />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-500 font-bold mb-1 pr-4 text-start">
              Email
            </label>
            <Field
              type="email"
              name="email"
              id="email"
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-500"
              placeholder="max.brown@gmail.com"
            />
            <ErrorMessage name="email" component="div" className="text-red-600 mt-1" />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-500 font-bold mb-1 pr-4 text-start">
              Password
            </label>
            <Field
              type="password"
              name="password"
              id="password"
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-500"
              placeholder="******************"
            />
            <ErrorMessage name="password" component="div" className="text-red-600 mt-1" />
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-500 font-bold mb-1 pr-4 text-start">
              Confirm Password
            </label>
            <Field
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-500"
              placeholder="******************"
            />
            <ErrorMessage name="confirmPassword" component="div" className="text-red-600 mt-1" />
          </div>
          <Button label="Register" type="submit" className="w-full" />
        </Form>
      </Formik>
    </div>
  )
}
