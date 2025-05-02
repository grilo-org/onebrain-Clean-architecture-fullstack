import { HttpClient } from '@/infrastructure/api/HttpClient'
import { GetCustomersService } from '@/infrastructure/services/GetCustomersService'
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
    queryFn: async () => {
      const httpClient = HttpClient.create()
      const getCustomersService = new GetCustomersService(httpClient)
      return await getCustomersService.fetchCustomers()
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
  })

  const refreshData = () => {
    queryClient.invalidateQueries({ queryKey: ['customers'] })
  }

  return { customers, isLoading, isError, refreshData, refetch }
}
