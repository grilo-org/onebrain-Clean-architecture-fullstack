import { UseCaseError } from 'src/core/errors'

export class EmailAlreadyInUseError
  extends Error
  implements UseCaseError
{
  constructor() {
    super()
    this.statusCode = 409
    this.message = 'O email já está em uso'
  }

  statusCode: number
}