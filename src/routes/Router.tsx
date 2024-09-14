import { Route, Routes } from 'react-router-dom'
import { routes } from './routes'

export function Router() {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element()} />
      ))}
    </Routes>
  )
}
