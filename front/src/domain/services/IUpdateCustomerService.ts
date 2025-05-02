export interface IUpdateCustomerService {
  updateCustomer: (id: string, customerData: UpdateCustomerData) => Promise<CustomerResponse>
}

export interface UpdateCustomerData {
  name?: string
  email?: string
  cpf?: string
  phone?: string
  zipCode?: string
  street?: string
  number?: string
  complement?: string
  city?: string
  state?: string
}

export interface CustomerResponse {
  id: string
  name: string
  email: string
  cpf: string
  phone: string
  address: {
    zipCode: string
    street: string
    number: string
    complement?: string
    city: string
    state?: string
  }
}
