import { BadRequestException, Body, Controller, ForbiddenException, HttpException, HttpStatus, NotFoundException, Post, UnauthorizedException } from '@nestjs/common';
import { AuthenticationUseCase } from '@/domain/usecases/users/authentication';
import { UserNotFoundError } from '@/domain/errors/userNotFound.error';
import { InvalidCredentialsError } from '@/domain/errors/InvalidCredentials.error';
import { ZodValidationPipe } from '@/infra/pipe/zod-validation-pipe';
import { UserInactiveError } from '@/domain/errors/UserInactive.error';
import { Public } from '@/infra/auth/public';
import { LoginInput } from '@/presentation/users/types';
import { loginSchema } from '@/presentation/users/schema';

@Controller(['auth/login'])
@Public()
export class AuthenticationController {
  constructor(private authenticationUseCase: AuthenticationUseCase) {}

  @Post()
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
    
    return result.value
  }
}