
import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { UsersRepository } from "src/domain/repositories/users/users.repository";
import { PrismaUserRepository } from "./prisma/users/repository/users.repository";
import { CustomersRepository } from "src/domain/repositories/customers/customers.repository";
import { PrismaCustomerRepository } from "./prisma/customers/repository/customers.repository";

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: CustomersRepository,
      useClass: PrismaCustomerRepository,
    }
  ],

  exports: [
    PrismaService,
    UsersRepository,
    CustomersRepository
  ],
})
export class DataBaseModule {}