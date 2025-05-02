import { useSearchParams } from 'next/navigation'

import { HttpClient } from '@/infrastructure/api/HttpClient'
import { GetCustomerByIdService } from '@/infrastructure/services/GetCustomerByIdService'
import { useQuery } from '@tanstack/react-query'

export const useCustomerData = () => {
  const searchParams = useSearchParams()
  const customerId = searchParams.get('id')

  const {
    data: customer,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['customer', customerId],
    queryFn: async () => {
      const httpClient = HttpClient.create()
      const getCustomerByIdService = new GetCustomerByIdService(httpClient)
      return await getCustomerByIdService.fetchCustomerById(customerId || '')
    },
    enabled: !!customerId,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  })

  return { customer, isLoading, isError, refetch }
}
