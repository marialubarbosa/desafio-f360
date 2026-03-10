import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTransactionStore } from './transactionStore'
import type { NewTransaction, Transaction } from '@/types/transaction'

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

function createNewTransaction(overrides: Partial<NewTransaction> = {}): NewTransaction {
  return {
    description: 'Nova transação',
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

  afterEach(() => {
    vi.restoreAllMocks()
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

  it('replaces transactions when setTransactions is called again', () => {
    const store = useTransactionStore()

    store.setTransactions([createTransaction({ id: '1' }), createTransaction({ id: '2' })])
    store.setTransactions([createTransaction({ id: '3', type: 'income', value: 999 })])

    expect(store.transactions).toHaveLength(1)
    expect(store.transactions[0]?.id).toBe('3')
  })

  it('adds a transaction', () => {
    const store = useTransactionStore()

    const transaction = createNewTransaction({
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

  it('adds the newest transaction at the beginning of the list', () => {
    const store = useTransactionStore()

    const randomUUIDSpy = vi.spyOn(crypto, 'randomUUID')
      .mockReturnValueOnce('11111111-1111-1111-1111-111111111111')
      .mockReturnValueOnce('22222222-2222-2222-2222-222222222222')

    store.addTransaction(createNewTransaction({ description: 'Primeira' }))
    store.addTransaction(createNewTransaction({ description: 'Segunda' }))

    expect(randomUUIDSpy).toHaveBeenCalledTimes(2)
    expect(store.transactions).toHaveLength(2)
    expect(store.transactions[0]?.id).toBe('22222222-2222-2222-2222-222222222222')
    expect(store.transactions[0]?.description).toBe('Segunda')
    expect(store.transactions[1]?.id).toBe('11111111-1111-1111-1111-111111111111')
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

  it('does not remove anything when id does not exist', () => {
    const store = useTransactionStore()

    const transactions = [
      createTransaction({ id: '1' }),
      createTransaction({ id: '2' })
    ]

    store.setTransactions(transactions)
    store.removeTransaction('999')

    expect(store.transactions).toHaveLength(2)
    expect(store.transactions).toEqual(transactions)
  })

  it('returns zero totals and zero balance when there are no transactions', () => {
    const store = useTransactionStore()

    expect(store.totalIncome).toBe(0)
    expect(store.totalExpense).toBe(0)
    expect(store.balance).toBe(0)
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

  it('calculates negative balance when expenses are greater than income', () => {
    const store = useTransactionStore()

    store.setTransactions([
      createTransaction({ type: 'income', value: 100 }),
      createTransaction({ type: 'expense', value: 300 })
    ])

    expect(store.balance).toBe(-200)
  })

  it('returns zero monthly average balance when there are no income transactions', () => {
    const store = useTransactionStore()

    store.setTransactions([
      createTransaction({ type: 'expense', value: 300, date: '2024-01-10' })
    ])

    expect(store.monthlyAverageBalance).toBe(0)
  })

  it('returns zero monthly average expense when there are no expense transactions', () => {
    const store = useTransactionStore()

    store.setTransactions([
      createTransaction({ type: 'income', value: 1000, date: '2024-01-10' })
    ])

    expect(store.monthlyAverageExpense).toBe(0)
  })

  it('calculates monthly average balance grouped by distinct income months', () => {
    const store = useTransactionStore()

    store.setTransactions([
      createTransaction({ type: 'income', value: 1000, date: '2024-01-10' }),
      createTransaction({ type: 'income', value: 500, date: '2024-01-20' }),
      createTransaction({ type: 'income', value: 900, date: '2024-02-05' }),
      createTransaction({ type: 'expense', value: 300, date: '2024-02-15' })
    ])

    expect(store.monthlyAverageBalance).toBe(1200)
  })

  it('calculates monthly average expense grouped by distinct expense months', () => {
    const store = useTransactionStore()

    store.setTransactions([
      createTransaction({ type: 'expense', value: 200, date: '2024-01-10' }),
      createTransaction({ type: 'expense', value: 100, date: '2024-01-20' }),
      createTransaction({ type: 'expense', value: 500, date: '2024-03-05' }),
      createTransaction({ type: 'income', value: 1000, date: '2024-03-15' })
    ])

    expect(store.monthlyAverageExpense).toBe(400)
  })

  it('uses the raw date as fallback key when calculating monthly average balance with invalid dates', () => {
    const store = useTransactionStore()

    store.setTransactions([
      createTransaction({ type: 'income', value: 400, date: 'invalid-date-a' }),
      createTransaction({ type: 'income', value: 200, date: 'invalid-date-b' })
    ])

    expect(store.monthlyAverageBalance).toBe(300)
  })

  it('uses the raw date as fallback key when calculating monthly average expense with invalid dates', () => {
    const store = useTransactionStore()

    store.setTransactions([
      createTransaction({ type: 'expense', value: 90, date: 'invalid-date-a' }),
      createTransaction({ type: 'expense', value: 210, date: 'invalid-date-b' })
    ])

    expect(store.monthlyAverageExpense).toBe(150)
  })
})