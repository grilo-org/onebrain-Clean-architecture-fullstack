import { HttpClient } from '@/infrastructure/api/HttpClient'
import { GetCustomerByIdService } from '@/infrastructure/services/GetCustomerByIdService'

let getCustomerByIdServiceInstance: GetCustomerByIdService | null = null

export const fetchGetCustomerByIdServiceInstance = (): GetCustomerByIdService => {
  if (!getCustomerByIdServiceInstance) {
    const httpClient = HttpClient.create()
    getCustomerByIdServiceInstance = new GetCustomerByIdService(httpClient)
  }
  return getCustomerByIdServiceInstance
}

export const fetchCustomerById = async (id: string) => {
  const service = fetchGetCustomerByIdServiceInstance()
  return await service.fetchCustomerById(id)
}
