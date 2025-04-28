export interface IGetCustomersService {
  fetchCustomers: () => Promise<Customer[]>
}

export interface Customer {
  id: string
  name: string
  email: string
  cpf: string
  phone: string
  zipCode: string
  street: string
  number: string
  complement?: string
  city: string
  active: boolean
}
