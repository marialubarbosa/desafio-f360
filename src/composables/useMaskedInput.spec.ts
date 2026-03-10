import { describe, it, expect, vi } from 'vitest'
import { useMaskedInput } from './useMaskedInput'

describe('useMaskedInput', () => {
  it('You must format the value and output the parser correctly', () => {
    const formatter = (digits: string) => `(${digits})`
    const parser = (digits: string) => Number(digits)

    const { handleInput, displayValue } = useMaskedInput(formatter, parser)

    const emit = vi.fn()

    const input = document.createElement('input')
    input.value = '123abc'

    const event = { target: input } as unknown as Event

    handleInput(event, emit)

    expect(displayValue.value).toBe('(123)')
    expect(input.value).toBe('(123)')
    expect(emit).toHaveBeenCalledWith(123)
  })
})

it('You must limit the digits by maxLength', () => {
  const formatter = (d: string) => d
  const parser = (d: string) => d

  const { handleInput } = useMaskedInput(formatter, parser, 3)

  const emit = vi.fn()

  const input = document.createElement('input')
  input.value = '123456'

  const event = { target: input } as unknown as Event

  handleInput(event, emit)

  expect(emit).toHaveBeenCalledWith('123')
})

it('You must block non-numeric keys', () => {
  const formatter = (d: string) => d
  const parser = (d: string) => d

  const { preventInvalidKeys } = useMaskedInput(formatter, parser)

  const preventDefault = vi.fn()

  const event = {
    key: 'a',
    preventDefault
  } as unknown as KeyboardEvent

  preventInvalidKeys(event)

  expect(preventDefault).toHaveBeenCalled()
})

it('You must allow numeric keys', () => {
  const formatter = (d: string) => d
  const parser = (d: string) => d

  const { preventInvalidKeys } = useMaskedInput(formatter, parser)

  const preventDefault = vi.fn()

  const event = {
    key: '5',
    preventDefault
  } as unknown as KeyboardEvent

  preventInvalidKeys(event)

  expect(preventDefault).not.toHaveBeenCalled()
})