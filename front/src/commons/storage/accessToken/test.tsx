import { getAccessToken, removeAccessToken, setAccessToken } from './index'
import { Storage } from './types'

describe('Testing token storage functions', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('Test setAccessToken and getAccessToken', () => {
    const token = 'access_token'
    setAccessToken(token)
    const retrievedToken = getAccessToken()
    expect(retrievedToken).toEqual(token)
  })

  it('should return access token from storage', () => {
    const token = 'access_token'
    localStorage.setItem(Storage.ACCESS_TOKEN, token)
    const retrievedToken = getAccessToken()
    expect(retrievedToken).toEqual(token)
  })

  it('should remove access token from storage', () => {
    const token = 'access_token'
    setAccessToken(token)
    expect(getAccessToken()).toEqual(token)
    removeAccessToken()
    expect(getAccessToken()).toBeNull()
  })
})
