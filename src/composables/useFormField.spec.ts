import { describe, it, expect, vi } from 'vitest'
import { ref } from 'vue'
import { useFormField } from './useFormField'
import { useField, type FieldContext } from 'vee-validate'

vi.mock('vee-validate')

describe('useFormField', () => {
  it('It should return the useField fields correctly', () => {
    const mockValue = ref('teste')
    const mockError = ref('erro')
    const mockMeta: FieldContext<string>['meta'] = {
      touched: false,
      pending: false,
      valid: true,
      required: false,
      validated: false,
      initialValue: undefined,
      dirty: false
    }
    const mockSetValue = vi.fn()

    const mockedField = {
      value: mockValue,
      errorMessage: mockError,
      meta: mockMeta,
      setValue: mockSetValue,
      resetField: vi.fn(),
      validate: vi.fn(),
      handleChange: vi.fn(),
      handleBlur: vi.fn(),
      handleReset: vi.fn(),
      setState: vi.fn(),
      setTouched: vi.fn(),
      setErrors: vi.fn(),
      errors: ref([]),
      checked: undefined,
      label: undefined,
      name: 'email',
      type: 'default',
      bails: true,
      keepValueOnUnmount: undefined,
      checkedValue: undefined,
      uncheckedValue: undefined
    } satisfies Partial<FieldContext<string>>

    vi.mocked(useField).mockReturnValue(mockedField as unknown as ReturnType<typeof useField>)

    const field = useFormField('email')

    expect(field.value).toBe(mockValue)
    expect(field.errorMessage).toBe(mockError)
    expect(field.meta).toBe(mockMeta)
    expect(field.setValue).toBe(mockSetValue)
  })
})