import { IDeleteCustomerService } from '@/domain/models/IDeleteCustomerService'
import { HttpMethod, IHttpClient } from '@/infrastructure/api/HttpClientContract'

export class DeleteCustomerService implements IDeleteCustomerService {
  constructor(private readonly httpClient: IHttpClient) {}

  async deleteCustomer(id: string): Promise<void> {
    try {
      await this.httpClient.sendRequest({
        endpoint: `/customers/${id}`,
        method: HttpMethod.DELETE,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      })
    } catch (error) {
      throw new Error('Falha ao deletar customer. Tente novamente mais tarde.')
    }
  }
}
