import { Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { PrismaCustomerRepository } from './prisma/customers/repository/customers.repository'
import { CustomersRepository } from '@/domain/repositories/customers/customers.repository'
import { UsersRepository } from '@/domain/repositories/users/users.repository'
import { PrismaUserRepository } from './prisma/users/repository/prisma-user-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: CustomersRepository,
      useClass: PrismaCustomerRepository,
    },
    {
      provide: UsersRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [
    PrismaService,
    CustomersRepository,
    UsersRepository,
  ],
})
export class DataModule {} 