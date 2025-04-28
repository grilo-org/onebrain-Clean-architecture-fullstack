import { HttpClient } from '@/infrastructure/api/HttpClient'
import { DeleteCustomerService } from '@/infrastructure/services/DeleteCustomerService'

let deleteCustomerServiceInstance: DeleteCustomerService | null = null

export const fetchDeleteCustomerServiceInstance = (): DeleteCustomerService => {
  if (!deleteCustomerServiceInstance) {
    const httpClient = HttpClient.create()
    deleteCustomerServiceInstance = new DeleteCustomerService(httpClient)
  }
  return deleteCustomerServiceInstance
}

export const fetchDeleteCustomer = async (id: string) => {
  const service = fetchDeleteCustomerServiceInstance()
  return await service.deleteCustomer(id)
}
