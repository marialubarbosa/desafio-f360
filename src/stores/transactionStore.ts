import { defineStore } from 'pinia'
import type { Transaction } from '@/types/transaction'

export const useTransactionStore = defineStore('transactions', {
  state: () => ({
    transactions: [] as Transaction[]
  }),

  getters: {
    totalIncome: (state) =>
      state.transactions
        .filter(t => t.type === 'income')
        .reduce((acc, t) => acc + t.value, 0),

    totalExpense: (state) =>
      state.transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, t) => acc + t.value, 0),

    balance(): number {
      return this.totalIncome - this.totalExpense
    },

    monthlyAverageBalance(state): number {
      const months = new Map<string, number>()

      state.transactions.forEach(t => {
        const date = new Date(t.date)
        const key = `${date.getFullYear()}-${date.getMonth()}`

        const current = months.get(key) ?? 0
        const value = t.type === 'income' ? t.value : -t.value

        months.set(key, current + value)
      })

      if (months.size === 0) return 0

      const total = Array.from(months.values())
        .reduce((acc, value) => acc + value, 0)

      return total / months.size
    },

    monthlyAverageExpense(state): number {
      const months = new Map<string, number>()

      state.transactions
        .filter(t => t.type === 'expense')
        .forEach(t => {
          const date = new Date(t.date)
          const key = `${date.getFullYear()}-${date.getMonth()}`

          const current = months.get(key) ?? 0
          months.set(key, current + t.value)
        })

      if (months.size === 0) return 0

      const total = Array.from(months.values())
        .reduce((acc, value) => acc + value, 0)

      return total / months.size
    }
  },

  actions: {
    setTransactions(transactions: Transaction[]) {
      this.transactions = transactions
    },

    addTransaction(transaction: Transaction) {
      transaction.id = crypto.randomUUID()
      this.transactions.unshift(transaction)
    },

    removeTransaction(id: string) {
      const index = this.transactions.findIndex(t => t.id === id)
      if (index !== -1) {
        this.transactions.splice(index, 1)
      }
    }
  }
})