export class Customer {
  id?: string
  name: string
  email: string
  phone: string
  createdAt: Date

  constructor(data: { id?: string; name: string; email: string; phone: string; createdAt?: Date }) {
    this.id = data.id
    this.name = data.name
    this.email = data.email
    this.phone = data.phone
    this.createdAt = data.createdAt || new Date()

    this.validate()
  }

  private validate(): void {
    if (!this.name || this.name.length < 3) {
      throw new Error('Name must be at least 3 characters')
    }

    if (!this.email || !this.email.includes('@')) {
      throw new Error('Invalid email')
    }

    if (!this.phone || this.phone.length < 10) {
      throw new Error('Phone number must be at least 10 digits')
    }
  }
}
