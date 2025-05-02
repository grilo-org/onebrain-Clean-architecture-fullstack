import { AuthProvider } from '@/infrastructure/auth/AuthProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'

import { LoginView } from './login.view'

describe('LoginView', () => {
  const queryClient = new QueryClient()

  const renderWithProviders = (ui: React.ReactNode) => {
    return render(
      <QueryClientProvider client={queryClient}>
        <AuthProvider>{ui}</AuthProvider>
      </QueryClientProvider>
    )
  }

  it('renders login form', () => {
    renderWithProviders(<LoginView />)

    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Senha/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Entrar/i })).toBeInTheDocument()
  })

  it('validates form inputs', () => {
    renderWithProviders(<LoginView />)

    const emailInput = screen.getByLabelText(/Email/i)
    const passwordInput = screen.getByLabelText(/Senha/i)

    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
  })
})
