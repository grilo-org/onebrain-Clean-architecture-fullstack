'use client'

import ProtectedRoute from '@/infrastructure/auth/ProtectedRoute'
import { EditCustomerView } from '@/presentation/views/EditCustomer'

const EditCustomerPage = () => {
  return (
    <ProtectedRoute redirectTo="/login" requireAuth={true}>
      <EditCustomerView />
    </ProtectedRoute>
  )
}

export default EditCustomerPage
