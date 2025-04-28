import { HttpClient } from '@/infrastructure/api/HttpClient'
import { CreateCustomerService } from '@/infrastructure/services/CreateCustomerService'

let createCustomerServiceInstance: CreateCustomerService | null = null

export const fetchCreateCustomerServiceInstance = (): CreateCustomerService => {
  if (!createCustomerServiceInstance) {
    const httpClient = HttpClient.create()
    createCustomerServiceInstance = new CreateCustomerService(httpClient)
  }
  return createCustomerServiceInstance
}

export const fetchCreateCustomer = async (customerData: {
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
}) => {
  const service = fetchCreateCustomerServiceInstance()
  return await service.createCustomer(customerData)
}
