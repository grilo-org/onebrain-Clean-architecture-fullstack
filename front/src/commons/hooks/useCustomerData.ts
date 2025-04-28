import { useSearchParams } from 'next/navigation'

import { fetchCustomerById } from '@/infrastructure/instances/fetchGetCustomerByIdServiceInstance'
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
    queryFn: async () => await fetchCustomerById(customerId || ''),
    enabled: !!customerId,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  })

  return { customer, isLoading, isError, refetch }
}
