export interface ICreateUserService {
  createUser: (userData: CreateUserData) => Promise<UserResponse>
}

export interface CreateUserData {
  name: string
  email: string
  password: string
}

export interface UserResponse {
  user: {
    id: string
    name: string
    email: string
  }
}
