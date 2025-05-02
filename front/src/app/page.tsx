import ProtectedRoute from '@/infrastructure/auth/ProtectedRoute'
import { LoginView } from '@/presentation/views/Login/login.view'

export default function Page() {
  return (
    <ProtectedRoute redirectTo="/dashboard" requireAuth={false}>
      <LoginView />
    </ProtectedRoute>
  )
}
