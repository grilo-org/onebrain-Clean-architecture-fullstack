import { User } from '@/domain/models/User'
import { IUserRepository } from '@/domain/repositories/IUserRepository'

export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(userData: { name: string; email: string; password: string }): Promise<User> {
    const user = new User(userData)
    return await this.userRepository.create(user)
  }
}
