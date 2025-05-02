import { Injectable } from "@nestjs/common";
import { left, right } from "@/core/either";
import { CustomerNotFoundError } from "@/domain/errors";
import { CustomersRepository } from "@/domain/repositories/customers/customers.repository";
import { FetchCustomersUseCaseResponse } from "@/domain/models/response/customer";

@Injectable()
export class FetchCustomersUseCase {
  constructor(
    private readonly customersRepository: CustomersRepository,
  ) {}

  async execute(): Promise<FetchCustomersUseCaseResponse> {
  
    const customers = await this.customersRepository.findAll()

    if (!customers) {
      return left(new CustomerNotFoundError())
    }


    const listaCustomer = customers.map((customer) => {
      return {
        id: customer.id.toString(),
        name: customer.name,
        email: customer.email,
        cpf: customer.cpf,
        phone: customer.phone,
        zipCode: customer.zipCode,
        street: customer.street,
        number: customer.number,
        complement: customer.complement ?? '',
        city: customer.city,
        active: customer.active
      }
    })


    return right(listaCustomer)
  }
}