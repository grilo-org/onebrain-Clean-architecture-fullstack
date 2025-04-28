import { User } from "src/domain/models/user.model"

export abstract class UsersRepository {
    abstract create(user: User): Promise<User>
    abstract findByEmail(email: string): Promise<User | null>
  }