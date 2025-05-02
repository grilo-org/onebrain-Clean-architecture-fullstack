import { IGetCustomerByIdService } from '@/domain/services/IGetCustomerByIdService'

export class GetCustomerByIdUseCase {
  constructor(private readonly getCustomerByIdService: IGetCustomerByIdService) {}

  async execute(id: string) {
    return await this.getCustomerByIdService.getCustomerById(id)
  }
}
