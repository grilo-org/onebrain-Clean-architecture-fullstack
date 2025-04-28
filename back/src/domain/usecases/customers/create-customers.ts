import { Injectable } from '@nestjs/common';
import { Either, left, right } from 'src/core/either';
import { Customer } from 'src/domain/models/customers.model';
import { CustomersRepository } from 'src/domain/repositories/customers/customers.repository';
import { DocumentAlreadyInUseError } from '../errors';
import { EmailAlreadyInUseError } from '../errors/EmailAlreadyInUse.error';

type CreateCustomerUseCaseResponse = Either<
  Error,
  {
    customer: {
      id: string;
      name: string;
      email: string;
    };
  }
>;

type CreateCustomerUseCaseRequest = {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  zipCode: string;
  street: string;
  number: string;
  complement?: string;
  city: string;
  state?: string;
  createdById: string;
};

@Injectable()
export class CreateCustomerUseCase {
  constructor(private readonly customersRepository: CustomersRepository) {}

  async execute(
    input: CreateCustomerUseCaseRequest,
  ): Promise<CreateCustomerUseCaseResponse> {
    const customerWithSameEmail = await this.customersRepository.findByEmail(
      input.email,
    );

    if (customerWithSameEmail) {
      return left(new EmailAlreadyInUseError());
    }

    const customerWithSameCpf = await this.customersRepository.findByCpf(
      input.cpf,
    );

    if (customerWithSameCpf) {
      return left(new DocumentAlreadyInUseError());
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
      state: input.state ?? '',
      createdById: input.createdById,
    });

    await this.customersRepository.create(customer, input.createdById);

    return right({
      customer: {
        id: customer.id.toString(),
        name: customer.name,
        email: customer.email,
      },
    });
  }
}
