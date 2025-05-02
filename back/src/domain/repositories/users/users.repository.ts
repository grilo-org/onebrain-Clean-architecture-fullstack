import { User } from "@/domain/models/entity/user.entity"

export abstract class UsersRepository {
    abstract create(user: User): Promise<User>
    abstract findByEmail(email: string): Promise<User | null>
  }