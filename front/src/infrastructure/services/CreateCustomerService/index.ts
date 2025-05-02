import { ValidationError } from '@/domain/errors/ValidationError'
import { CreateCustomerData, CustomerResponse, ICreateCustomerService } from '@/domain/services/ICreateCustomerService'
import { HttpMethod, IHttpClient } from '@/infrastructure/api/HttpClientContract'

function getAuthHeaders() {
  const token = localStorage.getItem('access_token')
  if (!token) {
    throw new ValidationError('Token de autenticação não encontrado.')
  }
  return { Authorization: `Bearer ${token}` }
}

export class CreateCustomerService implements ICreateCustomerService {
  constructor(private readonly httpClient: IHttpClient) {}

  async createCustomer(customerData: CreateCustomerData): Promise<CustomerResponse> {
    try {
      const response = await this.httpClient.sendRequest<CustomerResponse>({
        endpoint: '/customers',
        method: HttpMethod.POST,
        body: customerData,
        headers: getAuthHeaders(),
      })

      return response
    } catch (error) {
      throw new ValidationError('Falha ao criar customer. Verifique os dados fornecidos.')
    }
  }
}
