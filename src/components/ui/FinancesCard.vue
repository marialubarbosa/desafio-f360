<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  title: string
  value: string | number
  icon?: string
  iconBg?: string
}

const props = defineProps<Props>()


const iconBgClass = computed(() => props.iconBg ?? 'bg-neutral-300')
</script>

<template>
  <div
    class="flex flex-col justify-between rounded-3xl border border-neutral-200 bg-white p-4 md:p-6 shadow-sm transition hover:shadow-md w-full"
  >
    <div class="flex items-center justify-between">
      <span class="text-neutral-500 text-xs md:text-[14px]">
        {{ title }}
      </span>

      <div
        v-if="icon"
        class="flex h-12 w-12 items-center justify-center rounded-full"
        :class="iconBgClass"
      >
        <span class="text-xl material-symbols-outlined">
          {{ icon }}
        </span>
      </div>
    </div>

    <div class="mt-4 md:mt-6 text-2xl md:text-[20px] font-bold text-neutral-900">
      {{ value }}
    </div>

  </div>
</template>