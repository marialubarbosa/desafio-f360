
<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  label?: string
  variant?: 'primary' | 'secondary' | 'danger' | 'white'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  icon?: string
  block?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  loading: false,
  disabled: false,
  block: false
})

const emit = defineEmits<{
  (e: 'click'): void
}>()

const baseStyle =
  'flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200'

const variantClasses = {
  primary: 'bg-primary text-white hover:bg-secondary',
  secondary: 'bg-quaternary text-gray-800 hover:bg-terciary',
  danger: 'bg-danger text-white hover:bg-danger/90',
  white: 'bg-white text-primary border border-neutral-300 hover:bg-neutral-100'
}

const sizeClasses = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg'
}

const classes = computed(() => [
  baseStyle,
  variantClasses[props.variant],
  sizeClasses[props.size],
  props.block ? 'w-full' : '',
  props.disabled || props.loading
    ? 'opacity-50 cursor-not-allowed'
    : 'cursor-pointer'
])
</script>

<template>
  <button
    :type="props.type"
    :class="classes"
    :disabled="props.disabled || props.loading"
    @click="emit('click')"
  >
    <span
      v-if="loading"
      class="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
    />

    <span v-if="icon && !loading" class="material-symbols-outlined text-lg">
      {{ icon }}
    </span>

    <slot>
      {{ label }}
    </slot>
  </button>
</template>