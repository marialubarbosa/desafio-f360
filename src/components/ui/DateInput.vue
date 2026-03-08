<script setup lang="ts">
import { watch } from 'vue'
import { useMaskedInput } from '../../composables/useMaskedInput'

const props = defineProps<{
  modelValue: string | undefined
  error?: boolean
}>()

const emit = defineEmits(['update:modelValue'])

function formatter(digits: string) {
  const parts = []

  if (digits.length >= 2) {
    parts.push(digits.slice(0, 2))
  } else {
    parts.push(digits)
  }

  if (digits.length >= 4) {
    parts.push(digits.slice(2, 4))
  } else if (digits.length > 2) {
    parts.push(digits.slice(2))
  }

  if (digits.length > 4) {
    parts.push(digits.slice(4, 8))
  }

  return parts.join('/')
}

function parser(digits: string) {
  return formatter(digits)
}

const { displayValue, handleInput, preventInvalidKeys } =
  useMaskedInput(formatter, parser, 8)

watch(
  () => props.modelValue,
  (value) => {
    displayValue.value = value ?? ''
  },
  { immediate: true }
)
</script>

<template>
  <input
    :class="[
      'w-full rounded-full border bg-white py-3 pl-4 pr-4 outline-none focus:ring-2',
      error
        ? 'border-red-500 focus:ring-red-400'
        : 'border-gray-200 focus:ring-indigo-500'
    ]"
    :value="displayValue"
    inputmode="numeric"
    @keydown="preventInvalidKeys"
    @input="(e) => handleInput(e, (v) => emit('update:modelValue', v))"
  />
</template>