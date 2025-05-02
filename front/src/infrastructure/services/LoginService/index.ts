import { setAccessToken } from '@/commons/storage/accessToken'
import { ValidationError } from '@/domain/errors/ValidationError'
import { ILoginService, LoginCredentials, LoginResponse } from '@/domain/services/ILoginService'
import { HttpMethod, IHttpClient } from '@/infrastructure/api/HttpClientContract'

export class LoginService implements ILoginService {
  constructor(private readonly httpClient: IHttpClient) {}

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await this.httpClient.sendRequest<LoginResponse>({
        endpoint: '/auth/login',
        method: HttpMethod.POST,
        body: credentials,
      })
      const { token } = response

      setAccessToken(token)

      return response
    } catch (error) {
      throw new ValidationError('Falha ao realizar login. Verifique suas credenciais.')
    }
  }
}
