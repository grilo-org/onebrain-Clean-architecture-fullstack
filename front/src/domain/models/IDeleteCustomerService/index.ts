export interface IDeleteCustomerService {
  deleteCustomer: (id: string) => Promise<void>
}
