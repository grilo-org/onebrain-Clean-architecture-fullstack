import { Entity } from "src/core/entities/entity"

export interface UserProps {
  name: string
  email: string
  password: string
  active: boolean
  createdAt: Date
  updatedAt: Date
}

export class User extends Entity<UserProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
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
  
  setActive(active: boolean) {
    this.setProps({
      active,
      updatedAt: new Date()
    })
  }

  static create(
    props: Omit<UserProps, 'active' | 'createdAt' | 'updatedAt'>, 
    id?: string
  ) {
    return new User({
      ...props,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, id)
  }

}