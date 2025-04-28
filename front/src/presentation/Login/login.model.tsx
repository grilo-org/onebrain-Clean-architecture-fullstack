'use client'

import { useRouter } from 'next/navigation'

import { useAuth } from '@/infrastructure/auth/AuthProvider'
import { fetchLogin } from '@/infrastructure/instances/fetchLoginServiceInstance'
import { useMutation } from '@tanstack/react-query'

export const useLoginModel = () => {
  const { login: authLogin } = useAuth()
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: fetchLogin,
    onSuccess: (token) => {
      authLogin(token)
      router.push('/dashboard')
    },
    onError: () => {
      throw new Error('Falha ao realizar login. Verifique suas credenciais.')
    },
  })

  return {
    ...mutation,
  }
}
