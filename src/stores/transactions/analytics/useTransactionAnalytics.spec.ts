import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTransactionStore } from '../transactionStore'
import { useTransactionAnalytics } from './useTransactionAnalytics'
import type { Transaction } from '@/types/transaction'

function createTransaction(overrides: Partial<Transaction> = {}): Transaction {
  return {
    id: crypto.randomUUID(),
    description: 'Transação',
    value: 100,
    category: 'Outros',
    type: 'expense',
    date: '2026-03-01T12:00:00',
    ...overrides
  }
}

describe('useTransactionAnalytics', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-03-10T10:00:00'))
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('returns empty arrays when there are no transactions', () => {
    const analytics = useTransactionAnalytics()

    expect(analytics.sortedTransactions.value).toEqual([])
    expect(analytics.incomeVsExpenseByMonth.value).toEqual([])
    expect(analytics.cashFlow.value).toEqual([])
    expect(analytics.expensesByCategory.value).toEqual([])
    expect(analytics.last30DaysCashFlow.value).toEqual([])
    expect(analytics.dailyCashFlow.value).toEqual([])
  })

  it('sorts transactions by date in ascending order', () => {
    const store = useTransactionStore()

    store.setTransactions([
      createTransaction({ id: '3', date: '2026-03-03T12:00:00' }),
      createTransaction({ id: '1', date: '2026-03-01T12:00:00' }),
      createTransaction({ id: '2', date: '2026-03-02T12:00:00' })
    ])

    const analytics = useTransactionAnalytics()

    expect(analytics.sortedTransactions.value.map(t => t.id)).toEqual(['1', '2', '3'])
  })

  it('groups income and expense by month and accumulates values', () => {
    const store = useTransactionStore()

    store.setTransactions([
      createTransaction({ type: 'income', value: 1000, date: '2026-01-10T12:00:00' }),
      createTransaction({ type: 'expense', value: 300, date: '2026-01-20T12:00:00' }),
      createTransaction({ type: 'income', value: 500, date: '2026-02-05T12:00:00' }),
      createTransaction({ type: 'expense', value: 100, date: '2026-02-18T12:00:00' })
    ])

    const analytics = useTransactionAnalytics()

    expect(analytics.incomeVsExpenseByMonth.value).toEqual([
      { month: '2026-0', income: 1000, expense: 300 },
      { month: '2026-1', income: 500, expense: 100 }
    ])
  })

  it('calculates cumulative cash flow in chronological order', () => {
    const store = useTransactionStore()

    store.setTransactions([
      createTransaction({ type: 'expense', value: 200, date: '2026-03-02T12:00:00' }),
      createTransaction({ type: 'income', value: 1000, date: '2026-03-01T12:00:00' }),
      createTransaction({ type: 'income', value: 50, date: '2026-03-03T12:00:00' })
    ])

    const analytics = useTransactionAnalytics()

    expect(analytics.cashFlow.value).toEqual([
      { date: '2026-03-01T12:00:00', balance: 1000 },
      { date: '2026-03-02T12:00:00', balance: 800 },
      { date: '2026-03-03T12:00:00', balance: 850 }
    ])
  })

  it('aggregates expenses by category and ignores income', () => {
    const store = useTransactionStore()

    store.setTransactions([
      createTransaction({ type: 'expense', value: 120, category: 'Mercado' }),
      createTransaction({ type: 'expense', value: 80, category: 'Mercado' }),
      createTransaction({ type: 'expense', value: 50, category: 'Transporte' }),
      createTransaction({ type: 'income', value: 1000, category: 'Salário' })
    ])

    const analytics = useTransactionAnalytics()

    expect(analytics.expensesByCategory.value).toEqual([
      { category: 'Mercado', value: 200 },
      { category: 'Transporte', value: 50 }
    ])
  })

  it('returns cumulative cash flow only for the last 30 days (including boundaries)', () => {
    const store = useTransactionStore()

    store.setTransactions([
      createTransaction({ type: 'income', value: 500, date: '2026-02-08T09:59:59' }),
      createTransaction({ type: 'income', value: 1000, date: '2026-02-08T10:00:00' }),
      createTransaction({ type: 'expense', value: 200, date: '2026-03-05T10:00:00' }),
      createTransaction({ type: 'income', value: 100, date: '2026-03-10T10:00:00' }),
      createTransaction({ type: 'expense', value: 999, date: '2026-03-10T10:00:01' })
    ])

    const analytics = useTransactionAnalytics()

    expect(analytics.last30DaysCashFlow.value).toEqual([
      { date: '2026-02-08T10:00:00', balance: 1000 },
      { date: '2026-03-05T10:00:00', balance: 800 },
      { date: '2026-03-10T10:00:00', balance: 900 }
    ])
  })

  it('computes daily cash flow by grouping same day, sorting by date and skipping invalid dates', () => {
    const store = useTransactionStore()

    store.setTransactions([
      createTransaction({ type: 'income', value: 1000, date: '2026-03-01T12:00:00' }),
      createTransaction({ type: 'expense', value: 100, date: '2026-03-01T18:00:00' }),
      createTransaction({ type: 'expense', value: 200, date: '2026-03-02T09:00:00' }),
      createTransaction({ type: 'income', value: 50, date: 'invalid-date' })
    ])

    const analytics = useTransactionAnalytics()

    expect(analytics.dailyCashFlow.value).toEqual([
      { date: '2026-03-01', balance: 900 },
      { date: '2026-03-02', balance: 700 }
    ])
  })

  it('updates computed values reactively when store transactions change', () => {
    const store = useTransactionStore()
    const analytics = useTransactionAnalytics()

    store.setTransactions([
      createTransaction({ type: 'income', value: 100, date: '2026-03-01T12:00:00' })
    ])

    expect(analytics.cashFlow.value).toEqual([
      { date: '2026-03-01T12:00:00', balance: 100 }
    ])

    store.setTransactions([
      createTransaction({ type: 'income', value: 100, date: '2026-03-01T12:00:00' }),
      createTransaction({ type: 'expense', value: 30, date: '2026-03-02T12:00:00' })
    ])

    expect(analytics.cashFlow.value).toEqual([
      { date: '2026-03-01T12:00:00', balance: 100 },
      { date: '2026-03-02T12:00:00', balance: 70 }
    ])
  })
})
