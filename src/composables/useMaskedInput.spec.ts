import { describe, it, expect, vi } from 'vitest'
import { useMaskedInputNumber, useMaskedInputString } from './useMaskedInput'

describe('useMaskedInputNumber', () => {
  it('formats value, strips non-digits and emits parsed number', () => {
    const formatter = vi.fn((digits: string) => `(${digits})`)
    const parser = vi.fn((digits: string) => Number(digits))

    const { handleInput, displayValue } = useMaskedInputNumber(formatter, parser)
    const emit = vi.fn()

    const input = document.createElement('input')
    input.value = '12a3b'

    handleInput({ target: input } as Event, emit)

    expect(formatter).toHaveBeenCalledWith('123')
    expect(parser).toHaveBeenCalledWith('123')
    expect(displayValue.value).toBe('(123)')
    expect(input.value).toBe('(123)')
    expect(emit).toHaveBeenCalledWith(123)
  })

  it('limits digits by maxLength before formatting and parsing', () => {
    const formatter = vi.fn((d: string) => d)
    const parser = vi.fn((d: string) => Number(d))

    const { handleInput } = useMaskedInputNumber(formatter, parser, 3)
    const emit = vi.fn()

    const input = document.createElement('input')
    input.value = '123456'

    handleInput({ target: input } as Event, emit)

    expect(formatter).toHaveBeenCalledWith('123')
    expect(parser).toHaveBeenCalledWith('123')
    expect(emit).toHaveBeenCalledWith(123)
  })

  it('blocks non-numeric keys', () => {
    const { preventInvalidKeys } = useMaskedInputNumber(d => d, d => Number(d))

    const preventDefault = vi.fn()
    preventInvalidKeys({ key: 'a', preventDefault } as unknown as KeyboardEvent)

    expect(preventDefault).toHaveBeenCalled()
  })

  it('allows numeric and navigation keys', () => {
    const { preventInvalidKeys } = useMaskedInputNumber(d => d, d => Number(d))

    const allowedKeys = ['5', 'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab']

    allowedKeys.forEach((key) => {
      const preventDefault = vi.fn()
      preventInvalidKeys({ key, preventDefault } as unknown as KeyboardEvent)
      expect(preventDefault).not.toHaveBeenCalled()
    })
  })
})

describe('useMaskedInputString', () => {
  it('formats value, strips non-digits and emits parsed string', () => {
    const formatter = vi.fn((digits: string) => `${digits.slice(0, 2)}-${digits.slice(2)}`)
    const parser = vi.fn((digits: string) => digits)

    const { handleInput, displayValue } = useMaskedInputString(formatter, parser)
    const emit = vi.fn()

    const input = document.createElement('input')
    input.value = '12x34'

    handleInput({ target: input } as Event, emit)

    expect(formatter).toHaveBeenCalledWith('1234')
    expect(parser).toHaveBeenCalledWith('1234')
    expect(displayValue.value).toBe('12-34')
    expect(input.value).toBe('12-34')
    expect(emit).toHaveBeenCalledWith('1234')
  })

  it('limits digits by maxLength before formatting and parsing', () => {
    const formatter = vi.fn((d: string) => d)
    const parser = vi.fn((d: string) => d)

    const { handleInput } = useMaskedInputString(formatter, parser, 3)
    const emit = vi.fn()

    const input = document.createElement('input')
    input.value = '123456'

    handleInput({ target: input } as Event, emit)

    expect(formatter).toHaveBeenCalledWith('123')
    expect(parser).toHaveBeenCalledWith('123')
    expect(emit).toHaveBeenCalledWith('123')
  })

  it('blocks non-numeric keys', () => {
    const { preventInvalidKeys } = useMaskedInputString(d => d, d => d)

    const preventDefault = vi.fn()
    preventInvalidKeys({ key: 'a', preventDefault } as unknown as KeyboardEvent)

    expect(preventDefault).toHaveBeenCalled()
  })

  it('allows numeric and navigation keys', () => {
    const { preventInvalidKeys } = useMaskedInputString(d => d, d => d)

    const allowedKeys = ['5', 'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab']

    allowedKeys.forEach((key) => {
      const preventDefault = vi.fn()
      preventInvalidKeys({ key, preventDefault } as unknown as KeyboardEvent)
      expect(preventDefault).not.toHaveBeenCalled()
    })
  })
})