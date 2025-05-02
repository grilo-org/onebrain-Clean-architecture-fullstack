import { InMemoryCustomersRepository } from "test/repository/in-memory-customers-repository";
import { CreateCustomerUseCase } from "src/domain/usecases/customers/create-customers";
import { makeCustomer } from "test/factory/make-customers";
import { EmailAlreadyInUseError } from "src/domain/errors/EmailAlreadyInUse.error";
import { DocumentAlreadyInUseError } from "src/domain/errors";

let inMemoryCustomersRepository: InMemoryCustomersRepository;
let sut: CreateCustomerUseCase;

describe('Create Customer UseCase', () => {
  beforeEach(() => {
    inMemoryCustomersRepository = new InMemoryCustomersRepository();
    sut = new CreateCustomerUseCase(inMemoryCustomersRepository);
  });

  it('should be able to create a new customer', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'john@example.com',
      cpf: '12345678901',
      phone: '11987654321',
      zipCode: '12345678',
      street: 'Rua Exemplo',
      number: '123',
      city: 'São Paulo',
      state: 'SP',
      createdById: '1'
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryCustomersRepository.items).toHaveLength(1);
    
    if (result.isRight()) {
      expect(result.value.customer).toEqual({
        id: expect.any(String),
        name: 'John Doe',
        email: 'john@example.com'
      });
    }
  });

  it('should not be able to create a customer with an email that is already in use', async () => {

    const existingCustomer = makeCustomer({
      email: 'john@example.com',
    });

    await inMemoryCustomersRepository.create(existingCustomer, existingCustomer.createdById);

    const result = await sut.execute({
      name: 'John Doe',
      email: 'john@example.com', 
      cpf: '98765432101', 
      phone: '11987654321',
      zipCode: '12345678',
      street: 'Rua Exemplo',
      number: '123',
      city: 'São Paulo',
      state: 'SP',
      createdById: '1'
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EmailAlreadyInUseError);
    expect(inMemoryCustomersRepository.items).toHaveLength(1);
  });

  it('should not be able to create a customer with a CPF that is already in use', async () => {

    const existingCustomer = makeCustomer({
      cpf: '12345678901',
    });

    await inMemoryCustomersRepository.create(existingCustomer, existingCustomer.createdById);

    const result = await sut.execute({
      name: 'John Doe',
      email: 'different@example.com', 
      cpf: '12345678901', 
      phone: '11987654321',
      zipCode: '12345678',
      street: 'Rua Exemplo',
      number: '123',
      city: 'São Paulo',
      state: 'SP',
      createdById: '1'
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(DocumentAlreadyInUseError);
    expect(inMemoryCustomersRepository.items).toHaveLength(1);
  });
}); 