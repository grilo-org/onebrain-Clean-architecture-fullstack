export interface IUpdateCustomerService {
  updateCustomer: (id: string, customerData: UpdateCustomerData) => Promise<void>
}

export interface UpdateCustomerData {
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
