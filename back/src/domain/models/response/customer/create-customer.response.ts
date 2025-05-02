import { Either } from "@/core/either"

export type CreateCustomerUseCaseResponse = Either<Error, {
    customer: {
      id: string
      name: string
      email: string
    }
  }>