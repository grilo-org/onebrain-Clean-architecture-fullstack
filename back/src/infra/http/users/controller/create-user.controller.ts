import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
} from '@nestjs/common';
import { DocumentAlreadyInUseError } from 'src/domain/usecases/errors';
import { EmailAlreadyInUseError } from 'src/domain/usecases/errors/EmailAlreadyInUse.error';
import { CreateUserUseCase } from 'src/domain/usecases/users/create-users';
import { Public } from 'src/infra/auth/public';
import { ZodValidationPipe } from 'src/infra/database/pipe/zod-validation-pipe';
import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(2, 'O nome deve ter no mínimo 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

type CreateUserInput = z.infer<typeof createUserSchema>;

@Controller('users')
export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post()
  @Public()
  async create(
    @Body(new ZodValidationPipe(createUserSchema)) body: CreateUserInput,
  ) {
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

    return result.value;
  }
}
