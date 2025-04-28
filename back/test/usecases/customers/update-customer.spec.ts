import { InMemoryCustomersRepository } from "test/repository/in-memory-customers-repository";
import { UpdateCustomerUseCase } from "src/domain/usecases/customers/update-customers";
import { makeCustomer } from "test/factory/make-customers";
import { EmailAlreadyInUseError } from "src/domain/usecases/errors/EmailAlreadyInUse.error";
import { CustomerNotFoundError, DocumentAlreadyInUseError } from "src/domain/usecases/errors";

let inMemoryCustomersRepository: InMemoryCustomersRepository;
let sut: UpdateCustomerUseCase;

describe('Update Customer UseCase', () => {
  beforeEach(() => {
    inMemoryCustomersRepository = new InMemoryCustomersRepository();
    sut = new UpdateCustomerUseCase(inMemoryCustomersRepository);
  });

  it('should be able to update a customer', async () => {
    const customer = makeCustomer({
      name: 'Old Name',
      email: 'old@example.com',
      cpf: '12345678901'
    });
    
    await inMemoryCustomersRepository.create(customer, customer.createdById);

    const result = await sut.execute({
      id: customer.id.toString(),
      name: 'New Name',
      email: 'new@example.com',
      cpf: '12345678901', // Mesmo CPF
      phone: '11987654321',
      zipCode: '12345678',
      street: 'Rua Nova',
      number: '123',
      city: 'Rio de Janeiro',
      state: 'RJ',
      createdById: customer.createdById
    });

    expect(result.isRight()).toBe(true);
    
    if (result.isRight()) {
      expect(result.value.customer).toEqual({
        id: customer.id.toString(),
        name: 'New Name',
        email: 'new@example.com'
      });
      
      const updatedCustomer = await inMemoryCustomersRepository.findById(customer.id.toString());
      expect(updatedCustomer?.name).toBe('New Name');
      expect(updatedCustomer?.email).toBe('new@example.com');
      expect(updatedCustomer?.city).toBe('Rio de Janeiro');
    }
  });

  it('should not be able to update a non-existing customer', async () => {
    const result = await sut.execute({
      id: 'non-existing-id',
      name: 'New Name',
      email: 'new@example.com',
      cpf: '12345678901',
      phone: '11987654321',
      zipCode: '12345678',
      street: 'Rua Nova',
      number: '123',
      city: 'Rio de Janeiro',
      state: 'RJ',
      createdById: '1'
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(CustomerNotFoundError);
  });

  it('should not be able to update a customer with an email that is already in use by another customer', async () => {
    const customer1 = makeCustomer({
      email: 'customer1@example.com',
      cpf: '11111111111'
    });
    
    const customer2 = makeCustomer({
      email: 'customer2@example.com',
      cpf: '22222222222'
    });
    
    await inMemoryCustomersRepository.create(customer1, customer1.createdById);
    await inMemoryCustomersRepository.create(customer2, customer2.createdById);

    const result = await sut.execute({
      id: customer1.id.toString(),
      name: 'Updated Name',
      email: 'customer2@example.com', 
      cpf: '11111111111',
      phone: '11987654321',
      zipCode: '12345678',
      street: 'Rua Nova',
      number: '123',
      city: 'Rio de Janeiro',
      state: 'RJ',
      createdById: customer1.createdById
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EmailAlreadyInUseError);
  });

  it('should not be able to update a customer with a CPF that is already in use by another customer', async () => {
    const customer1 = makeCustomer({
      email: 'customer1@example.com',
      cpf: '11111111111'
    });
    
    const customer2 = makeCustomer({
      email: 'customer2@example.com',
      cpf: '22222222222'
    });
    
    await inMemoryCustomersRepository.create(customer1, customer1.createdById);
    await inMemoryCustomersRepository.create(customer2, customer2.createdById);

    const result = await sut.execute({
      id: customer1.id.toString(),
      name: 'Updated Name',
      email: 'customer1@example.com',
      cpf: '22222222222', 
      phone: '11987654321',
      zipCode: '12345678',
      street: 'Rua Nova',
      number: '123',
      city: 'Rio de Janeiro',
      state: 'RJ',
      createdById: customer1.createdById
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(DocumentAlreadyInUseError);
  });

  it('should be able to update a customer with the same email and CPF (no change)', async () => {
    const customer = makeCustomer({
      name: 'Old Name',
      email: 'customer@example.com',
      cpf: '12345678901'
    });
    
    await inMemoryCustomersRepository.create(customer, customer.createdById);

    const result = await sut.execute({
      id: customer.id.toString(),
      name: 'New Name',
      email: 'customer@example.com', 
      cpf: '12345678901', 
      phone: '11987654321',
      zipCode: '12345678',
      street: 'Rua Nova',
      number: '123',
      city: 'Rio de Janeiro',
      state: 'RJ',
      createdById: customer.createdById
    });

    expect(result.isRight()).toBe(true);
    
    if (result.isRight()) {
      expect(result.value.customer.name).toBe('New Name');
    }
  });
}); 