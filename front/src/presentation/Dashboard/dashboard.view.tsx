'use client'

import { useRouter } from 'next/navigation'

import { CustomerTable } from '@/components/CustomerTable/CustomerTable'

import { useDashboardModel } from './dashboard.model'

export const DashboardView = () => {
  const { customers, isLoading, isError } = useDashboardModel()
  const router = useRouter()

  if (isLoading) {
    return <p>Carregando...</p>
  }

  if (isError) {
    return <p>Erro ao carregar os dados. Tente novamente mais tarde.</p>
  }

  const handleCreateCustomer = () => {
    router.push('/create-customer')
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-start bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-7xl">
        <h1 className="text-3xl font-bold text-center mb-6">Dashboard</h1>
        <div className="flex justify-end mb-4">
          <button
            className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleCreateCustomer}
          >
            Criar Customer +
          </button>
        </div>
        <CustomerTable data={customers || []} />
      </div>
    </main>
  )
}
