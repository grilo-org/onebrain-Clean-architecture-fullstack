import { CreateCustomerData, CustomerResponse, ICreateCustomerService } from '@/domain/models/ICreateCustomerService'
import { HttpMethod, IHttpClient } from '@/infrastructure/api/HttpClientContract'

export class CreateCustomerService implements ICreateCustomerService {
  constructor(private readonly httpClient: IHttpClient) {}

  async createCustomer(customerData: CreateCustomerData): Promise<CustomerResponse> {
    try {
      const response = await this.httpClient.sendRequest<CustomerResponse>({
        endpoint: '/customers',
        method: HttpMethod.POST,
        body: customerData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      })

      return response
    } catch (error) {
      throw new Error('Falha ao criar customer. Verifique os dados fornecidos.')
    }
  }
}
