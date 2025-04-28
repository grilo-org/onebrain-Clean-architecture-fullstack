import { Either, left, right } from "src/core/either";
import { Encrypter } from "src/domain/repositories/cryptography/encrypter";
import { UsersRepository } from "src/domain/repositories/users/users.repository";
import { UserNotFoundError } from "../errors/userNotFound.error";
import { InvalidCredentialsError } from "../errors/InvalidCredentials.error";
import { HashComparer } from "src/domain/repositories/cryptography/hash-comparer";
import { UserInactiveError } from "../errors/UserInactive.error";
import { Injectable } from "@nestjs/common";

type AuthenticationUseCaseResponse = Either<Error, {
    token: string
    user: {
        id: string
        name: string
        email: string
    }
}>

type AuthenticationUseCaseRequest = {
    email: string
    password: string
}

@Injectable()
export class AuthenticationUseCase {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly encrypter: Encrypter,
        private readonly hashComparer: HashComparer
    ) {}

    async execute(input: AuthenticationUseCaseRequest): Promise<AuthenticationUseCaseResponse> {
        const user = await this.usersRepository.findByEmail(input.email)
        if (!user) {
            return left(new UserNotFoundError())
        }

        const passwordMatch = await this.hashComparer.compare(input.password, user.password)

        if (!passwordMatch) {
            return left(new InvalidCredentialsError())
        }

        if (!user.active) {
            return left(new UserInactiveError())
        }

        const token = await this.encrypter.encrypt({ userId: user.id })

        return right({ 
            token,
            user: {
                id: user.id.toString(),
                name: user.name,
                email: user.email
            }
        })
        
    }
}

