import { Either } from "src/core/either"

export type AuthenticationUseCaseResponse = Either<Error, {
    token: string
    user: {
        id: string
        name: string
        email: string
    }
}>
