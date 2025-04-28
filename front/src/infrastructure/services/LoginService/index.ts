import { setAccessToken } from '@/commons/storage/accessToken'
import { ILoginService, LoginCredentials, LoginResponse } from '@/domain/models/ILoginService'
import { HttpMethod, IHttpClient } from '@/infrastructure/api/HttpClientContract'

export class LoginService implements ILoginService {
  constructor(private readonly httpClient: IHttpClient) {}

  async login(credentials: LoginCredentials): Promise<string> {
    try {
      const response = await this.httpClient.sendRequest<LoginResponse>({
        endpoint: '/auth/login',
        method: HttpMethod.POST,
        body: credentials,
      })
      const { token } = response

      setAccessToken(token)

      return token
    } catch (error) {
      throw new Error('Falha ao realizar login. Verifique suas credenciais.')
    }
  }
}
