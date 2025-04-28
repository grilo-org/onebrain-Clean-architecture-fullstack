'use server'

export const getEnv = async (name: string) => {
  return process.env[name]
}
