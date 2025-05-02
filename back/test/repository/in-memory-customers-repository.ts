import { Injectable } from "@nestjs/common";
import { Customer } from "../../src/domain/models/entity/customer.entity";
import { CustomersRepository } from "../../src/domain/repositories/customers/customers.repository";


@Injectable()
export class InMemoryCustomersRepository implements CustomersRepository {
  logs: any[] = []
  constructor(public items: Customer[] = []) {}

  async findByCpf(cpf: string): Promise<Customer | null> {
    const customer = this.items.find((item) => 
      item.cpf === cpf
    );
    
    return customer || null;
  }
  async findById(id: string): Promise<Customer | null> {
    const customer = this.items.find((item) => 
      item.id.toString() === id.toString()
    );
    
    return customer || null;
  }

  
  async save(customer: Customer): Promise<Customer> {
    const index = this.items.findIndex(
      (item) => item.id.toString() === customer.id.toString()
    );
    
    if (index !== -1) {
      this.items[index] = customer
    }
    return customer
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((item) => item.id.toString() !== id.toString())
  }

  async create(customer: Customer, createdById: string): Promise<Customer> {
    this.items.push(customer)
    return customer
  }

  async findAll(createdById: string = ''): Promise<Customer[]> {
    // Se createdById for fornecido, filtra por ele, senão retorna todos
    if (createdById) {
      return this.items.filter(item => item.createdById === createdById)
    }
    return this.items
  }

  async findByEmail(email: string): Promise<Customer | null> {
    const customer = this.items.find((item) => 
      item.email === email
    );
    
    return customer || null;
  }

  async update(customer: Customer): Promise<Customer> {
    const index = this.items.findIndex(
      (item) => item.id.toString() === customer.id.toString()
    )
    if (index !== -1) {
      this.items[index] = customer
    }
    return customer
  }

}