import { BadRequestException, Body, ConflictException, Controller, Delete, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { UserPayload } from 'src/infra/auth/jwt.strategy';
import { CurrentUser } from 'src/infra/auth/current-user-decorator';
import { DeleteCustomerUseCase } from 'src/domain/usecases/customers/delete-customers';
import { CustomerNotFoundError } from 'src/domain/errors';

@Controller('customers/:id')
export class DeleteCustomerController {
  constructor(private deleteCustomerUseCase: DeleteCustomerUseCase) {}

  @Delete()
  async create(
    @Param('id') id: string,
    @CurrentUser() user: UserPayload 
  ) {
    console.log(id)

    const result = await this.deleteCustomerUseCase.execute({
      id: id,
      createdById: user.userId
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case CustomerNotFoundError:
          throw new NotFoundException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }
    
    return result.value
  }
}