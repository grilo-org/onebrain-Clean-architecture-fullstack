import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { getAccessToken } from '@/commons/storage/accessToken'

const useAuthRedirect = () => {
  const router = useRouter()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const token = getAccessToken()

    if (!isInitialized) {
      if (token) {
        router.replace('/dashboard')
      } else {
        router.replace('/')
      }
      setIsInitialized(true)
    }
  }, [router, isInitialized])
}

export default useAuthRedirect
