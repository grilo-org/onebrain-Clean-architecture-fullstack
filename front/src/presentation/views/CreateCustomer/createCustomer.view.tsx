'use client'

import { FC } from 'react'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import Spinner from '@/presentation/components/Spinner'
import { zodResolver } from '@hookform/resolvers/zod'

import { useCreateCustomerModel } from './createCustomer.model'
import { createCustomerSchema } from './createCustomer.schema'
import { CreateCustomerFormData } from './createCustomer.types'

export const CreateCustomerView: FC = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCustomerFormData>({
    resolver: zodResolver(createCustomerSchema),
  })

  const { handleCreateCustomer, isLoading, errorMessage } = useCreateCustomerModel()

  const onSubmit = (data: CreateCustomerFormData) => {
    handleCreateCustomer(data)
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

        <h1 className="text-3xl font-bold text-center mb-6">Criar Novo Customer</h1>

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
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.cpf && <p className="text-red-500 text-xs mt-1">{errors.cpf.message}</p>}
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

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full md:w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <Spinner color="border-white-500" /> : 'Criar Customer'}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
