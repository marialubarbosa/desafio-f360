import { ref, computed } from 'vue'
import { useDebounce } from '@vueuse/core'
import type { Transaction } from '@/types/transaction'

export function useTransactionFilter(transactions: () => Transaction[]) {
  const search = ref('')
  const category = ref('')
  const type = ref('')

  // debounce de 300ms
  const debouncedSearch = useDebounce(search, 300)

  const filteredTransactions = computed(() => {
    const searchText = debouncedSearch.value.toLowerCase()

    return transactions().filter((t) => {
      if (searchText && !t.description.toLowerCase().includes(searchText)) {
        return false
      }

      if (category.value && t.category !== category.value) {
        return false
      }

      if (type.value && t.type !== type.value) {
        return false
      }

      return true
    })
  })

  function resetFilters() {
    search.value = ''
    category.value = ''
    type.value = ''
  }

  return {
    search,
    category,
    type,
    filteredTransactions,
    resetFilters
  }
}