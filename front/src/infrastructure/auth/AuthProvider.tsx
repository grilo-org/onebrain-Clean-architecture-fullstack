'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { getAccessToken, removeAccessToken, setAccessToken } from '@/commons/storage/accessToken'

interface AuthContextProps {
  isAuthenticated: boolean
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = getAccessToken()
    if (token) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }, [])

  const login = (token: string) => {
    setAccessToken(token)
    setIsAuthenticated(true)
    router.push('/dashboard')
  }

  const logout = () => {
    removeAccessToken()
    setIsAuthenticated(false)
    router.push('/login')
  }

  return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
