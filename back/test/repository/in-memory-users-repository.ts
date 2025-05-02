import { Injectable } from "@nestjs/common";
import { User } from "@/domain/models/entity/user.entity";
import { UsersRepository } from "@/domain/repositories/users/users.repository";


@Injectable()
export class InMemoryUsersRepository implements UsersRepository {
  logs: any[] = []
  constructor(public items: User[] = []) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => 
      item.email === email
    );
    
    return user || null;
  }

  async create(user: User): Promise<User> {
    this.items.push(user)
    return user
  }


}