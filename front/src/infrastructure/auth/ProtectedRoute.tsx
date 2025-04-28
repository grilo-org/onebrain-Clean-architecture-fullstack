'use client'

import React from 'react'

import { useRouter } from 'next/navigation'

import { useAuth } from './AuthProvider'

interface ProtectedRouteProps {
  children: React.ReactNode
  redirectTo: string
  requireAuth: boolean
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, redirectTo, requireAuth }) => {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  React.useEffect(() => {
    if (requireAuth && !isAuthenticated) {
      router.replace(redirectTo)
    } else if (!requireAuth && isAuthenticated) {
      router.replace('/dashboard')
    }
  }, [isAuthenticated, requireAuth, redirectTo, router])

  if ((requireAuth && !isAuthenticated) || (!requireAuth && isAuthenticated)) {
    return null
  }

  return <>{children}</>
}

export default ProtectedRoute
