import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useTransactionStore } from '../transactionStore'

export function useTransactionAnalytics() {
  const store = useTransactionStore()
  const { transactions } = storeToRefs(store)

  const sortedTransactions = computed(() => {
    return [...transactions.value].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    )
  })

  const incomeVsExpenseByMonth = computed(() => {
    const months = new Map<
      string,
      { income: number; expense: number }
    >()

    sortedTransactions.value.forEach(t => {
      const date = new Date(t.date)
      const key = `${date.getFullYear()}-${date.getMonth()}`

      if (!months.has(key)) {
        months.set(key, { income: 0, expense: 0 })
      }

      const current = months.get(key)!

      if (t.type === 'income') {
        current.income += t.value
      } else {
        current.expense += t.value
      }
    })

    return Array.from(months.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, values]) => ({
        month,
        ...values
      }))
  })

  const cashFlow = computed(() => {
    let balance = 0

    return sortedTransactions.value.map(t => {
      if (t.type === 'income') {
        balance += t.value
      } else {
        balance -= t.value
      }

      return {
        date: t.date,
        balance
      }
    })
  })

  const expensesByCategory = computed(() => {
    const categories = new Map<string, number>()

    transactions.value
      .filter(t => t.type === 'expense')
      .forEach(t => {
        const current = categories.get(t.category) ?? 0
        categories.set(t.category, current + t.value)
      })

    return Array.from(categories.entries()).map(
      ([category, value]) => ({
        category,
        value
      })
    )
  })


  const last30DaysCashFlow = computed(() => {
    const now = new Date()
    const start = new Date()
    start.setDate(now.getDate() - 30)

    let balance = 0

    return sortedTransactions.value
      .filter(t => {
        const date = new Date(t.date)
        return date >= start && date <= now
      })
      .map(t => {
        if (t.type === 'income') {
          balance += t.value
        } else {
          balance -= t.value
        }

        return {
          date: t.date,
          balance
        }
      })
  })

  const dailyCashFlow = computed(() => {
    const map = new Map<string, number>()

    sortedTransactions.value.forEach(t => {

      const date = new Date(t.date)

      if (isNaN(date.getTime())) return

      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')

      const key = `${year}-${month}-${day}`

      const current = map.get(key) ?? 0
      const value = t.type === 'income' ? t.value : -t.value

      map.set(key, current + value)
    })

    let balance = 0

    return Array.from(map.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, value]) => {
        balance += value

        return {
          date,
          balance
        }
      })
  })

  return {
    sortedTransactions,
    incomeVsExpenseByMonth,
    cashFlow,
    expensesByCategory,
    last30DaysCashFlow,
    dailyCashFlow
  }
}