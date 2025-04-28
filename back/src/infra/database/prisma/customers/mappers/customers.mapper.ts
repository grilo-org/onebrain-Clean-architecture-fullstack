import { Prisma, Customer as PrismaCustomer } from '@prisma/client';
import { Customer } from 'src/domain/models/customers.model';

export class PrismaCustomerMapper {
  static toDomain(raw: PrismaCustomer): Customer {
    return Customer.create(
      {
        idCustomer: raw.id,
        name: raw.name,
        email: raw.email,
        cpf: raw.cpf,
        phone: raw.phone,
        zipCode: raw.zipCode,
        street: raw.street,
        number: raw.number,
        complement: raw.complement ?? undefined,
        city: raw.city,
        state: raw.state,
        createdById: raw.createdById,
      },
      raw.id,
    );
  }

  static toPrisma(raw: Customer): Prisma.CustomerUpdateInput {
    return {
      id: raw.id.toString(),
      name: raw.name,
      email: raw.email,
      cpf: raw.cpf,
      phone: raw.phone,
      zipCode: raw.zipCode,
      street: raw.street,
      number: raw.number,
      complement: raw.complement ?? undefined,
      city: raw.city,
      state: raw.state,
      active: raw.active,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    };
  }
}
