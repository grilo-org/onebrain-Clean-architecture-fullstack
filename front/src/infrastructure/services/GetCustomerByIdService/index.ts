import { Customer, IGetCustomerByIdService } from '@/domain/models/IGetCustomerByIdService'
import { HttpMethod, IHttpClient } from '@/infrastructure/api/HttpClientContract'

export class GetCustomerByIdService implements IGetCustomerByIdService {
  constructor(private readonly httpClient: IHttpClient) {}

  async fetchCustomerById(id: string): Promise<Customer> {
    try {
      const response = await this.httpClient.sendRequest<Customer>({
        endpoint: `/customers/${id}`,
        method: HttpMethod.GET,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      })

      return response
    } catch (error) {
      throw new Error('Falha ao buscar customer. Tente novamente mais tarde.')
    }
  }
}
