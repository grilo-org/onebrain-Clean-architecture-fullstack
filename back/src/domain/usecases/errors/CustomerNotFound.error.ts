import { UseCaseError } from 'src/core/errors'

export class CustomerNotFoundError
  extends Error
  implements UseCaseError
{
  constructor() {
    super()
    this.statusCode = 404
    this.message = 'Este cliente não existe'
  }

  statusCode: number
}