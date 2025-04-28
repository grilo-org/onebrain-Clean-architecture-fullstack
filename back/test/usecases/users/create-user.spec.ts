import { InMemoryUsersRepository } from "test/repository/in-memory-users-repository";
import { CreateUserUseCase } from "src/domain/usecases/users/create-users";
import { makeUser } from "test/factory/make-users";
import { EmailAlreadyInUseError } from "src/domain/usecases/errors/EmailAlreadyInUse.error";
import { InMemoryHashGenerator } from "test/repository/in-memory-cryptography";

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryHashGenerator: InMemoryHashGenerator;
let sut: CreateUserUseCase;

describe('Create User UseCase', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryHashGenerator = new InMemoryHashGenerator();
    sut = new CreateUserUseCase(
      inMemoryUsersRepository,
      inMemoryHashGenerator
    );
  });

  it('should be able to create a new user', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123'
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryUsersRepository.items).toHaveLength(1);
    
    if (result.isRight()) {
      expect(result.value.user).toEqual({
        id: expect.any(String),
        name: 'John Doe',
        email: 'john@example.com'
      });
      
      expect(inMemoryUsersRepository.items[0].password).toBe('hashed_password123');
    }
  });

  it('should not be able to create a user with an email that is already in use', async () => {
    const existingUser = makeUser({
      email: 'john@example.com',
    });

    await inMemoryUsersRepository.create(existingUser);

    const result = await sut.execute({
      name: 'Another John',
      email: 'john@example.com',
      password: 'password456'
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EmailAlreadyInUseError);
    expect(inMemoryUsersRepository.items).toHaveLength(1);
  });
}); 