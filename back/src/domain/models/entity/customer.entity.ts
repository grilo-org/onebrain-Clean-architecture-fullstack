import { Entity } from "src/core/entities/entity"

export interface CustomerProps {
  idCustomer?: string
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
  active: boolean
  createdAt: Date
  updatedAt: Date
  createdById: string
}

export class Customer extends Entity<CustomerProps> {
  get idCustomer() {
    return this.id
  }

  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get cpf() {
    return this.props.cpf
  }

  get phone() {
    return this.props.phone
  }

  get zipCode() {
    return this.props.zipCode
  }

  get street() {
    return this.props.street
  }

  get number() {
    return this.props.number
  }

  get complement() {
    return this.props.complement
  }

  get city() {
    return this.props.city
  }

  get state() {
    return this.props.state
  }

  get active() {
    return this.props.active
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get createdById() {
    return this.props.createdById
  }

static create(
  props: Omit<CustomerProps, 'active' | 'createdAt' | 'updatedAt'>, 
  id?: string
) {
    return new Customer({
      ...props,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdById: props.createdById
    }, id)
  }

  update(data: Partial<Omit<CustomerProps, 'id' | 'active' | 'createdAt' | 'updatedAt'>>) {
    this.setProps({
      ...data,
      updatedAt: new Date(),
    })
  }
  
  setActive(active: boolean) {
    this.setProps({
      active,
      updatedAt: new Date()
    })
  }
}