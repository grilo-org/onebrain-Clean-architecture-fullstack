import { Injectable } from "@nestjs/common";
import { left, right } from "@/core/either";
import { Customer } from "@/domain/models/entity/customer.entity";
import { DocumentAlreadyInUseError, EmailAlreadyInUseError } from "@/domain/errors";
import { CustomersRepository } from "@/domain/repositories/customers/customers.repository";
import { CreateCustomerUseCaseResponse } from "@/domain/models/response/customer";
import { CreateCustomerUseCaseRequest } from "@/domain/models/request/customer";


@Injectable()
export class CreateCustomerUseCase {
  constructor(
    private readonly customersRepository: CustomersRepository,
  ) {}

  async execute(input: CreateCustomerUseCaseRequest): Promise<CreateCustomerUseCaseResponse> {
  
    const customerWithSameEmail = await this.customersRepository.findByEmail(input.email)

    if (customerWithSameEmail) {
      return left(new EmailAlreadyInUseError())
    }

    const customerWithSameCpf = await this.customersRepository.findByCpf(input.cpf)

    if (customerWithSameCpf) {
      return left(new DocumentAlreadyInUseError())
    }


    const customer = Customer.create({
      name: input.name,
      email: input.email,
      cpf: input.cpf,
      phone: input.phone,
      zipCode: input.zipCode,
      street: input.street,
      number: input.number,
      complement: input.complement,
      city: input.city,
      state: input.state,
      createdById: input.createdById
    })

    await this.customersRepository.create(customer, input.createdById)

    return right({
      customer: {
        id: customer.id.toString(),
        name: customer.name,
        email: customer.email
      }
    })
  }
}