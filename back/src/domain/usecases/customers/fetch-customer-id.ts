import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Either, left, right } from 'src/core/either';
import { CustomersRepository } from 'src/domain/repositories/customers/customers.repository';
import { CustomerNotFoundError } from '../errors';

type FetchCustomerIdUseCaseResponse = Either<
  Error,
  {
    id: string;
    name: string;
    email: string;
    cpf: string;
    phone: string;
    zipCode: string;
    street: string;
    number: string;
    complement: string;
    city: string;
  }
>;

type FetchCustomerIdUseCaseRequest = {
  id: string;
};

@Injectable()
export class FetchCustomerIdUseCase {
  constructor(
    private readonly customersRepository: CustomersRepository,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache, // Injeta o serviço de cache
  ) {}

  async execute(
    input: FetchCustomerIdUseCaseRequest,
  ): Promise<FetchCustomerIdUseCaseResponse> {
    // Tenta buscar o cliente no cache
    const cachedCustomer = await this.cacheManager.get(`customer:${input.id}`);
    if (cachedCustomer) {
      return right(cachedCustomer as any);
    }

    const customer = await this.customersRepository.findById(input.id);

    if (!customer) {
      return left(new CustomerNotFoundError());
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
      city: customer.city,
    };

    // Armazena o cliente no cache por 5 minutos
    await this.cacheManager.set(`customer:${input.id}`, customerId, 300);

    return right(customerId);
  }
}
