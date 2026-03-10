import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTransactionStore } from './transactionStore'
import type { Transaction } from '@/types/transaction'

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

describe('useTransactionStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('starts with empty transactions', () => {
    const store = useTransactionStore()

    expect(store.transactions).toEqual([])
  })

  it('sets transactions', () => {
    const store = useTransactionStore()

    const transactions = [
      createTransaction({ id: '1', type: 'income', value: 500 }),
      createTransaction({ id: '2', type: 'expense', value: 200 })
    ]

    store.setTransactions(transactions)

    expect(store.transactions).toHaveLength(2)
    expect(store.transactions).toEqual(transactions)
  })

  it('adds a transaction', () => {
    const store = useTransactionStore()

    const transaction = createTransaction({
      description: 'Freelance',
      type: 'income',
      value: 1000
    })

    vi.spyOn(crypto, 'randomUUID').mockReturnValue('123e4567-e89b-12d3-a456-426614174000')

    store.addTransaction(transaction)

    expect(store.transactions).toHaveLength(1)
    expect(store.transactions[0]?.id).toBe('123e4567-e89b-12d3-a456-426614174000')
    expect(store.transactions[0]?.description).toBe('Freelance')
  })

  it('removes a transaction by id', () => {
    const store = useTransactionStore()

    const transactions = [
      createTransaction({ id: '1' }),
      createTransaction({ id: '2' })
    ]

    store.setTransactions(transactions)

    store.removeTransaction('1')

    expect(store.transactions).toHaveLength(1)
    expect(store.transactions[0]?.id).toBe('2')
  })

  it('calculates total income', () => {
    const store = useTransactionStore()

    store.setTransactions([
      createTransaction({ type: 'income', value: 1000 }),
      createTransaction({ type: 'income', value: 500 }),
      createTransaction({ type: 'expense', value: 200 })
    ])

    expect(store.totalIncome).toBe(1500)
  })

  it('calculates total expense', () => {
    const store = useTransactionStore()

    store.setTransactions([
      createTransaction({ type: 'expense', value: 300 }),
      createTransaction({ type: 'expense', value: 200 }),
      createTransaction({ type: 'income', value: 1000 })
    ])

    expect(store.totalExpense).toBe(500)
  })

  it('calculates balance', () => {
    const store = useTransactionStore()

    store.setTransactions([
      createTransaction({ type: 'income', value: 1000 }),
      createTransaction({ type: 'expense', value: 300 })
    ])

    expect(store.balance).toBe(700)
  })
})