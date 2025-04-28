import { HttpClient } from '@/infrastructure/api/HttpClient'

import { GetCustomersService } from './index'

describe('GetCustomersService', () => {
  let service: GetCustomersService
  let httpClient: HttpClient

  beforeEach(() => {
    httpClient = HttpClient.create()
    service = new GetCustomersService(httpClient)
  })

  it('should fetch all customers successfully', async () => {
    const mockCustomersData = [
      {
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
      },
    ]

    jest.spyOn(httpClient, 'sendRequest').mockResolvedValueOnce(mockCustomersData)

    const result = await service.fetchCustomers()
    expect(result).toEqual(mockCustomersData)
  })

  it('should throw an error if the request fails', async () => {
    jest.spyOn(httpClient, 'sendRequest').mockRejectedValueOnce(new Error('Request failed'))

    await expect(service.fetchCustomers()).rejects.toThrow('Falha ao buscar customers. Tente novamente mais tarde.')
  })
})
