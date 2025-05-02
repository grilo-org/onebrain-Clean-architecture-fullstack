import { BadRequestException, Body, ConflictException, Controller, HttpStatus, Post } from '@nestjs/common';
import { CreateUserUseCase } from '@/domain/usecases/users/create-users';
import { ZodValidationPipe } from '@/infra/pipe/zod-validation-pipe';
import { DocumentAlreadyInUseError } from '@/domain/errors';
import { EmailAlreadyInUseError } from '@/domain/errors/EmailAlreadyInUse.error';
import { Public } from '@/infra/auth/public';
import { CreateUserInput } from '@/presentation/users/types';
import { createUserSchema } from '@/presentation/users/schema/create-user.schema';

@Controller('users')
export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post()
  @Public()
  async create(@Body(new ZodValidationPipe(createUserSchema)) body: CreateUserInput) {
    const result = await this.createUserUseCase.execute(body);

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