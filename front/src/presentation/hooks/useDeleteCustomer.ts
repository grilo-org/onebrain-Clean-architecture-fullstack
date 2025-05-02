/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@/infrastructure/api/HttpClient'
import { DeleteCustomerService } from '@/infrastructure/services/DeleteCustomerService'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient()

  const {
    mutate: deleteCustomer,
    isPending,
    isError,
  } = useMutation({
    mutationFn: async (id: string) => {
      const httpClient = HttpClient.create()
      const deleteCustomerService = new DeleteCustomerService(httpClient)
      return await deleteCustomerService.deleteCustomer(id)
    },
    onSuccess: (_, id) => {
      queryClient.setQueryData(
        ['customers'],
        (old: any[] | undefined) => old?.filter((customer) => customer.id !== id) || []
      )
    },
  })

  return { deleteCustomer, isPending, isError }
}
