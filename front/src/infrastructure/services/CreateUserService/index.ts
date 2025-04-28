import { CreateUserData, ICreateUserService, UserResponse } from '@/domain/models/ICreateUserService'
import { HttpMethod, IHttpClient } from '@/infrastructure/api/HttpClientContract'

export class CreateUserService implements ICreateUserService {
  constructor(private readonly httpClient: IHttpClient) {}

  async createUser(userData: CreateUserData): Promise<UserResponse> {
    try {
      const response = await this.httpClient.sendRequest<UserResponse>({
        endpoint: '/users',
        method: HttpMethod.POST,
        body: userData,
      })

      return response
    } catch (error) {
      throw new Error('Falha ao criar usuário. Verifique os dados fornecidos.')
    }
  }
}
