import Header from '@/components/Header/Header'
import ProtectedRoute from '@/infrastructure/auth/ProtectedRoute'
import { DashboardView } from '@/presentation/Dashboard/dashboard.view'

export default function DashboardPage() {
  return (
    <ProtectedRoute redirectTo="/login" requireAuth={true}>
      <Header />
      <DashboardView />
    </ProtectedRoute>
  )
}
