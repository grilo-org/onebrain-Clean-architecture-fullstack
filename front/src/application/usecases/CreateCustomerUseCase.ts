import { ICreateCustomerService } from '@/domain/services/ICreateCustomerService'

export class CreateCustomerUseCase {
  constructor(private readonly createCustomerService: ICreateCustomerService) {}

  async execute(customerData: {
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
  }) {
    return await this.createCustomerService.createCustomer(customerData)
  }
}
