import { HttpMethod, IHttpClient } from '@/infrastructure/api/HttpClientContract'

import { LoginService } from '.'

describe('LoginService', () => {
  it('should call the correct endpoint with the correct data', async () => {
    const mockHttpClient: IHttpClient = {
      sendRequest: jest.fn().mockResolvedValue({ token: 'mock-token' }),
    }

    const service = new LoginService(mockHttpClient)
    const credentials = { email: 'test@example.com', password: 'password123' }

    const result = await service.login(credentials)

    expect(mockHttpClient.sendRequest).toHaveBeenCalledWith({
      endpoint: '/auth/login',
      method: HttpMethod.POST,
      body: credentials,
    })
    expect(result).toBe('mock-token')
  })

  it('should throw an error if the request fails', async () => {
    const mockHttpClient: IHttpClient = {
      sendRequest: jest.fn().mockRejectedValue(new Error('Request failed')),
    }

    const service = new LoginService(mockHttpClient)
    const credentials = { email: 'test@example.com', password: 'password123' }

    await expect(service.login(credentials)).rejects.toThrow('Falha ao realizar login. Verifique suas credenciais.')
  })
})
