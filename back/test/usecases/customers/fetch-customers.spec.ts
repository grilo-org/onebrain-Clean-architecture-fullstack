import { InMemoryCustomersRepository } from "test/repository/in-memory-customers-repository";
import { FetchCustomersUseCase } from "src/domain/usecases/customers/fetch-customers";
import { makeCustomer } from "test/factory/make-customers";

let inMemoryCustomersRepository: InMemoryCustomersRepository;
let sut: FetchCustomersUseCase;

describe('Fetch Customers UseCase', () => {
  beforeEach(() => {
    inMemoryCustomersRepository = new InMemoryCustomersRepository();
    sut = new FetchCustomersUseCase(inMemoryCustomersRepository);
  });

  it('should be able to fetch all customers', async () => {
    const createdById1 = 'user-1';
    const createdById2 = 'user-2';
    
    const customer1 = makeCustomer({
      name: 'Customer 1',
      email: 'customer1@example.com',
      createdById: createdById1
    });
    
    const customer2 = makeCustomer({
      name: 'Customer 2',
      email: 'customer2@example.com',
      createdById: createdById1
    });

    const customer3 = makeCustomer({
      name: 'Customer 3',
      email: 'customer3@example.com',
      createdById: createdById2
    });
    
    await inMemoryCustomersRepository.create(customer1, createdById1);
    await inMemoryCustomersRepository.create(customer2, createdById1);
    await inMemoryCustomersRepository.create(customer3, createdById2);

    const result = await sut.execute();

    expect(result.isRight()).toBe(true);
    
    if (result.isRight()) {
      expect(result.value).toHaveLength(3);
      expect(result.value).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: 'Customer 1',
            email: 'customer1@example.com'
          }),
          expect.objectContaining({
            name: 'Customer 2',
            email: 'customer2@example.com'
          }),
          expect.objectContaining({
            name: 'Customer 3',
            email: 'customer3@example.com'
          })
        ])
      );
    }
  });

  it('should return an empty array when there are no customers', async () => {
    const result = await sut.execute();

    expect(result.isRight()).toBe(true);
    
    if (result.isRight()) {
      expect(result.value).toHaveLength(0);
    }
  });
}); 