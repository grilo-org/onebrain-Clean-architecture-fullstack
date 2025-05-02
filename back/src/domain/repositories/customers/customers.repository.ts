import { Customer } from "../../models/entity/customer.entity"

export abstract class CustomersRepository {
    abstract create(customer: Customer, createdById: string): Promise<Customer>
    abstract findByEmail(email: string): Promise<Customer | null>
    abstract findByCpf(cpf: string): Promise<Customer | null>
    abstract findById(id: string): Promise<Customer | null>
    abstract update(customer: Customer): Promise<Customer>
    abstract save(customer: Customer): Promise<Customer>
    abstract delete(id: string): Promise<void>
    abstract findAll(): Promise<Customer[]>
  }