import { UseCaseError } from 'src/core/errors'

export class UserNotFoundError
  extends Error
  implements UseCaseError
{
  constructor() {
    super()
    this.statusCode = 404
    this.message = 'Este usuário não existe'
  }

  statusCode: number
}