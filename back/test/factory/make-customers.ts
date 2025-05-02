import { PrismaCustomerMapper } from '@/data/prisma/customers/mappers/customers.mapper'
import { PrismaService } from '@/data/prisma.service'
import { Customer, CustomerProps } from '@/domain/models/entity/customer.entity'
import { Injectable } from '@nestjs/common'

import { Prisma } from '@prisma/client'

export function makeCustomer(override: Partial<CustomerProps> = {}) {
  const customer = Customer.create({
    idCustomer: '4321',
    name: 'Ativo',
    email: 'teste@teste.com',
    cpf: '12345678901',
    phone: '12345678901',
    zipCode: '12345678901',
    street: 'Rua Teste',
    number: '123',
    complement: 'Complemento Teste',
    city: 'São Paulo',
    state: 'SP',
    createdById: '1',
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...override,
  })
  return customer
}

@Injectable()
export class CustomerFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaCustomer(
    data: Partial<CustomerProps> = {},
  ): Promise<Customer> {
    const customer = makeCustomer(data)

    await this.prisma.customer.create({
      data: PrismaCustomerMapper.toPrisma(customer) as Prisma.CustomerCreateInput,
    })

    return customer
  }
}