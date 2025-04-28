import { HttpClient } from '@/infrastructure/api/HttpClient'
import { CreateUserService } from '@/infrastructure/services/CreateUserService'

let createUserServiceInstance: CreateUserService | null = null

export const fetchCreateUserServiceInstance = (): CreateUserService => {
  if (!createUserServiceInstance) {
    const httpClient = HttpClient.create()
    createUserServiceInstance = new CreateUserService(httpClient)
  }
  return createUserServiceInstance
}

export const fetchCreateUser = async (userData: { name: string; email: string; password: string }) => {
  const service = fetchCreateUserServiceInstance()
  return await service.createUser(userData)
}
