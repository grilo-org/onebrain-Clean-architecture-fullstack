import { UseCaseError } from 'src/core/errors'

export class UserInactiveError
  extends Error
  implements UseCaseError
{
  constructor() {
    super()
    this.statusCode = 403
    this.message = 'O usuário está inativo'
  }

  statusCode: number
}