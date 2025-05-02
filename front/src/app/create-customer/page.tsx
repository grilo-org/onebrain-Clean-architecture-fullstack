import ProtectedRoute from '@/infrastructure/auth/ProtectedRoute'
import { CreateCustomerView } from '@/presentation/views/CreateCustomer'

const CreateCustomerPage = () => {
  return (
    <ProtectedRoute redirectTo="/login" requireAuth={true}>
      <CreateCustomerView />
    </ProtectedRoute>
  )
}

export default CreateCustomerPage
