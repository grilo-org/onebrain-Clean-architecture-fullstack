import { Injectable } from '@nestjs/common';
import { left, right } from "@/core/either";
import { UsersRepository } from "@/domain/repositories/users/users.repository";
import { User } from "@/domain/models/entity/user.entity";
import { HashGenerator } from "@/domain/repositories/cryptography/hash-generator";
import { EmailAlreadyInUseError } from "@/domain/errors";
import { CreateUserUseCaseRequest } from "@/domain/models/request/user/create-user.request";
import { CreateUserUseCaseResponse } from "@/domain/models/response/user/create-user.response";

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashGenerator: HashGenerator
  ) {}

  async execute(input: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(input.email)
    if (userWithSameEmail) {
      return left(new EmailAlreadyInUseError())
    }

    const hashedPassword = await this.hashGenerator.hash(input.password)

    const user = User.create({
      name: input.name,
      email: input.email,
      password: hashedPassword
    })

    await this.usersRepository.create(user)

    return right({
      user: {
        id: user.id.toString(),
        name: user.name,
        email: user.email
      }
    })
  }
}