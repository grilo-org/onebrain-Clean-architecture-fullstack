import { ValidationError } from '@/domain/errors/ValidationError'
import { CustomerResponse, IUpdateCustomerService, UpdateCustomerData } from '@/domain/services/IUpdateCustomerService'
import { HttpMethod, IHttpClient } from '@/infrastructure/api/HttpClientContract'

export class UpdateCustomerService implements IUpdateCustomerService {
  constructor(private readonly httpClient: IHttpClient) {}

  async updateCustomer(id: string, customerData: UpdateCustomerData): Promise<CustomerResponse> {
    try {
      const response = await this.httpClient.sendRequest<CustomerResponse>({
        endpoint: `/customers/${id}`,
        method: HttpMethod.PUT,
        body: customerData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      })

      return response
    } catch (error) {
      throw new ValidationError('Falha ao atualizar customer. Tente novamente mais tarde.')
    }
  }
}
