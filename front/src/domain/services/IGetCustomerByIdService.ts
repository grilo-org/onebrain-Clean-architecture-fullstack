export interface IGetCustomerByIdService {
  getCustomerById: (id: string) => Promise<CustomerResponse>
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
