import { ref, type Ref } from 'vue'

type MaskFormatter = (digits: string) => string
type MaskParser<TValue> = (digits: string) => TValue
type MaskEmit<TValue> = (value: TValue) => void

interface UseMaskedInputResult<TValue> {
  displayValue: Ref<string>
  handleInput: (event: Event, emit: MaskEmit<TValue>) => void
  preventInvalidKeys: (event: KeyboardEvent) => void
}

const ALLOWED_KEYS = new Set([
  'Backspace',
  'Delete',
  'ArrowLeft',
  'ArrowRight',
  'Tab'
])

function extractDigits(value: string, maxLength?: number): string {
  const digits = value.replace(/\D/g, '')

  return maxLength ? digits.slice(0, maxLength) : digits
}

function createMaskedInput<TValue>(
  formatter: MaskFormatter,
  parser: MaskParser<TValue>,
  maxLength?: number
): UseMaskedInputResult<TValue> {
  const displayValue = ref('')

  function handleInput(event: Event, emit: MaskEmit<TValue>) {
    const input = event.target

    if (!(input instanceof HTMLInputElement)) {
      return
    }

    const digits = extractDigits(input.value, maxLength)

    const formatted = formatter(digits)

    displayValue.value = formatted

    emit(parser(digits))

    input.value = formatted
  }

  function preventInvalidKeys(event: KeyboardEvent) {
    if (ALLOWED_KEYS.has(event.key)) return

    if (!/^\d$/.test(event.key)) {
      event.preventDefault()
    }
  }

  return {
    displayValue,
    handleInput,
    preventInvalidKeys
  }
}

export function useMaskedInputNumber(
  formatter: MaskFormatter,
  parser: MaskParser<number>,
  maxLength?: number
): UseMaskedInputResult<number> {
  return createMaskedInput<number>(formatter, parser, maxLength)
}

export function useMaskedInputString(
  formatter: MaskFormatter,
  parser: MaskParser<string>,
  maxLength?: number
): UseMaskedInputResult<string> {
  return createMaskedInput<string>(formatter, parser, maxLength)
}