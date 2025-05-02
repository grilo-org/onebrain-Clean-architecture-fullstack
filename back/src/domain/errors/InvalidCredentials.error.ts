import { UseCaseError } from 'src/core/errors'

export class InvalidCredentialsError
  extends Error
  implements UseCaseError
{
  constructor() {
    super()
    this.statusCode = 401
    this.message = 'As credenciais informadas são inválidas'
  }

  statusCode: number
}