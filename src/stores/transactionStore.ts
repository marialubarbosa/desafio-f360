import { defineStore } from 'pinia'
import type { Transaction } from '../types/transaction'

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
      const index =this.transactions.findIndex(t => t.id === id)
      if (index !== -1) {
        this.transactions.splice(index, 1)
      }
    }
  }
})