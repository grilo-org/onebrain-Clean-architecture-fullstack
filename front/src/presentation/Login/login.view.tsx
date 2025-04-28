'use client'

import React, { useState } from 'react'

import { EyeIcon, EyeOffIcon } from 'lucide-react'
import Link from 'next/link'

import { Spinner } from '@/components/Spinner/Spinner'

import { useLoginModel } from './login.model'

export const LoginView: React.FC = () => {
  const { mutate: handleLogin, isPending, isError, error } = useLoginModel()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleLogin({ email, password })
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white p-6">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="email"
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Senha
            </label>
            <div className="relative">
              <input
                className="shadow appearance-none border rounded w-full py-2 pr-10 pl-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
          </div>

          {isError && <p className="text-red-500 text-xs mb-4">{(error as Error).message}</p>}
          <div className="flex flex-col space-y-4">
            <button
              className={`cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
              type="submit"
              disabled={isPending}
            >
              {isPending ? <Spinner color="border-white-500" /> : 'Entrar'}
            </button>
            <p className="text-center text-gray-600">ou</p>
            <Link href="/signup">
              <button
                className="w-full cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                type="button"
              >
                Criar uma conta
              </button>
            </Link>
          </div>
        </form>
      </div>
    </main>
  )
}
