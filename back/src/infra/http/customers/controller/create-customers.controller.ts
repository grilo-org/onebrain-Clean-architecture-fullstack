import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
} from '@nestjs/common';
import { CreateCustomerUseCase } from 'src/domain/usecases/customers/create-customers';
import { DocumentAlreadyInUseError } from 'src/domain/usecases/errors';
import { EmailAlreadyInUseError } from 'src/domain/usecases/errors/EmailAlreadyInUse.error';
import { CurrentUser } from 'src/infra/auth/current-user-decorator';
import { UserPayload } from 'src/infra/auth/jwt.strategy';
import { ZodValidationPipe } from 'src/infra/database/pipe/zod-validation-pipe';
import { z } from 'zod';

export const createCustomerSchema = z.object({
  name: z.string().min(2, 'O nome deve ter no mínimo 2 caracteres'),
  email: z.string().email('Email inválido'),
  cpf: z.string().min(11, 'CPF inválido'),
  phone: z.string().min(10, 'Telefone inválido'),
  zipCode: z.string().min(8, 'CEP inválido'),
  street: z.string().min(2, 'Rua inválida'),
  number: z.string().min(1, 'Número inválido'),
  complement: z.string().optional(),
  city: z.string().min(2, 'Cidade inválida'),
  state: z.string().min(2, 'Estado inválido'),
});

type CreateCustomerInput = z.infer<typeof createCustomerSchema>;

@Controller('customers')
export class CreateCustomerController {
  constructor(private createCustomerUseCase: CreateCustomerUseCase) {}

  @Post()
  async create(
    @Body(new ZodValidationPipe(createCustomerSchema))
    body: CreateCustomerInput,
    @CurrentUser() user: UserPayload,
  ) {
    const result = await this.createCustomerUseCase.execute({
      ...body,
      createdById: user.userId,
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

    return result.value;
  }
}
