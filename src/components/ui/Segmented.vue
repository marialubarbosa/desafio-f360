<script setup lang="ts">
interface Option {
  label: string
  value: string
}

defineProps<{
  modelValue: string
  options: Option[]
}>()

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="flex rounded-full bg-neutral-100 p-1">
    <button
      v-for="opt in options"
      :key="opt.value"
      @click="emit('update:modelValue', opt.value)"
      class="flex-1 rounded-full px-4 py-2 text-sm font-medium transition"
      :class="
        modelValue === opt.value
          ? 'bg-white shadow text-gray-900'
          : 'text-gray-500'
      "
    >
      {{ opt.label }}
    </button>
  </div>
</template>