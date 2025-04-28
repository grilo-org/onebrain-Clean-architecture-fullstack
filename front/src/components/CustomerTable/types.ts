import { Customer } from '@/domain/models/IGetCustomersService'

export type CustomerTableData = Omit<Customer, 'cpf' | 'street' | 'number' | 'complement' | 'active'>
