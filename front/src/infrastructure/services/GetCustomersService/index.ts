import { Customer, IGetCustomersService } from '@/domain/models/IGetCustomersService'
import { HttpMethod, IHttpClient } from '@/infrastructure/api/HttpClientContract'

export class GetCustomersService implements IGetCustomersService {
  constructor(private readonly httpClient: IHttpClient) {}

  async fetchCustomers(): Promise<Customer[]> {
    try {
      const response = await this.httpClient.sendRequest<Customer[]>({
        endpoint: '/customers',
        method: HttpMethod.GET,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      })

      return response
    } catch (error) {
      throw new Error('Falha ao buscar customers. Tente novamente mais tarde.')
    }
  }
}
