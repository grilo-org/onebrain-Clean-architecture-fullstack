/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { HttpClient } from '@/infrastructure/api/HttpClient'

import { CreateCustomerService } from './index'

describe('CreateCustomerService', () => {
  let service: CreateCustomerService
  let httpClient: HttpClient

  beforeEach(() => {
    httpClient = HttpClient.create()
    service = new CreateCustomerService(httpClient)
  })

  it('should create a customer successfully', async () => {
    const mockCustomerData = {
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
    }

    jest.spyOn(httpClient, 'sendRequest').mockResolvedValueOnce({})

    await expect(service.createCustomer(mockCustomerData)).resolves.not.toThrow()
  })

  it('should throw an error if the request fails', async () => {
    jest.spyOn(httpClient, 'sendRequest').mockRejectedValueOnce(new Error('Request failed'))

    await expect(service.createCustomer({} as any)).rejects.toThrow(
      'Falha ao criar customer. Verifique os dados fornecidos.'
    )
  })
})
