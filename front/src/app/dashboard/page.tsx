import ProtectedRoute from '@/infrastructure/auth/ProtectedRoute'
import { Header } from '@/presentation/components/Header'
import { DashboardView } from '@/presentation/views/Dashboard/dashboard.view'

export default function DashboardPage() {
  return (
    <ProtectedRoute redirectTo="/login" requireAuth={true}>
      <Header />
      <DashboardView />
    </ProtectedRoute>
  )
}
