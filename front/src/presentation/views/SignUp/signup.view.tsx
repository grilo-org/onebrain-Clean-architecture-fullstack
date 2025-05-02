'use client'

import React, { useState } from 'react'

import { EyeIcon, EyeOffIcon } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

import Spinner from '@/presentation/components/Spinner'
import { zodResolver } from '@hookform/resolvers/zod'

import { useSignUpModel } from './signup.model'
import { signUpSchema } from './signup.schema'
import { SignUpFormData } from './signup.types'

export const SignUpView: React.FC = () => {
  const { isLoading, errorMessage, handleSignUp } = useSignUpModel()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const onSubmit = (data: SignUpFormData) => {
    handleSignUp(data)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white p-6">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Criar Conta</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Nome */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Nome
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="name"
              type="text"
              placeholder="Digite seu nome"
              {...register('name')}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="email"
              type="email"
              placeholder="Digite seu email"
              {...register('email')}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          {/* Senha */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Senha
            </label>
            <div className="relative">
              <input
                className="shadow appearance-none border rounded w-full py-2 pr-10 pl-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Digite sua senha"
                {...register('password')}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center justify-center text-gray-500 hover:text-gray-700 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          {/* Confirmar Senha */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirmar Senha
            </label>
            <div className="relative">
              <input
                className="shadow appearance-none border rounded w-full py-2 pr-10 pl-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirme sua senha"
                {...register('confirmPassword')}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center justify-center text-gray-500 hover:text-gray-700 cursor-pointer"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                tabIndex={-1}
              >
                {showConfirmPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
          </div>

          {errorMessage && <p className="text-red-500 text-xs mb-4">{errorMessage}</p>}

          <div className="flex flex-col space-y-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <Spinner color="border-white-500" /> : 'Criar Conta'}
            </button>
            <Link href="/login" className="text-blue-500 hover:underline text-center">
              Voltar para o login
            </Link>
          </div>
        </form>
      </div>
    </main>
  )
}
