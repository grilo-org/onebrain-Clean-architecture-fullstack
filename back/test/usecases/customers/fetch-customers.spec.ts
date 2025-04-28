import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Test, TestingModule } from '@nestjs/testing';
import { Cache } from 'cache-manager';
import { FetchCustomersUseCase } from 'src/domain/usecases/customers/fetch-customers';
import { InMemoryCustomersRepository } from 'test/repository/in-memory-customers-repository';

let inMemoryCustomersRepository: InMemoryCustomersRepository;
let sut: FetchCustomersUseCase;
let cacheManager: Cache;

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
  sut = new FetchCustomersUseCase(inMemoryCustomersRepository, cacheManager);
});

it('should return customers from cache if available', async () => {
  const cachedCustomers = [
    { name: 'Cached Customer 1', email: 'cached1@example.com' },
    { name: 'Cached Customer 2', email: 'cached2@example.com' },
  ];

  jest.spyOn(cacheManager, 'get').mockResolvedValueOnce(cachedCustomers);

  const result = await sut.execute();

  expect(result.isRight()).toBe(true);

  if (result.isRight()) {
    expect(result.value).toHaveLength(2);
    expect(result.value).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Cached Customer 1',
          email: 'cached1@example.com',
        }),
        expect.objectContaining({
          name: 'Cached Customer 2',
          email: 'cached2@example.com',
        }),
      ]),
    );
  }

  expect(cacheManager.get).toHaveBeenCalledWith('customers:all');
});
