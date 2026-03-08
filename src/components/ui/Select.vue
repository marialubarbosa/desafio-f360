<script setup lang="ts">
interface Option {
  label: string
  value: string
}

interface Props {
  modelValue: string
  options: Option[]
}

defineProps<Props>()

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <select
    class="rounded-full w-full border border-gray-200 bg-white px-4 py-3 text-gray-700 outline-none focus:ring-2 focus:ring-indigo-500 "
    :value="modelValue"
    @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
  >
    <option value="">Todos</option>

    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
    >
      {{ option.label }}
    </option>
  </select>
</template>