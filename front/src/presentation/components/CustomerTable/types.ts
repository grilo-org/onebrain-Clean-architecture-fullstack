import { CustomerResponse } from '@/domain/services/IGetCustomersService'

export type CustomerTableData = Omit<CustomerResponse, 'cpf' | 'street' | 'number' | 'complement' | 'active'>
