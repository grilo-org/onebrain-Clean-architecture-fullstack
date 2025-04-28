import { fetchCustomers } from '@/infrastructure/instances/fetchGetCustomersServiceInstance'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export const useDashboardModel = () => {
  const queryClient = useQueryClient()

  const {
    data: customers,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['customers'],
    queryFn: fetchCustomers,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
  })

  const refreshData = () => {
    queryClient.invalidateQueries({ queryKey: ['customers'] })
  }

  return { customers, isLoading, isError, refreshData, refetch }
}
