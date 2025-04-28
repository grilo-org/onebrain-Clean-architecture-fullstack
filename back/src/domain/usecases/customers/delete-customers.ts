import { Either, left, right } from "src/core/either";
import { CustomerNotFoundError } from "../errors";
import { CustomersRepository } from "src/domain/repositories/customers/customers.repository";
import { Injectable } from "@nestjs/common";

type DeleteCustomerUseCaseResponse = Either<Error, {
  message: string
}>

type DeleteCustomerUseCaseRequest = {
  id: string 
  createdById: string
}

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
