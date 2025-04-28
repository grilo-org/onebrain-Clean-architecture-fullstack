export interface IGetCustomerByIdService {
  fetchCustomerById: (id: string) => Promise<Customer>
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
  state?: string
  active: boolean
}
