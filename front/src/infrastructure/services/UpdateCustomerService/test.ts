/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { HttpClient } from '@/infrastructure/api/HttpClient'

import { UpdateCustomerService } from './index'

describe('UpdateCustomerService', () => {
  let service: UpdateCustomerService
  let httpClient: HttpClient

  beforeEach(() => {
    httpClient = HttpClient.create()
    service = new UpdateCustomerService(httpClient)
  })

  it('should update a customer successfully', async () => {
    const mockCustomerId = '123'
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

    await expect(service.updateCustomer(mockCustomerId, mockCustomerData)).resolves.not.toThrow()
  })

  it('should throw an error if the request fails', async () => {
    jest.spyOn(httpClient, 'sendRequest').mockRejectedValueOnce(new Error('Request failed'))

    await expect(service.updateCustomer('123', {} as any)).rejects.toThrow(
      'Falha ao atualizar customer. Tente novamente mais tarde.'
    )
  })
})
