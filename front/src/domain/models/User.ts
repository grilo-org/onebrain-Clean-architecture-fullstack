export class User {
  id?: string
  name: string
  email: string
  password: string
  createdAt: Date

  constructor(data: { id?: string; name: string; email: string; password: string; createdAt?: Date }) {
    this.id = data.id
    this.name = data.name
    this.email = data.email
    this.password = data.password
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

    if (!this.password || this.password.length < 6) {
      throw new Error('Password must be at least 6 characters')
    }
  }
}
