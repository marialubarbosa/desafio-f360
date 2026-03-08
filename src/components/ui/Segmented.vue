<script setup lang="ts">
defineProps<{
  modelValue: string
  options: { label: string; value: string }[]
}>()

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="flex rounded-full bg-neutral-100 p-0.5 md:p-1">
    <button
      v-for="opt in options"
      :key="opt.value"
      type="button"
      class="flex-1 rounded-full px-2 md:px-4 py-1 md:py-2 text-xs md:text-sm font-medium transition"
      :class="modelValue === opt.value  ? 'bg-white shadow text-gray-900' : 'text-gray-500'"
      @click="emit('update:modelValue', opt.value)"
    >
      {{ opt.label }}
    </button>
  </div>
</template>