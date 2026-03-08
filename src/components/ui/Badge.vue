<script setup lang="ts">
interface Props {
  variant?: 'income' | 'expense' | 'neutral'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'neutral'
})

const styles = {
  income: 'bg-green-100 text-green-700',
  expense: 'bg-red-100 text-red-600',
  neutral: 'bg-gray-100 text-gray-600'
}
</script>

<template>
  <span
    class="rounded-full px-2 md:px-3 py-0.5 md:py-1 text-xs md:text-sm font-medium"
    :class="styles[variant]"
  >
    <slot />
  </span>
</template>