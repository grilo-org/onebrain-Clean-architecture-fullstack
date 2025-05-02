import { IDeleteCustomerService } from '@/domain/services/IDeleteCustomerService'

export class DeleteCustomerUseCase {
  constructor(private readonly deleteCustomerService: IDeleteCustomerService) {}

  async execute(id: string) {
    return await this.deleteCustomerService.deleteCustomer(id)
  }
}
