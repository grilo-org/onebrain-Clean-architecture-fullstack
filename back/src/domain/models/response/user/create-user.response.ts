import { Either } from "src/core/either"

export type CreateUserUseCaseResponse = Either<Error, {
    user: {
      id: string
      name: string
      email: string
    }
  }>
  
  