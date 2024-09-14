import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './context/AuthContext'
import { Router } from './routes'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
