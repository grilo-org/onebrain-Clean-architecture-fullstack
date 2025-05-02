import { z } from 'zod'

export const signUpSchema = z
  .object({
    name: z.string().min(1, 'O nome é obrigatório.'),
    email: z.string().email('Email inválido.'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
    confirmPassword: z.string().min(6, 'A confirmação de senha deve ter pelo menos 6 caracteres.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem.',
    path: ['confirmPassword'],
  })
