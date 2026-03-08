import type { Transaction } from '../types/transaction'

export const descriptions = [
  'Supermercado',
  'Salário',
  'Netflix',
  'Freelance',
  'Restaurante',
  'Uber',
  'Farmácia',
  'Academia',
  'Assinatura Software',
  'Investimento'
]

export const categories = [
  'Alimentação',
  'Renda',
  'Lazer',
  'Transporte',
  'Saúde',
  'Software',
  'Investimento'
]

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function randomDate() {
  const start = new Date(2023, 0, 1)
  const end = new Date()

  const date = new Date(
    start.getTime() +
      Math.random() * (end.getTime() - start.getTime())
  )

  return date.toLocaleDateString('pt-BR')
}

export function generateTransactions(
  total = 30000
): Transaction[] {
  return Array.from({ length: total }).map((_, index) => {
    const type = Math.random() > 0.5 ? 'income' : 'expense'

    return {
      id: String(index),
      description: `${randomItem(descriptions)} ${index}`,
      value: Number((Math.random() * 5000).toFixed(2)),
      type,
      category: randomItem(categories),
      date: randomDate()
    }
  })
}