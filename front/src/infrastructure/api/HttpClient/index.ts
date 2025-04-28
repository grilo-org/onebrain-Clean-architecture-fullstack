import axios, { AxiosInstance } from 'axios'

import { BASE_URL } from '@/commons/config'
import { HttpRequest, HttpStatusCode, IHttpClient } from '@/infrastructure/api/HttpClientContract'

const DEFAULT_BASE_URL = BASE_URL || 'http://localhost:3334'

export class HttpClient implements IHttpClient {
  private defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  constructor(
    private readonly api: AxiosInstance = axios,
    private baseUrl: string = DEFAULT_BASE_URL
  ) {}

  static create(baseUrl?: string) {
    return new HttpClient(axios, baseUrl || DEFAULT_BASE_URL)
  }

  setBaseUrl(newBaseUrl: string): void {
    this.baseUrl = newBaseUrl
  }

  setDefaultHeaders(headers: Record<string, string>): void {
    this.defaultHeaders = { ...this.defaultHeaders, ...headers }
  }

  async sendRequest<TResponse, TBody = unknown>(props: HttpRequest<TBody>): Promise<TResponse> {
    const { endpoint, method = 'GET', body, headers } = props

    try {
      const { data } = await this.api.request<TResponse>({
        url: `${this.baseUrl}${endpoint}`,
        method,
        headers: { ...this.defaultHeaders, ...headers },
        data: body,
      })

      return data
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status || HttpStatusCode.serverError
        const message = err.response?.data || err.message
        throw new Error(`Request error ${status}: ${message}`)
      }
      throw new Error(`Unexpected error: ${(err as Error).message}`)
    }
  }
}
