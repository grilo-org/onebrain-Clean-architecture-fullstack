import { HttpClient } from '@/infrastructure/api/HttpClient'
import { UpdateCustomerService } from '@/infrastructure/services/UpdateCustomerService'

let updateCustomerServiceInstance: UpdateCustomerService | null = null

export const fetchUpdateCustomerServiceInstance = (): UpdateCustomerService => {
  if (!updateCustomerServiceInstance) {
    const httpClient = HttpClient.create()
    updateCustomerServiceInstance = new UpdateCustomerService(httpClient)
  }
  return updateCustomerServiceInstance
}

export const fetchUpdateCustomer = async (
  id: string,
  customerData: {
    name: string
    email: string
    cpf: string
    phone: string
    zipCode: string
    street: string
    number: string
    complement?: string
    city: string
    state?: string
  }
) => {
  const service = fetchUpdateCustomerServiceInstance()
  return await service.updateCustomer(id, customerData)
}
