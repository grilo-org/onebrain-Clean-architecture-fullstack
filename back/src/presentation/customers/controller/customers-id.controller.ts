import { BadRequestException, Body, ConflictException, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { UserPayload } from 'src/infra/auth/jwt.strategy';
import { CurrentUser } from 'src/infra/auth/current-user-decorator';
import { CustomerNotFoundError } from 'src/domain/errors';
import { FetchCustomerIdUseCase } from 'src/domain/usecases/customers/fetch-customer-id';


@Controller('customers/:id')
export class FetchCustomersIdController {
  constructor(private fetchCustomersIdUseCase: FetchCustomerIdUseCase) {}

  @Get()
  async create(
    @CurrentUser() user: UserPayload,
    @Param('id') id: string

  ) {

    const result = await this.fetchCustomersIdUseCase.execute({
      id: id
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