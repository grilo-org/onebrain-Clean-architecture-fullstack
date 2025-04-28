import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  NotFoundException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { InvalidCredentialsError } from 'src/domain/usecases/errors/InvalidCredentials.error';
import { UserInactiveError } from 'src/domain/usecases/errors/UserInactive.error';
import { UserNotFoundError } from 'src/domain/usecases/errors/userNotFound.error';
import { AuthenticationUseCase } from 'src/domain/usecases/users/authentication';
import { Public } from 'src/infra/auth/public';
import { ZodValidationPipe } from 'src/infra/database/pipe/zod-validation-pipe';
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

type LoginInput = z.infer<typeof loginSchema>;

@Controller(['auth/login'])
@Public()
export class AuthenticationController {
  constructor(private authenticationUseCase: AuthenticationUseCase) {}

  @Post()
  @HttpCode(200)
  async login(@Body(new ZodValidationPipe(loginSchema)) body: LoginInput) {
    const result = await this.authenticationUseCase.execute(body);

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case InvalidCredentialsError:
          throw new UnauthorizedException(error.message);
        case UserNotFoundError:
          throw new NotFoundException(error.message);
        case UserInactiveError:
          throw new ForbiddenException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }

    return result.value;
  }
}
