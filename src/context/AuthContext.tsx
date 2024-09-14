import { createContext, ReactNode, useContext, useState } from 'react'
import { storageService } from '../services'

interface User {
  email: string
}

interface AuthContext {
  isAuthenticated: () => boolean
  user?: User
  register: (email: string, password: string) => void
  login: (email: string, password: string) => void
  logout: () => void
}

interface AuthProviderProps {
  children: ReactNode
}

const defaultContext: AuthContext = {
  isAuthenticated: () => false,
  user: undefined,
  register: () => {},
  login: () => {},
  logout: () => {},
}

const STORAGE_KEY = 'user'

export const AuthContext = createContext<AuthContext>(defaultContext)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>()

  const register = (email: string, _: string) => {
    setUser({ email })
    storageService.save(STORAGE_KEY, { email })
  }

  const login = (email: string, _: string) => {
    setUser({ email })
    storageService.save(STORAGE_KEY, { email })
  }

  const logout = () => {
    setUser(undefined)
    storageService.remove(STORAGE_KEY)
  }

  const isAuthenticated = () => {
    const storedUser = storageService.get(STORAGE_KEY)
    if (storedUser) {
      setUser(storedUser as User)
    }
    return Boolean(storedUser)
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, register, login, logout }}>{children}</AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
