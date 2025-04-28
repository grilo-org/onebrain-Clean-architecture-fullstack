import { Either, left, right } from "src/core/either";
import { UsersRepository } from "src/domain/repositories/users/users.repository";
import { User } from "src/domain/models/user.model";
import { HashGenerator } from "src/domain/repositories/cryptography/hash-generator";
import { EmailAlreadyInUseError } from "../errors/EmailAlreadyInUse.error";
import { Injectable } from '@nestjs/common';

type CreateUserUseCaseResponse = Either<Error, {
  user: {
    id: string
    name: string
    email: string
  }
}>

type CreateUserUseCaseRequest = {
  name: string
  email: string
  password: string
}

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