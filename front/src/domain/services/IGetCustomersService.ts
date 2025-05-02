export interface IGetCustomersService {
  getCustomers: () => Promise<CustomerResponse[]>
}

export interface CustomerResponse {
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
  state?: string
}
