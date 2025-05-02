'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import Spinner from '@/presentation/components/Spinner'
import { useCustomerData } from '@/presentation/hooks/useCustomerData'
import { zodResolver } from '@hookform/resolvers/zod'

import { useEditCustomerModel } from './editCustomer.model'
import { editCustomerSchema } from './editCustomer.schema'
import { EditCustomerFormData } from './editCustomer.types'

export const EditCustomerView: React.FC = () => {
  const router = useRouter()
  const { customer, isLoading: isLoadingCustomer } = useCustomerData()
  const { handleUpdateCustomer, handleDeleteCustomer, isLoading, errorMessage } = useEditCustomerModel()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditCustomerFormData>({
    resolver: zodResolver(editCustomerSchema),
    defaultValues: customer,
  })

  useEffect(() => {
    if (customer) {
      reset(customer)
    }
  }, [customer, reset])

  const onSubmit = (data: EditCustomerFormData) => {
    handleUpdateCustomer({ id: data.id, data })
  }

  if (isLoadingCustomer) {
    return <p>Carregando informações do cliente...</p>
  }

  if (!customer) {
    return <p>Cliente não encontrado.</p>
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-2xl relative">
        <button
          type="button"
          onClick={() => router.back()}
          className="cursor-pointer absolute top-4 left-4 text-blue-500 hover:text-blue-700 font-semibold"
        >
          ← Voltar
        </button>

        <h1 className="text-3xl font-bold text-center mb-6">Editar Customer</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-1" htmlFor="name">
                Nome
              </label>
              <input
                id="name"
                {...register('name')}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                {...register('email')}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1" htmlFor="cpf">
                CPF
              </label>
              <input
                id="cpf"
                {...register('cpf')}
                disabled
                className="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 focus:outline-none cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1" htmlFor="phone">
                Telefone
              </label>
              <input
                id="phone"
                {...register('phone')}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1" htmlFor="zipCode">
                CEP
              </label>
              <input
                id="zipCode"
                {...register('zipCode')}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode.message}</p>}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1" htmlFor="street">
                Rua
              </label>
              <input
                id="street"
                {...register('street')}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street.message}</p>}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1" htmlFor="number">
                Número
              </label>
              <input
                id="number"
                {...register('number')}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.number && <p className="text-red-500 text-xs mt-1">{errors.number.message}</p>}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1" htmlFor="complement">
                Complemento
              </label>
              <input
                id="complement"
                {...register('complement')}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1" htmlFor="city">
                Cidade
              </label>
              <input
                id="city"
                {...register('city')}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1" htmlFor="state">
                Estado
              </label>
              <input
                id="state"
                {...register('state')}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
            </div>
          </div>

          {errorMessage && <p className="text-red-500 text-center text-sm">{errorMessage}</p>}

          <div className="flex flex-col md:flex-row gap-4 justify-center mt-6">
            <button
              type="button"
              onClick={async () => {
                await handleDeleteCustomer(customer.id)
              }}
              disabled={isLoading}
              className="cursor-pointer w-full md:w-1/2 bg-white hover:bg-gray-100 border border-gray-300 text-red-500 font-bold py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <Spinner color="border-white-500" /> : 'Deletar'}
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="cursor-pointer w-full md:w-1/2 bg-white hover:bg-gray-100 border border-gray-300 text-blue-500 font-bold py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <Spinner color="border-white-500" /> : 'Atualizar'}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
