import ProtectedRoute from '@/infrastructure/auth/ProtectedRoute'
import { SignUpView } from '@/presentation/views/SignUp'

export default function SignUpPage() {
  return (
    <ProtectedRoute redirectTo="/dashboard" requireAuth={false}>
      <SignUpView />
    </ProtectedRoute>
  )
}
