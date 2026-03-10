<script setup lang="ts">
import Badge from '@/components/ui/Badge.vue'

interface Transaction {
  id: string
  description: string
  category: string
  date: string
  value: number
  type: 'income' | 'expense'
}

defineProps<{
  transaction: Transaction
  gridClass?: string
}>()

const emit = defineEmits(['delete'])
</script>

<template>
  <div :class="gridClass" class="h-[72px] w-full items-center border-b border-neutral-100 text-xs md:text-[14px]">
    <div class="px-4 text-neutral-700 font-medium md:px-6">{{ transaction.description }}</div>

    <div class="px-3 md:px-6">
      <Badge>
        {{ transaction.category }}
      </Badge>
    </div>

    <div class="px-3 md:px-6">{{ transaction.date }}</div>

    <div
      :class="transaction.type === 'income' ? 'text-success' : 'text-danger'"
      class="px-3 text-[14px] font-medium md:px-6"
    >
      {{ transaction.type === 'income' ? '+' : '-' }}
      R$ {{ Math.abs(transaction.value).toFixed(2) }}
    </div>

    <div class="px-3 md:px-6">
      <Badge :variant="transaction.type">
        {{ transaction.type === 'income' ? 'Receita' : 'Despesa' }}
      </Badge>
    </div>
    <div class="flex px-3 md:px-6">
      <button @click="$emit('delete', transaction)" class="cursor-pointer hover:bg-red-100 rounded-full w-10 h-10 flex items-center justify-center">
        <span class="material-symbols-outlined text-danger">
          delete
        </span>
      </button>
    </div>
  </div>
</template>