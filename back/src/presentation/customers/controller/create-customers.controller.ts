import { BadRequestException, Body, ConflictException, Controller, Post } from '@nestjs/common';
import { ZodValidationPipe } from '@/infra/pipe/zod-validation-pipe';

import { DocumentAlreadyInUseError, EmailAlreadyInUseError } from '@/domain/errors';
import { CreateCustomerUseCase } from '@/domain/usecases/customers/create-customers';
import { CreateCustomerInput } from '@/presentation/customers/types/create-customer.types';
import { createCustomerSchema } from '@/presentation/customers/schema/create-customer.schema';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';

@Controller('customers')
export class CreateCustomerController {
  constructor(private createCustomerUseCase: CreateCustomerUseCase) {}

  @Post()
  async create(
    @Body(new ZodValidationPipe(createCustomerSchema)) body: CreateCustomerInput,
    @CurrentUser() user: UserPayload 
  ) {

    const result = await this.createCustomerUseCase.execute({
      ...body,
      createdById: user.userId
    });

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