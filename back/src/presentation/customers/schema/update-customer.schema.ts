import { z } from "zod";

export const updateCustomerSchema = z.object({
    name: z.string().min(2, 'O nome deve ter no mínimo 2 caracteres'),
    email: z.string().email('Email inválido'),
    cpf: z.string().min(11, 'O CPF deve ter no mínimo 11 caracteres'),
    phone: z.string().min(11, 'O telefone deve ter no mínimo 11 caracteres'),
    zipCode: z.string().min(8, 'O CEP deve ter no mínimo 8 caracteres'),
    street: z.string().min(2, 'O logradouro deve ter no mínimo 2 caracteres'),
    number: z.string().min(1, 'O número deve ter no mínimo 1 caracter'),
    complement: z.string().optional(),
    city: z.string().min(2, 'A cidade deve ter no mínimo 2 caracteres'),
    state: z.string().min(2, 'O estado deve ter no mínimo 2 caracteres'),
  });
  