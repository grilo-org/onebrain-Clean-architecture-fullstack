import { Injectable } from "@nestjs/common";
import { left, right } from "@/core/either";
import { UsersRepository } from "@/domain/repositories/users/users.repository";
import { AuthenticationUseCaseResponse } from "@/domain/models/response/user/authentication-user.response";
import { AuthenticationUseCaseRequest } from "@/domain/models/request/user/authentication-user.request";
import { InvalidCredentialsError, UserInactiveError, UserNotFoundError } from "@/domain/errors";
import { Encrypter, HashComparer } from "@/domain/repositories/cryptography";


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

