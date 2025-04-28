import { jest } from '@jest/globals'
import '@testing-library/jest-dom'
import 'jest-localstorage-mock'

if (typeof global.TextEncoder === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  global.TextEncoder = class TextEncoder {
    encode(text: string) {
      return Buffer.from(text)
    }
  }
}

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}))

if (typeof global.TextDecoder === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  global.TextDecoder = class TextDecoder {
    decode(buffer: Buffer) {
      return Buffer.from(buffer).toString()
    }
  }
}

afterEach(() => {
  jest.clearAllMocks()
})
