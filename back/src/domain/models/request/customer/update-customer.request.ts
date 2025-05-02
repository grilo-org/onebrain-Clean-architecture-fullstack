export type UpdateCustomerUseCaseRequest = {
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
    state: string
    createdById: string
  }
  