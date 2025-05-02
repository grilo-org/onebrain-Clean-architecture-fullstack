import { Injectable } from "@nestjs/common";
import { left, right } from "@/core/either";
import { CustomerNotFoundError } from "@/domain/errors";
import { CustomersRepository } from "@/domain/repositories/customers/customers.repository";
import { DeleteCustomerUseCaseResponse } from "@/domain/models/response/customer";
import { DeleteCustomerUseCaseRequest } from "@/domain/models/request/customer";

@Injectable()
export class DeleteCustomerUseCase {
  constructor(
    private readonly customersRepository: CustomersRepository,
  ) {}

  async execute(input: DeleteCustomerUseCaseRequest): Promise<DeleteCustomerUseCaseResponse> {
    const customer = await this.customersRepository.findById(input.id)

    if (!customer) {
      return left(new CustomerNotFoundError())
    }

    await this.customersRepository.delete(input.id)

    return right({
      message: 'Cliente deletado com sucesso'
    })
  }
}
