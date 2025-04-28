import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";
import { CustomersRepository } from "src/domain/repositories/customers/customers.repository";
import { Customer } from "src/domain/models/customers.model";
import { PrismaCustomerMapper } from "../mappers/customers.mapper";

@Injectable()
export class PrismaCustomerRepository implements CustomersRepository {
  constructor(
    private prisma: PrismaService,
  ) {}


  async findAll(): Promise<Customer[]> {
    const customers = await this.prisma.customer.findMany();

    return customers.map(PrismaCustomerMapper.toDomain);
  }


  async create(customer: Customer, createdById: string): Promise<Customer> {
    const customerData = PrismaCustomerMapper.toPrisma(customer);
    
    const createdCustomer = await this.prisma.customer.create({
      data: {
        ...customerData,
        createdBy: {
          connect: {
            id: createdById
          }
        }
      } as any
    });
    
    return PrismaCustomerMapper.toDomain(createdCustomer);
  }

    async findByEmail(email: string): Promise<Customer | null> {
        const customer = await this.prisma.customer.findUnique({
            where: { email },
        });
        return customer ? PrismaCustomerMapper.toDomain(customer) : null;
    }

    async findByCpf(cpf: string): Promise<Customer | null> {
        const customer = await this.prisma.customer.findUnique({
            where: { cpf },
        });
        return customer ? PrismaCustomerMapper.toDomain(customer) : null;
    }

    async findById(id: string): Promise<Customer | null> {
        const customer = await this.prisma.customer.findUnique({
            where: { id },
        });
        return customer ? PrismaCustomerMapper.toDomain(customer) : null;
    }

    async update(customer: Customer): Promise<Customer> {
        const customerData = PrismaCustomerMapper.toPrisma(customer);
        const updatedCustomer = await this.prisma.customer.update({
            where: { id: customer.id.toString() },
            data: customerData,
        });
        return PrismaCustomerMapper.toDomain(updatedCustomer);
    }

    async delete(id: string): Promise<void> {
        await this.prisma.customer.delete({
            where: { id },
        });
    }

    async save(customer: Customer): Promise<Customer> {
        const customerData = PrismaCustomerMapper.toPrisma(customer);
        const updatedCustomer = await this.prisma.customer.update({
            where: { id: customer.id.toString() },
            data: customerData,
        });
        return PrismaCustomerMapper.toDomain(updatedCustomer);
    }
  }
