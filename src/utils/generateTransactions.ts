import type { Transaction } from '../types/transaction'

export function generateTransactions(count = 30000): Transaction[] {
  const categories = ['Food', 'Salary', 'Transport', 'Shopping']

  return Array.from({ length: count }, (_, i) => ({
    id: crypto.randomUUID(),
    description: `Transaction ${i}`,
    value: Number((Math.random() * 1000).toFixed(2)),
    type: Math.random() > 0.5 ? 'income' : 'expense',
    category: categories[Math.floor(Math.random() * categories.length)] ?? '',
    date: new Date().toISOString().split('T')[0] ?? ''
  }))
}