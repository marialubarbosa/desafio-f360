
import { describe, it, expect, vi } from 'vitest'
import type { Transaction } from '../types/transaction'
import { useTransactionFilter } from './useTransactionFilter'
import { nextTick } from 'vue'

vi.mock('@vueuse/core', () => ({
  useDebounce: <T>(value: T) => value
}))

function createTransaction(overrides: Partial<Transaction> = {}): Transaction {
  return {
    id: '1',
    description: 'Transação teste',
    value: 100,
    category: 'Outros',
    type: 'expense',
    date: '2024-01-01',
    ...overrides
  }
}

describe('useTransactionFilter', () => {
  const mockTransactions: Transaction[] = [
    createTransaction({
      id: '1',
      description: 'Salário',
      category: 'Trabalho',
      type: 'income',
      value: 5000
    }),
    createTransaction({
      id: '2',
      description: 'Supermercado',
      category: 'Alimentação',
      type: 'expense',
      value: 200
    }),
    createTransaction({
      id: '3',
      description: 'Freelance',
      category: 'Trabalho',
      type: 'income',
      value: 1500
    })
  ]

  const getTransactions = () => mockTransactions

  it('Returns all transactions without filters', () => {
    const { filteredTransactions } = useTransactionFilter(getTransactions)
    expect(filteredTransactions.value).toHaveLength(3)
  })

  it('Filters by search', async () => {
    const { search, filteredTransactions } = useTransactionFilter(getTransactions)
    search.value = 'sal'
    await nextTick()
    expect(filteredTransactions.value).toHaveLength(1)
    expect(filteredTransactions.value[0]?.description).toBe('Salário')
  })

  it('Filters by category', async () => {
    const { category, filteredTransactions } = useTransactionFilter(getTransactions)
    category.value = 'Trabalho'
    await nextTick()
    expect(filteredTransactions.value).toHaveLength(2)
  })

  it('Filters by type', async () => {
    const { type, filteredTransactions } = useTransactionFilter(getTransactions)
    type.value = 'expense'
    await nextTick()
    expect(filteredTransactions.value).toHaveLength(1)
    expect(filteredTransactions.value[0]?.description).toBe('Supermercado')
  })

  it('Resets the filters', () => {
    const { search, category, type, resetFilters } = useTransactionFilter(getTransactions)
    search.value = 'teste'
    category.value = 'Trabalho'
    type.value = 'income'
    resetFilters()
    expect(search.value).toBe('')
    expect(category.value).toBe('')
    expect(type.value).toBe('')
  })
})