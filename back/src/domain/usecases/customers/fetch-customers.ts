import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Either, left, right } from 'src/core/either';
import { CustomersRepository } from 'src/domain/repositories/customers/customers.repository';
import { CustomerNotFoundError } from '../errors';

type FetchCustomersUseCaseResponse = Either<
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
    active: boolean;
  }[]
>;

@Injectable()
export class FetchCustomersUseCase {
  constructor(
    private readonly customersRepository: CustomersRepository,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async execute(): Promise<FetchCustomersUseCaseResponse> {
    const cachedCustomers = await this.cacheManager.get('customers:all');
    if (cachedCustomers) {
      return right(cachedCustomers as any);
    }

    const customers = await this.customersRepository.findAll();

    if (!customers) {
      return left(new CustomerNotFoundError());
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
        active: customer.active,
      };
    });

    await this.cacheManager.set('customers:all', listaCustomer, 300);

    return right(listaCustomer);
  }
}
