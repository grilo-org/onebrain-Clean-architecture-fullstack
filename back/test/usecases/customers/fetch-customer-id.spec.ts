import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Test, TestingModule } from '@nestjs/testing';
import { Cache } from 'cache-manager';
import { FetchCustomerIdUseCase } from 'src/domain/usecases/customers/fetch-customer-id';
import { CustomerNotFoundError } from 'src/domain/usecases/errors';
import { makeCustomer } from 'test/factory/make-customers';
import { InMemoryCustomersRepository } from 'test/repository/in-memory-customers-repository';

let inMemoryCustomersRepository: InMemoryCustomersRepository;
let sut: FetchCustomerIdUseCase;
let cacheManager: Cache;

describe('Fetch Customer by ID UseCase', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
          },
        },
      ],
    }).compile();

    cacheManager = module.get<Cache>(CACHE_MANAGER);
    inMemoryCustomersRepository = new InMemoryCustomersRepository();
    sut = new FetchCustomerIdUseCase(inMemoryCustomersRepository, cacheManager);
  });

  it('should be able to fetch a customer by ID and cache the result', async () => {
    const customer = makeCustomer({
      name: 'John Doe',
      email: 'john@example.com',
      cpf: '12345678901',
      phone: '11987654321',
      zipCode: '12345678',
      street: 'Rua Exemplo',
      number: '123',
      city: 'São Paulo',
      state: 'SP',
    });

    await inMemoryCustomersRepository.create(customer, customer.createdById);

    jest.spyOn(cacheManager, 'get').mockResolvedValueOnce(null);
    jest.spyOn(cacheManager, 'set').mockResolvedValueOnce(undefined);

    const result = await sut.execute({
      id: customer.id.toString(),
    });

    expect(result.isRight()).toBe(true);

    if (result.isRight()) {
      expect(result.value).toEqual({
        id: customer.id.toString(),
        name: 'John Doe',
        email: 'john@example.com',
        cpf: '12345678901',
        phone: '11987654321',
        zipCode: '12345678',
        street: 'Rua Exemplo',
        number: '123',
        complement: 'Complemento Teste',
        city: 'São Paulo',
      });
    }

    expect(cacheManager.set).toHaveBeenCalledWith(
      `customer:${customer.id.toString()}`,
      expect.any(Object),
      300,
    );
  });

  it('should return a customer from cache if available', async () => {
    const cachedCustomer = {
      id: 'cached-id',
      name: 'Cached Customer',
      email: 'cached@example.com',
      cpf: '12345678901',
      phone: '11987654321',
      zipCode: '12345678',
      street: 'Rua Cache',
      number: '456',
      complement: 'Apto 789',
      city: 'São Paulo',
    };

    jest.spyOn(cacheManager, 'get').mockResolvedValueOnce(cachedCustomer);

    const result = await sut.execute({
      id: 'cached-id',
    });

    expect(result.isRight()).toBe(true);

    if (result.isRight()) {
      expect(result.value).toEqual(cachedCustomer);
    }

    expect(cacheManager.get).toHaveBeenCalledWith('customer:cached-id');
  });

  it('should be able to fetch a customer with complement', async () => {
    const customer = makeCustomer({
      name: 'John Doe',
      email: 'john@example.com',
      cpf: '12345678901',
      phone: '11987654321',
      zipCode: '12345678',
      street: 'Rua Exemplo',
      number: '123',
      complement: 'Apto 456',
      city: 'São Paulo',
      state: 'SP',
    });

    await inMemoryCustomersRepository.create(customer, customer.createdById);

    const result = await sut.execute({
      id: customer.id.toString(),
    });

    expect(result.isRight()).toBe(true);

    if (result.isRight()) {
      expect(result.value.complement).toBe('Apto 456');
    }
  });

  it('should not be able to fetch a non-existing customer', async () => {
    const result = await sut.execute({
      id: 'non-existing-id',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(CustomerNotFoundError);
  });
});
