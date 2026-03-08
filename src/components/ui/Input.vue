<script setup lang="ts">
interface Props {
  modelValue: string
  placeholder?: string
  icon?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

function update(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>

<template>
  <div class="relative w-full">
    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 material-symbols-outlined">
      {{ icon }}
    </span>

    <input
      :value="modelValue"
      :placeholder="placeholder"
      @input="update"
      class="w-full rounded-full border border-gray-200 bg-white py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>
</template>