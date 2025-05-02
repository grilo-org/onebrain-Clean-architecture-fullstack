import { Injectable } from "@nestjs/common";
import { left, right } from "@/core/either";
import { CustomerNotFoundError, DocumentAlreadyInUseError, EmailAlreadyInUseError } from "@/domain/errors";
import { CustomersRepository } from "@/domain/repositories/customers/customers.repository";
import { UpdateCustomerUseCaseResponse } from "@/domain/models/response/customer";
import { UpdateCustomerUseCaseRequest } from "@/domain/models/request/customer";


@Injectable()
export class UpdateCustomerUseCase {
  constructor(
    private readonly customersRepository: CustomersRepository,
  ) {}

  async execute(input: UpdateCustomerUseCaseRequest): Promise<UpdateCustomerUseCaseResponse> {
 
    const customer = await this.customersRepository.findById(input.id)

    if (!customer) {
      return left(new CustomerNotFoundError())
    }

    const customerWithSameEmail = await this.customersRepository.findByEmail(input.email)
    
    if (customerWithSameEmail && customerWithSameEmail.id.toString() !== input.id) {
      return left(new EmailAlreadyInUseError())
    }

    const customerWithSameCpf = await this.customersRepository.findByCpf(input.cpf)
    
    if (customerWithSameCpf && customerWithSameCpf.id.toString() !== input.id) {
      return left(new DocumentAlreadyInUseError())
    }

    customer.update({
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
    })

    await this.customersRepository.save(customer)

    return right({
      customer: {
        id: customer.id.toString(),
        name: customer.name,
        email: customer.email
      }
    })
  }
}