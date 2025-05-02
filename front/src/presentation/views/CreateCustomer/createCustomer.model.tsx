'use client'

import { useRouter } from 'next/navigation'

import { HttpClient } from '@/infrastructure/api/HttpClient'
import { CreateCustomerService } from '@/infrastructure/services/CreateCustomerService'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { CreateCustomerFormData } from './createCustomer.types'

export const useCreateCustomerModel = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const {
    mutate: handleCreateCustomer,
    isPending,
    isError,
  } = useMutation({
    mutationFn: async (data: CreateCustomerFormData) => {
      const httpClient = HttpClient.create()
      const createCustomerService = new CreateCustomerService(httpClient)
      return await createCustomerService.createCustomer(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
      router.push('/dashboard')
    },
    onError: () => {
      throw new Error('Erro ao criar o cliente')
    },
  })

  return {
    handleCreateCustomer,
    isLoading: isPending,
    isError,
    errorMessage: isError ? 'Erro ao criar o cliente' : '',
  }
}
