import { Injectable } from '@nestjs/common';
import { Either, left, right } from 'src/core/either';
import { CustomersRepository } from 'src/domain/repositories/customers/customers.repository';
import { CustomerNotFoundError, DocumentAlreadyInUseError } from '../errors';
import { EmailAlreadyInUseError } from '../errors/EmailAlreadyInUse.error';

type UpdateCustomerUseCaseResponse = Either<
  Error,
  {
    customer: {
      id: string;
      name: string;
      email: string;
    };
  }
>;

type UpdateCustomerUseCaseRequest = {
  id: string;
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
export class UpdateCustomerUseCase {
  constructor(private readonly customersRepository: CustomersRepository) {}

  async execute(
    input: UpdateCustomerUseCaseRequest,
  ): Promise<UpdateCustomerUseCaseResponse> {
    console.log('input', input);
    const customer = await this.customersRepository.findById(input.id);

    if (!customer) {
      return left(new CustomerNotFoundError());
    }

    const customerWithSameEmail = await this.customersRepository.findByEmail(
      input.email,
    );

    if (
      customerWithSameEmail &&
      customerWithSameEmail.id.toString() !== input.id
    ) {
      return left(new EmailAlreadyInUseError());
    }

    const customerWithSameCpf = await this.customersRepository.findByCpf(
      input.cpf,
    );

    if (customerWithSameCpf && customerWithSameCpf.id.toString() !== input.id) {
      return left(new DocumentAlreadyInUseError());
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
    });

    await this.customersRepository.save(customer);

    return right({
      customer: {
        id: customer.id.toString(),
        name: customer.name,
        email: customer.email,
      },
    });
  }
}
