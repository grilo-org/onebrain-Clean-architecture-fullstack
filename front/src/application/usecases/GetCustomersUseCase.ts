import { IGetCustomersService } from '@/domain/services/IGetCustomersService'

export class GetCustomersUseCase {
  constructor(private readonly getCustomersService: IGetCustomersService) {}

  async execute() {
    return await this.getCustomersService.getCustomers()
  }
}
