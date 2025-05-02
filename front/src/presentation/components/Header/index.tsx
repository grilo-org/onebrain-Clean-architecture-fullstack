'use client'

import { FC } from 'react'

import { useAuth } from '@/infrastructure/auth/AuthProvider'

export const Header: FC = () => {
  const { logout } = useAuth()

  return (
    <header className="w-full bg-white-500 p-4 flex justify-end">
      <button
        onClick={logout}
        className="cursor-pointer bg-white text-blue-500 font-bold py-2 px-4 rounded hover:bg-gray-100"
      >
        Logout
      </button>
    </header>
  )
}
