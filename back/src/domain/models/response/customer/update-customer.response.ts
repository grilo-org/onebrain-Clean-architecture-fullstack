import { Either } from "@/core/either"

export type UpdateCustomerUseCaseResponse = Either<Error, {
    customer: {
      id: string
      name: string
      email: string
    }
  }>
  