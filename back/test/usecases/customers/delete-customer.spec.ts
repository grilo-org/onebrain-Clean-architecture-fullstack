import { InMemoryCustomersRepository } from "test/repository/in-memory-customers-repository";
import { DeleteCustomerUseCase } from "src/domain/usecases/customers/delete-customers";
import { makeCustomer } from "test/factory/make-customers";
import { CustomerNotFoundError } from "src/domain/errors";

let inMemoryCustomersRepository: InMemoryCustomersRepository;
let sut: DeleteCustomerUseCase;

describe('Delete Customer UseCase', () => {
  beforeEach(() => {
    inMemoryCustomersRepository = new InMemoryCustomersRepository();
    sut = new DeleteCustomerUseCase(inMemoryCustomersRepository);
  });

  it('should be able to delete a customer', async () => {
    const customer = makeCustomer();
    await inMemoryCustomersRepository.create(customer, customer.createdById);

    const result = await sut.execute({
      id: customer.id.toString(),
      createdById: customer.createdById
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryCustomersRepository.items).toHaveLength(0);
    
    if (result.isRight()) {
      expect(result.value.message).toEqual('Cliente deletado com sucesso');
    }
  });

  it('should not be able to delete a non-existing customer', async () => {
    const result = await sut.execute({
      id: 'non-existing-id',
      createdById: '1'
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(CustomerNotFoundError);
  });
}); 