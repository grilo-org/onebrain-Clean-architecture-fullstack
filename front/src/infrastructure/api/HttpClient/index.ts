import axios, { AxiosInstance } from 'axios'

import { BASE_URL } from '@/commons/config'
import {
  HttpError,
  HttpRequest,
  HttpStatusCode,
  IHttpClient,
  NotFoundError,
  ServerError,
  UnauthorizedError,
} from '@/infrastructure/api/HttpClientContract'

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
        withCredentials: true,
      })

      return data
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status || HttpStatusCode.serverError
        switch (status) {
          case HttpStatusCode.unauthorized:
            throw new UnauthorizedError()
          case HttpStatusCode.notFound:
            throw new NotFoundError()
          case HttpStatusCode.serverError:
            throw new ServerError()
          default:
            throw new HttpError(status, typeof err.response?.data === 'string' ? err.response.data : err.message)
        }
      }
      throw new Error(`Unexpected error: ${(err as Error).message}`)
    }
  }
}
