import { ValidationError } from '@/domain/errors/ValidationError'
import { CustomerResponse, IGetCustomerByIdService } from '@/domain/services/IGetCustomerByIdService'
import { HttpMethod, IHttpClient } from '@/infrastructure/api/HttpClientContract'

export class GetCustomerByIdService implements IGetCustomerByIdService {
  constructor(private readonly httpClient: IHttpClient) {}

  async fetchCustomerById(id: string): Promise<CustomerResponse> {
    try {
      const response = await this.httpClient.sendRequest<CustomerResponse>({
        endpoint: `/customers/${id}`,
        method: HttpMethod.GET,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      })

      return response
    } catch (error) {
      throw new ValidationError('Falha ao buscar customer. Tente novamente mais tarde.')
    }
  }

  async getCustomerById(id: string): Promise<CustomerResponse> {
    return await this.fetchCustomerById(id)
  }
}
