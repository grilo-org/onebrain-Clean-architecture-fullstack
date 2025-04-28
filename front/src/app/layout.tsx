'use client'

import { useState } from 'react'
import './globals.css'

import { AuthProvider } from '@/infrastructure/auth/AuthProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>{children}</AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
