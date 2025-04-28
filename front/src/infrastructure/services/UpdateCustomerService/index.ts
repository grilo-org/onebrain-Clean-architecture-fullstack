import { IUpdateCustomerService, UpdateCustomerData } from '@/domain/models/IUpdateCustomerService'
import { HttpMethod, IHttpClient } from '@/infrastructure/api/HttpClientContract'

export class UpdateCustomerService implements IUpdateCustomerService {
  constructor(private readonly httpClient: IHttpClient) {}

  async updateCustomer(id: string, customerData: UpdateCustomerData): Promise<void> {
    try {
      await this.httpClient.sendRequest({
        endpoint: `/customers/${id}`,
        method: HttpMethod.PUT,
        body: customerData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      })
    } catch (error) {
      throw new Error('Falha ao atualizar customer. Tente novamente mais tarde.')
    }
  }
}
