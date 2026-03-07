import { ref, computed } from 'vue'
import type { Transaction } from "../types/transaction"

export function useTransactionFilters(transactions: Transaction[]) {

  const search = ref('')
  const typeFilter = ref<'income' | 'expense' | 'all'>('all')

  const filteredTransactions = computed(() => {
    return transactions.filter(t => {

      const matchesType =
        typeFilter.value === 'all' || t.type === typeFilter.value

      const matchesSearch =
        t.description.toLowerCase().includes(search.value.toLowerCase())

      return matchesType && matchesSearch
    })
  })

  return {
    search,
    typeFilter,
    filteredTransactions
  }
}