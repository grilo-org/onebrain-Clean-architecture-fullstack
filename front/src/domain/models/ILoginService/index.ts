export interface ILoginService {
  login: (credentials: LoginCredentials) => Promise<string>
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
}
