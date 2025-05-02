import { IUpdateCustomerService } from '@/domain/services/IUpdateCustomerService'

export class UpdateCustomerUseCase {
  constructor(private readonly updateCustomerService: IUpdateCustomerService) {}

  async execute(
    id: string,
    customerData: {
      name?: string
      email?: string
      cpf?: string
      phone?: string
      zipCode?: string
      street?: string
      number?: string
      complement?: string
      city?: string
      state?: string
    }
  ) {
    return await this.updateCustomerService.updateCustomer(id, customerData)
  }
}
