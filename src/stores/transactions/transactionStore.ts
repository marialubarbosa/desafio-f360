import { defineStore } from 'pinia'
import type { NewTransaction, Transaction } from '@/types/transaction'

function getTransactionMonthKey(transaction: Transaction): string {
  const date = new Date(transaction.date)

  if (Number.isNaN(date.getTime())) {
    return transaction.date
  }

  return `${date.getFullYear()}-${date.getMonth()}`
}

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

    monthlyAverageBalance(): number {
      const incomeTransactions = this.transactions.filter(t => t.type === 'income')

      if (incomeTransactions.length === 0) return 0

      const months = new Set(incomeTransactions.map(getTransactionMonthKey))

      return this.totalIncome / months.size
    },

    monthlyAverageExpense(): number {
      const expenseTransactions = this.transactions.filter(t => t.type === 'expense')

      if (expenseTransactions.length === 0) return 0

      const months = new Set(expenseTransactions.map(getTransactionMonthKey))

      return this.totalExpense / months.size
    }
  },

  actions: {
    setTransactions(transactions: Transaction[]) {
      this.transactions = transactions
    },

    addTransaction(transaction: NewTransaction) {
      const newTransaction: Transaction = {
        ...transaction,
        id: crypto.randomUUID()
      }

      this.transactions.unshift(newTransaction)
    },

    removeTransaction(id: string) {
      const index = this.transactions.findIndex(t => t.id === id)
      if (index !== -1) {
        this.transactions.splice(index, 1)
      }
    }
  }
})