'use client'

import React from 'react'

import { useAuth } from '@/infrastructure/auth/AuthProvider'

const Header: React.FC = () => {
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

export default Header
