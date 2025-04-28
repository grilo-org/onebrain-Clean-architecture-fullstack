import { HttpClient } from '@/infrastructure/api/HttpClient'

import { GetCustomerByIdService } from './index'

describe('GetCustomerByIdService', () => {
  let service: GetCustomerByIdService
  let httpClient: HttpClient

  beforeEach(() => {
    httpClient = HttpClient.create()
    service = new GetCustomerByIdService(httpClient)
  })

  it('should fetch a customer by ID successfully', async () => {
    const mockCustomerId = '123'
    const mockCustomerData = {
      id: '123',
      name: 'John Doe',
      email: 'john.doe@example.com',
      cpf: '12345678901',
      phone: '1234567890',
      zipCode: '12345678',
      street: 'Main Street',
      number: '123',
      complement: 'Apt 101',
      city: 'Springfield',
      state: 'IL',
      active: true,
    }

    jest.spyOn(httpClient, 'sendRequest').mockResolvedValueOnce(mockCustomerData)

    const result = await service.fetchCustomerById(mockCustomerId)
    expect(result).toEqual(mockCustomerData)
  })

  it('should throw an error if the request fails', async () => {
    jest.spyOn(httpClient, 'sendRequest').mockRejectedValueOnce(new Error('Request failed'))

    await expect(service.fetchCustomerById('123')).rejects.toThrow(
      'Falha ao buscar customer. Tente novamente mais tarde.'
    )
  })
})
