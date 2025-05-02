import { UseCaseError } from 'src/core/errors'

export class DocumentAlreadyInUseError
  extends Error
  implements UseCaseError
{
  constructor() {
    super()
    this.statusCode = 409
    this.message = 'O documento já está em uso'
  }

  statusCode: number
}