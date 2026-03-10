import { ref } from 'vue'

export function useMaskedInputNumber(
  formatter: (digits: string) => string,
  parser: (digits: string) => number,
  maxLength?: number
) {
  const displayValue = ref('')

  function handleInput(e: Event, emit: (value: number) => void) {
    const input = e.target as HTMLInputElement

    let digits = input.value.replace(/\D/g, '')

    if (maxLength) {
      digits = digits.slice(0, maxLength)
    }

    const formatted = formatter(digits)

    displayValue.value = formatted

    emit(parser(digits))

    input.value = formatted
  }

  function preventInvalidKeys(e: KeyboardEvent) {
    const allowed = [
      'Backspace',
      'Delete',
      'ArrowLeft',
      'ArrowRight',
      'Tab'
    ]

    if (allowed.includes(e.key)) return

    if (!/^\d$/.test(e.key)) {
      e.preventDefault()
    }
  }

  return {
    displayValue,
    handleInput,
    preventInvalidKeys
  }
}

export function useMaskedInputString(
  formatter: (digits: string) => string,
  parser: (digits: string) => string,
  maxLength?: number
) {
  const displayValue = ref('')

  function handleInput(e: Event, emit: (value: string) => void) {
    const input = e.target as HTMLInputElement

    let digits = input.value.replace(/\D/g, '')

    if (maxLength) {
      digits = digits.slice(0, maxLength)
    }

    const formatted = formatter(digits)

    displayValue.value = formatted

    emit(parser(digits))

    input.value = formatted
  }

  function preventInvalidKeys(e: KeyboardEvent) {
    const allowed = [
      'Backspace',
      'Delete',
      'ArrowLeft',
      'ArrowRight',
      'Tab'
    ]

    if (allowed.includes(e.key)) return

    if (!/^\d$/.test(e.key)) {
      e.preventDefault()
    }
  }

  return {
    displayValue,
    handleInput,
    preventInvalidKeys
  }
}