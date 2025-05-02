import { ValidationError } from '@/domain/errors/ValidationError'
import { CustomerResponse, IGetCustomersService } from '@/domain/services/IGetCustomersService'
import { HttpMethod, IHttpClient } from '@/infrastructure/api/HttpClientContract'

export class GetCustomersService implements IGetCustomersService {
  constructor(private readonly httpClient: IHttpClient) {}

  async fetchCustomers(): Promise<CustomerResponse[]> {
    try {
      const response = await this.httpClient.sendRequest<CustomerResponse[]>({
        endpoint: '/customers',
        method: HttpMethod.GET,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      })

      return response
    } catch (error) {
      throw new ValidationError('Falha ao buscar customers. Tente novamente mais tarde.')
    }
  }

  async getCustomers(): Promise<CustomerResponse[]> {
    return await this.fetchCustomers()
  }
}
