import { useField } from 'vee-validate'

export function useFormField<T = string>(name: string) {
  const field = useField<T>(name)

  return {
    value: field.value,
    errorMessage: field.errorMessage,
    meta: field.meta,
    setValue: field.setValue
  }
}