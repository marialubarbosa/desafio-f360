<script setup lang="ts">
import { watch } from 'vue'
import { useMaskedInputNumber } from '@/composables/useMaskedInput'

const props = defineProps<{
  modelValue: number | undefined
  error?: boolean
}>()

const emit = defineEmits(['update:modelValue'])

function formatter(digits: string) {
  if (!digits) return ''

  const numberValue = Number(digits) / 100

  return numberValue.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

function parser(digits: string) {
  if (!digits) return 0
  return Number(digits) / 100
}

const { displayValue, handleInput, preventInvalidKeys } =
  useMaskedInputNumber(formatter, parser, 8)

watch(
  () => props.modelValue,
  (value) => {
    if (value === undefined) {
      displayValue.value = ''
      return
    }

    displayValue.value = value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  },
  { immediate: true }
)
</script>

<template>
  <div class="relative">

    <span
      class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm"
    >
      R$
    </span>

    <input
      :class="[
        'w-full rounded-full border bg-white py-2 md:py-3 pl-10 md:pl-12 pr-2 md:pr-4 outline-none focus:ring-2',
        error
          ? 'border-red-500 focus:ring-red-400'
          : 'border-gray-200 focus:ring-indigo-500'
      ]"
      :value="displayValue"
      inputmode="numeric"
      @keydown="preventInvalidKeys"
      @input="(e) => handleInput(e, (v) => emit('update:modelValue', v))"
    />

  </div>
</template>