import { HttpClient } from '@/infrastructure/api/HttpClient'
import { LoginService } from '@/infrastructure/services/LoginService'

let loginServiceInstance: LoginService | null = null

export const fetchLoginServiceInstance = (): LoginService => {
  if (!loginServiceInstance) {
    const httpClient = HttpClient.create()
    loginServiceInstance = new LoginService(httpClient)
  }
  return loginServiceInstance
}

export const fetchLogin = async (credentials: { email: string; password: string }) => {
  const service = fetchLoginServiceInstance()
  return await service.login(credentials)
}
