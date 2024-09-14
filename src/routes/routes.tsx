import { LoginPage, RegisterPage, TodoPage } from '../pages'
import { PrivateRoute } from './PrivateRoute'

export const routes = [
  {
    path: '/login',
    element: () => <LoginPage />,
  },
  {
    path: '/register',
    element: () => <RegisterPage />,
  },
  {
    path: '/',
    element: () => (
      <PrivateRoute>
        <TodoPage />
      </PrivateRoute>
    ),
    isProtected: true,
  },
  {
    path: '*',
    element: () => <LoginPage />,
  },
]
