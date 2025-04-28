import { HttpMethod, IHttpClient } from '@/infrastructure/api/HttpClientContract'

import { CreateUserService } from '.'

describe('CreateUserService', () => {
  it('should call the correct endpoint with the correct data', async () => {
    const mockHttpClient: IHttpClient = {
      sendRequest: jest.fn().mockResolvedValue({
        user: { id: '1', name: 'Test User', email: 'test@example.com' },
      }),
    }

    const service = new CreateUserService(mockHttpClient)
    const userData = { name: 'Test User', email: 'test@example.com', password: 'password123' }

    const result = await service.createUser(userData)

    expect(mockHttpClient.sendRequest).toHaveBeenCalledWith({
      endpoint: '/users',
      method: HttpMethod.POST,
      body: userData,
    })
    expect(result).toEqual({
      user: { id: '1', name: 'Test User', email: 'test@example.com' },
    })
  })

  it('should throw an error if the request fails', async () => {
    const mockHttpClient: IHttpClient = {
      sendRequest: jest.fn().mockRejectedValue(new Error('Request failed')),
    }

    const service = new CreateUserService(mockHttpClient)
    const userData = { name: 'Test User', email: 'test@example.com', password: 'password123' }

    await expect(service.createUser(userData)).rejects.toThrow('Falha ao criar usuário. Verifique os dados fornecidos.')
  })
})
