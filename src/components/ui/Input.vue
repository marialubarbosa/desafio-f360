<script setup lang="ts">
const props = defineProps<{
  modelValue: string | number | undefined
  error?: boolean
}>()

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :class="[
      'w-full rounded-full border bg-white py-3 pl-10 pr-4 outline-none focus:ring-2',
      
      error
        ? 'border-danger focus:ring-red-400'
        : 'border-neutral-200 focus:ring-indigo-500'
    ]"
    :value="modelValue"
    @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>