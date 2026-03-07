import { z } from 'zod'

export const transactionSchema = z.object({
  description: z.string().min(3, 'Descrição obrigatória'),
  value: z.number().positive('Valor deve ser maior que zero'),
  type: z.enum(['income', 'expense']),
  category: z.string().min(1, 'Selecione uma categoria'),
  date: z.string()
})