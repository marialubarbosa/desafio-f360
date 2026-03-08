<script setup lang="ts">
defineProps<{
  label: string
  error?: string
}>()
</script>

<template>
  <div class="mt-2 mb-4">

    <label class="text-[14px] text-neutral-600">
      {{ label }}
    </label>

    <div class="mt-1">
      <slot />
    </div>

    <p
      v-if="error"
      class="text-red-500 text-xs mt-1"
    >
      {{ error }}
    </p>

  </div>
</template>