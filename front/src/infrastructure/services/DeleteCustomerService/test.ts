import { HttpClient } from '@/infrastructure/api/HttpClient'

import { DeleteCustomerService } from './index'

describe('DeleteCustomerService', () => {
  let service: DeleteCustomerService
  let httpClient: HttpClient

  beforeEach(() => {
    httpClient = HttpClient.create()
    service = new DeleteCustomerService(httpClient)
  })

  it('should delete a customer successfully', async () => {
    const mockCustomerId = '123'

    jest.spyOn(httpClient, 'sendRequest').mockResolvedValueOnce({})

    await expect(service.deleteCustomer(mockCustomerId)).resolves.not.toThrow()
  })

  it('should throw an error if the request fails', async () => {
    jest.spyOn(httpClient, 'sendRequest').mockRejectedValueOnce(new Error('Request failed'))

    await expect(service.deleteCustomer('123')).rejects.toThrow(
      'Falha ao deletar customer. Tente novamente mais tarde.'
    )
  })
})
