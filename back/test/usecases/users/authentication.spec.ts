import { InMemoryUsersRepository } from "test/repository/in-memory-users-repository";
import { AuthenticationUseCase } from "src/domain/usecases/users/authentication";
import { makeUser } from "test/factory/make-users";
import { InvalidCredentialsError } from "src/domain/usecases/errors/InvalidCredentials.error";
import { UserNotFoundError } from "src/domain/usecases/errors/userNotFound.error";
import { UserInactiveError } from "src/domain/usecases/errors/UserInactive.error";
import { InMemoryEncrypter, InMemoryHashComparer } from "test/repository/in-memory-cryptography";

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryEncrypter: InMemoryEncrypter;
let inMemoryHashComparer: InMemoryHashComparer;
let sut: AuthenticationUseCase;

describe('Authentication UseCase', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryEncrypter = new InMemoryEncrypter();
    inMemoryHashComparer = new InMemoryHashComparer();
    
    sut = new AuthenticationUseCase(
      inMemoryUsersRepository,
      inMemoryEncrypter,
      inMemoryHashComparer
    );
  });

  it('should be able to authenticate with valid credentials', async () => {
    const user = makeUser({
      email: 'john@example.com',
      password: 'hashed_password123', 
      active: true
    });

    await inMemoryUsersRepository.create(user);

    const result = await sut.execute({
      email: 'john@example.com',
      password: 'password123'
    });

    expect(result.isRight()).toBe(true);
    
    if (result.isRight()) {
      expect(result.value).toEqual({
        token: expect.any(String),
        user: {
          id: user.id.toString(),
          name: user.name,
          email: 'john@example.com'
        }
      });
      
      expect(inMemoryEncrypter.items).toHaveLength(1);
      expect(JSON.parse(inMemoryEncrypter.items[0].token)).toEqual({
        userId: user.id.toString()
      });
    }
  });

  it('should not be able to authenticate with wrong email', async () => {
    const result = await sut.execute({
      email: 'nonexistent@example.com',
      password: 'password123'
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(UserNotFoundError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const user = makeUser({
      email: 'john@example.com',
      password: 'hashed_correctpassword',
      active: true
    });

    await inMemoryUsersRepository.create(user);

    const result = await sut.execute({
      email: 'john@example.com',
      password: 'wrongpassword' 
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able to authenticate an inactive user', async () => {

    const user = makeUser({
      email: 'john@example.com',
      password: 'hashed_password123',
      active: false
    });

    console.log('Valor de active antes de salvar:', user.active);
    
    await inMemoryUsersRepository.create(user);
    
    const savedUser = inMemoryUsersRepository.items.find(
      item => item.email === 'john@example.com'
    );
    console.log('Usuário salvo no repositório:', savedUser ? {
      email: savedUser.email,
      active: savedUser.active
    } : 'não encontrado');

    const result = await sut.execute({
      email: 'john@example.com',
      password: 'password123'
    });

    console.log('Resultado da autenticação:', {
      isLeft: result.isLeft(),
      value: result.value instanceof UserInactiveError 
        ? 'UserInactiveError' 
        : (result.isRight() ? 'Right value' : 'Other error')
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(UserInactiveError);
  });
}); 