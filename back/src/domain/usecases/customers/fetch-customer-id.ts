import { Injectable } from "@nestjs/common";
import { left, right } from "@/core/either";
import { CustomerNotFoundError } from "@/domain/errors";
import { CustomersRepository } from "@/domain/repositories/customers/customers.repository";
import {  FetchCustomerIdUseCaseResponse } from "@/domain/models/response/customer";
import { FetchCustomerIdUseCaseRequest } from "@/domain/models/request/customer";

@Injectable()
export class FetchCustomerIdUseCase {
  constructor(
    private readonly customersRepository: CustomersRepository,
  ) {}

  async execute(input: FetchCustomerIdUseCaseRequest): Promise<FetchCustomerIdUseCaseResponse> {
  
    const customer = await this.customersRepository.findById(input.id)

    if (!customer) {
      return left(new CustomerNotFoundError())
    }


    const customerId = {
      id: customer.id.toString(),
      name: customer.name,
      email: customer.email,
      cpf: customer.cpf,
      phone: customer.phone,
        zipCode: customer.zipCode,
        street: customer.street,
        number: customer.number,
        complement: customer.complement ?? '',
      city: customer.city
    }


    return right(customerId)
  }
}