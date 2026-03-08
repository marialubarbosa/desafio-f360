import { z } from 'zod'

export const transactionSchema = z.object({
  description: z.string().min(3, 'Descrição obrigatória'),

  value: z.number({
    required_error: 'Informe um valor'
  })
  .positive('Valor deve ser maior que zero'),

  type: z.enum(['income', 'expense']),

  category: z
    .string()
    .min(1, 'Selecione uma categoria'),

  date: z
    .string()
    .min(10, 'Informe a data')
    .refine((value) => {
      const [day, month, year] = value.split('/').map(Number)

      const date = new Date(year, month - 1, day)

      return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
      )
    }, 'Data inválida')
})

export type TransactionFormData = z.infer<typeof transactionSchema>