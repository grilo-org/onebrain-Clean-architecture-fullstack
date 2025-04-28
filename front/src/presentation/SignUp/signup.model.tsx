'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { fetchCreateUser } from '@/infrastructure/instances/fetchCreateUserServiceInstance'

export const useSignUpModel = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()

  const handleSignUp = async (data: { name: string; email: string; password: string; confirmPassword: string }) => {
    setIsLoading(true)
    setErrorMessage('')

    if (data.password !== data.confirmPassword) {
      setErrorMessage('As senhas não coincidem.')
      setIsLoading(false)
      return
    }

    try {
      await fetchCreateUser({ name: data.name, email: data.email, password: data.password })

      router.push('/login')
    } catch (error) {
      setErrorMessage('Erro ao criar conta. Tente novamente mais tarde.')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    errorMessage,
    handleSignUp,
  }
}
