'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { api } from '@/lib/api'

interface AuthUser {
  id: string
  name: string
  email: string
  avatar?: string
  skills: string[]
}

interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string, skills?: string[]) => Promise<void>
  loginWithGoogle: (idToken: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('gigmatch_token')
    if (!token) {
      setLoading(false)
      return
    }

    api
      .get('/auth/me')
      .then((res) => setUser(res.data.user))
      .catch(() => localStorage.removeItem('gigmatch_token'))
      .finally(() => setLoading(false))
  }, [])

  const saveSession = (token: string, user: AuthUser) => {
    localStorage.setItem('gigmatch_token', token)
    setUser(user)
  }

  const login = async (email: string, password: string) => {
    const res = await api.post('/auth/login', { email, password })
    saveSession(res.data.token, res.data.user)
  }

  const register = async (name: string, email: string, password: string, skills: string[] = []) => {
    const res = await api.post('/auth/register', { name, email, password, skills })
    saveSession(res.data.token, res.data.user)
  }

  const loginWithGoogle = async (idToken: string) => {
    const res = await api.post('/auth/google', { idToken })
    saveSession(res.data.token, res.data.user)
  }

  const logout = () => {
    localStorage.removeItem('gigmatch_token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth has to be called inside an AuthProvider')
  return ctx
}
