import { BadRequestException, Body, ConflictException, Controller, Param, Put } from '@nestjs/common';
import { ZodValidationPipe } from '@/infra/pipe/zod-validation-pipe';
import { DocumentAlreadyInUseError } from 'src/domain/errors';
import { EmailAlreadyInUseError } from 'src/domain/errors/EmailAlreadyInUse.error';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { UpdateCustomerUseCase } from 'src/domain/usecases/customers/update-customers';
import { UpdateCustomerInput } from '@/presentation/customers/types/update-customer.types';
import { updateCustomerSchema } from '@/presentation/customers/schema/update-customer.schema';

@Controller('customers/:id')
export class UpdateCustomerController {
  constructor(private updateCustomerUseCase: UpdateCustomerUseCase) {}

  @Put()
  async create(
    @Body(new ZodValidationPipe(updateCustomerSchema)) body: UpdateCustomerInput,
    @Param('id') id: string,
    @CurrentUser() user: UserPayload 
  ) {
    console.log(id)

    const result = await this.updateCustomerUseCase.execute({
      ...body,
      id: id,
      createdById: user.userId
    });

    console.log(result)

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case EmailAlreadyInUseError:
          throw new ConflictException(error.message);
        case DocumentAlreadyInUseError:
          throw new ConflictException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }
    
    return result.value
  }
}