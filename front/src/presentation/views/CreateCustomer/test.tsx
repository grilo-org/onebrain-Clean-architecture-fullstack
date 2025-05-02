import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { CreateCustomerView } from './createCustomer.view'

describe('CreateCustomerView', () => {
  it('renders the form correctly', () => {
    const queryClient = new QueryClient()

    render(
      <QueryClientProvider client={queryClient}>
        <CreateCustomerView />
      </QueryClientProvider>
    )

    expect(screen.getByLabelText(/Nome/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/CPF/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Telefone/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/CEP/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Rua/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Número/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Complemento/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Cidade/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Estado/i)).toBeInTheDocument()
    expect(screen.getByText(/Criar Customer/i)).toBeInTheDocument()
  })

  it('submits the form with valid data', async () => {
    const user = userEvent.setup()

    const queryClient = new QueryClient()

    render(
      <QueryClientProvider client={queryClient}>
        <CreateCustomerView />
      </QueryClientProvider>
    )

    await user.type(screen.getByLabelText(/Nome/i), 'John Doe')
    await user.type(screen.getByLabelText(/Email/i), 'john.doe@example.com')
    await user.type(screen.getByLabelText(/CPF/i), '12345678901')
    await user.type(screen.getByLabelText(/Telefone/i), '1234567890')
    await user.type(screen.getByLabelText(/CEP/i), '12345678')
    await user.type(screen.getByLabelText(/Rua/i), 'Main Street')
    await user.type(screen.getByLabelText(/Número/i), '123')
    await user.type(screen.getByLabelText(/Cidade/i), 'Springfield')
    await user.type(screen.getByLabelText(/Estado/i), 'IL')

    await user.click(screen.getByText(/Criar Customer/i))

    await waitFor(() => {
      expect(screen.getByLabelText(/Nome/i)).toHaveValue('John Doe')
    })
  })
})
