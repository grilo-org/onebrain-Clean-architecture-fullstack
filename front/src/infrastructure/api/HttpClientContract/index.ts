export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export enum HttpStatusCode {
  ok = 200,
  created = 201,
  accepted = 202,
  noContent = 204,
  redirect = 302,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  unprocessableEntity = 422,
  serverError = 500,
}

export type HttpRequest<TBody> = {
  endpoint: string
  method: HttpMethod
  body?: TBody
  headers?: Record<string, string>
}

export interface IHttpClient {
  sendRequest: <TResponse, TBody = unknown>(request: HttpRequest<TBody>) => Promise<TResponse>
}
