'use client'

import { useRouter } from 'next/navigation'

import { fetchDeleteCustomer } from '@/infrastructure/instances/fetchDeleteCustomerServiceInstance'
import { fetchUpdateCustomer } from '@/infrastructure/instances/fetchUpdateCustomerServiceInstance'
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
    mutationFn: async ({ id, data }: { id: string; data: EditCustomerFormData }) => await fetchUpdateCustomer(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
      router.push('/dashboard')
    },
  })

  const {
    mutateAsync: handleDeleteCustomer,
    isPending: isDeleting,
    error: deleteError,
  } = useMutation({
    mutationFn: async (id: string) => await fetchDeleteCustomer(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
      router.push('/dashboard')
    },
  })

  return {
    handleUpdateCustomer: async (id: string, data: EditCustomerFormData) => await handleUpdateCustomer({ id, data }),
    handleDeleteCustomer,
    isLoading: isUpdating || isDeleting,
    errorMessage: updateError || deleteError ? 'Erro ao processar a solicitação.' : '',
  }
}
