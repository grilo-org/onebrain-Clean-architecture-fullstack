import { Storage } from './types'

export const getAccessToken = () => {
  return localStorage.getItem(Storage.ACCESS_TOKEN)
}

export const setAccessToken = (token: string) => {
  return localStorage.setItem(Storage.ACCESS_TOKEN, token)
}

export const removeAccessToken = () => {
  return localStorage.removeItem(Storage.ACCESS_TOKEN)
}
