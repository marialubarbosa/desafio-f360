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
}>()

const emit = defineEmits(['delete'])
</script>

<template>
  <div class="grid grid-cols-6 pl-6 md:pl-6 items-center my-2 md:my-4 text-xs md:text-[14px] gap-1 md:gap-0">
    <div class="text-neutral-700 font-medium">{{ transaction.description }}</div>

    <div>
      <Badge>
        {{ transaction.category }}
      </Badge>
    </div>

    <div>{{ transaction.date }}</div>

    <div
      :class="transaction.type === 'income' ? 'text-success' : 'text-danger'"
      class="text-[14px] font-medium"
    >
      {{ transaction.type === 'income' ? '+' : '-' }}
      R$ {{ Math.abs(transaction.value).toFixed(2) }}
    </div>

    <div>
      <Badge :variant="transaction.type">
        {{ transaction.type === 'income' ? 'Receita' : 'Despesa' }}
      </Badge>
    </div>
    <div class="flex gap-4 pl-6">
      <button @click="$emit('delete', transaction)" class="cursor-pointer hover:bg-red-100 rounded-full w-10 h-10 flex items-center justify-center">
        <span class="material-symbols-outlined text-danger">
          delete
        </span>
      </button>
    </div>
  </div>
</template>