<script setup lang="ts">
defineProps<{
  modelValue: string
  options: { label: string; value: string }[]
}>()

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="flex rounded-full bg-neutral-100 p-1">
    <button
      v-for="opt in options"
      :key="opt.value"
      type="button"
      class="flex-1 rounded-full px-4 py-2 text-sm font-medium transition"
      :class="modelValue === opt.value  ? 'bg-white shadow text-gray-900' : 'text-gray-500'"
      @click="emit('update:modelValue', opt.value)"
    >
      {{ opt.label }}
    </button>
  </div>
</template>