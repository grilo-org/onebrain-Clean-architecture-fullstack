'use client'

import { useRouter } from 'next/navigation'

import { LoginResponse } from '@/domain/services/ILoginService'
import { HttpClient } from '@/infrastructure/api/HttpClient'
import { useAuth } from '@/infrastructure/auth/AuthProvider'
import { LoginService } from '@/infrastructure/services/LoginService'
import { useMutation } from '@tanstack/react-query'

import { LoginCredentials } from './login.types'

export const useLoginModel = () => {
  const { login: authLogin } = useAuth()
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const httpClient = HttpClient.create()
      const loginService = new LoginService(httpClient)
      return await loginService.login(credentials)
    },
    onSuccess: (response: LoginResponse) => {
      authLogin(response.token)
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
