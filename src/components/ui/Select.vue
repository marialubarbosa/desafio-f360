<script setup lang="ts">
defineProps<{
  modelValue: string
  options: { label: string; value: string }[]
  error?: boolean
}>()

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <select
    :class="[
      'rounded-full w-full border bg-white px-2 md:px-4 py-2 md:py-3 text-gray-700 outline-none focus:ring-2',
      error
        ? 'border-danger focus:ring-red-400'
        : 'border-neutral-200 focus:ring-indigo-500'
    ]"
    :value="modelValue"
    @change="emit('update:modelValue', $event.target.value)"
  >
    <option value="">Selecione</option>

    <option
      v-for="opt in options"
      :key="opt.value"
      :value="opt.value"
    >
      {{ opt.label }}
    </option>
  </select>
</template>