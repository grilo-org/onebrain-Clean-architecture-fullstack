import { HttpClient } from '@/infrastructure/api/HttpClient'
import { GetCustomersService } from '@/infrastructure/services/GetCustomersService'

let getCustomersServiceInstance: GetCustomersService | null = null

export const fetchGetCustomersServiceInstance = (): GetCustomersService => {
  if (!getCustomersServiceInstance) {
    const httpClient = HttpClient.create()
    getCustomersServiceInstance = new GetCustomersService(httpClient)
  }
  return getCustomersServiceInstance
}

export const fetchCustomers = async () => {
  const service = fetchGetCustomersServiceInstance()
  return await service.fetchCustomers()
}
