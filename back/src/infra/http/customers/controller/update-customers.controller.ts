import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Param,
  Put,
} from '@nestjs/common';
import { UpdateCustomerUseCase } from 'src/domain/usecases/customers/update-customers';
import { DocumentAlreadyInUseError } from 'src/domain/usecases/errors';
import { EmailAlreadyInUseError } from 'src/domain/usecases/errors/EmailAlreadyInUse.error';
import { CurrentUser } from 'src/infra/auth/current-user-decorator';
import { UserPayload } from 'src/infra/auth/jwt.strategy';
import { ZodValidationPipe } from 'src/infra/database/pipe/zod-validation-pipe';
import { z } from 'zod';

export const updateCustomerSchema = z.object({
  name: z.string().min(2, 'O nome deve ter no mínimo 2 caracteres'),
  email: z.string().email('Email inválido'),
  cpf: z.string().min(11, 'O CPF deve ter no mínimo 11 caracteres'),
  phone: z.string().min(11, 'O telefone deve ter no mínimo 11 caracteres'),
  zipCode: z.string().min(8, 'O CEP deve ter no mínimo 8 caracteres'),
  street: z.string().min(2, 'O logradouro deve ter no mínimo 2 caracteres'),
  number: z.string().min(1, 'O número deve ter no mínimo 1 caracter'),
  complement: z.string().optional(),
  city: z.string().min(2, 'A cidade deve ter no mínimo 2 caracteres'),
  state: z
    .string()
    .min(2, 'O estado deve ter no mínimo 2 caracteres')
    .optional(),
});

type UpdateCustomerInput = z.infer<typeof updateCustomerSchema>;

@Controller('customers/:id')
export class UpdateCustomerController {
  constructor(private updateCustomerUseCase: UpdateCustomerUseCase) {}

  @Put()
  async create(
    @Body(new ZodValidationPipe(updateCustomerSchema))
    body: UpdateCustomerInput,
    @Param('id') id: string,
    @CurrentUser() user: UserPayload,
  ) {
    console.log(id);

    const result = await this.updateCustomerUseCase.execute({
      ...body,
      id: id,
      createdById: user.userId,
    });

    console.log(result);

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
