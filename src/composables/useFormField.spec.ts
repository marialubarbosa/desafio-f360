import { describe, it, expect, vi } from 'vitest'
import { ref } from 'vue'
import { useFormField } from './useFormField'
import { useField } from 'vee-validate'

vi.mock('vee-validate')

describe('useFormField', () => {
  it('It should return the useField fields correctly', () => {
    const mockValue = ref('teste')
    const mockError = ref('erro')
    const mockMeta = { touched: false }
    const mockSetValue = vi.fn()

    vi.mocked(useField).mockReturnValue({
      value: mockValue,
      errorMessage: mockError,
      meta: mockMeta,
      setValue: mockSetValue
    } as any)

    const field = useFormField('email')

    expect(field.value).toBe(mockValue)
    expect(field.errorMessage).toBe(mockError)
    expect(field.meta).toBe(mockMeta)
    expect(field.setValue).toBe(mockSetValue)
  })
})