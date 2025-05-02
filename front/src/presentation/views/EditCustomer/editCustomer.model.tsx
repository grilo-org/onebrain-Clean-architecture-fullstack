'use client'

import { useRouter } from 'next/navigation'

import { HttpClient } from '@/infrastructure/api/HttpClient'
import { DeleteCustomerService } from '@/infrastructure/services/DeleteCustomerService'
import { UpdateCustomerService } from '@/infrastructure/services/UpdateCustomerService'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { EditCustomerFormData } from './editCustomer.types'

export const useEditCustomerModel = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const {
    mutateAsync: handleUpdateCustomer,
    isPending: isUpdating,
    error: updateError,
  } = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: EditCustomerFormData }) => {
      const httpClient = HttpClient.create()
      const updateCustomerService = new UpdateCustomerService(httpClient)
      return await updateCustomerService.updateCustomer(id, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
      router.push('/dashboard')
    },
    onError: () => {
      throw new Error('Erro ao atualizar o cliente')
    },
  })

  const {
    mutateAsync: handleDeleteCustomer,
    isPending: isDeleting,
    error: deleteError,
  } = useMutation({
    mutationFn: async (id: string) => {
      const httpClient = HttpClient.create()
      const deleteCustomerService = new DeleteCustomerService(httpClient)
      return await deleteCustomerService.deleteCustomer(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
      router.push('/dashboard')
    },
    onError: () => {
      throw new Error('Erro ao excluir o cliente')
    },
  })

  return {
    handleUpdateCustomer,
    handleDeleteCustomer,
    isLoading: isUpdating || isDeleting,
    errorMessage: updateError || deleteError ? 'Erro ao processar a solicitação.' : '',
  }
}
