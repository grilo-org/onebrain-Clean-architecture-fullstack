import { Customer } from '@/domain/models/Customer'

export interface ICustomerRepository {
  create: (customer: Customer) => Promise<Customer>
  findByEmail: (email: string) => Promise<Customer | null>
  findById: (id: string) => Promise<Customer | null>
  update: (customer: Customer) => Promise<Customer>
  delete: (id: string) => Promise<void>
}
