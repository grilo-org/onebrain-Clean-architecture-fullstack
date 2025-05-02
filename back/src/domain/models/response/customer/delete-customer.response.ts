import { Either } from "@/core/either"

export type DeleteCustomerUseCaseResponse = Either<Error, {
    message: string
  }>
