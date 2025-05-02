import { InMemoryCustomersRepository } from "test/repository/in-memory-customers-repository";
import { FetchCustomerIdUseCase } from "src/domain/usecases/customers/fetch-customer-id";
import { makeCustomer } from "test/factory/make-customers";
import { CustomerNotFoundError } from "src/domain/errors";

let inMemoryCustomersRepository: InMemoryCustomersRepository;
let sut: FetchCustomerIdUseCase;

describe('Fetch Customer by ID UseCase', () => {
  beforeEach(() => {
    inMemoryCustomersRepository = new InMemoryCustomersRepository();
    sut = new FetchCustomerIdUseCase(inMemoryCustomersRepository);
  });

  it('should be able to fetch a customer by ID', async () => {

    const customer = makeCustomer({
      name: 'John Doe',
      email: 'john@example.com',
      cpf: '12345678901',
      phone: '11987654321',
      zipCode: '12345678',
      street: 'Rua Exemplo',
      number: '123',
      city: 'São Paulo',
      state: 'SP'
    });
    
    await inMemoryCustomersRepository.create(customer, customer.createdById);

    const result = await sut.execute({
      id: customer.id.toString()
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
        city: 'São Paulo'
      });
    }
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
      state: 'SP'
    });
    
    await inMemoryCustomersRepository.create(customer, customer.createdById);

    const result = await sut.execute({
      id: customer.id.toString()
    });

    expect(result.isRight()).toBe(true);
    
    if (result.isRight()) {
      expect(result.value.complement).toBe('Apto 456');
    }
  });

  it('should not be able to fetch a non-existing customer', async () => {
    const result = await sut.execute({
      id: 'non-existing-id'
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(CustomerNotFoundError);
  });
}); 