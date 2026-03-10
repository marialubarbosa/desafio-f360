<script setup lang="ts">
import TransactionRow from '@/views/Dashboard/components/transactions/TransactionRow.vue'
import { RecycleScroller } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

const tableGridClass = 'grid min-w-[760px] grid-cols-[minmax(180px,2fr)_minmax(140px,1.2fr)_minmax(110px,1fr)_minmax(120px,1fr)_minmax(120px,1fr)_88px]'

interface Transaction {
  id: string
  description: string
  category: string
  date: string
  value: number
  type: 'income' | 'expense'
}

defineProps<{
  transactions: Transaction[]
}>()

defineEmits(['delete'])

</script>

<template>
  <div class="w-full text-left overflow-x-auto">
    <div :class="tableGridClass" class="border-b border-neutral-200 bg-neutral-50 text-[11px] uppercase text-neutral-500 md:text-[12px]">
      <div class="px-4 py-3 md:px-6">Descrição</div>
      <div class="px-3 py-3 md:px-6">Categoria</div>
      <div class="px-3 py-3 md:px-6">Data</div>
      <div class="px-3 py-3 md:px-6">Valor</div>
      <div class="px-3 py-3 md:px-6">Tipo</div>
      <div class="px-3 py-3 md:px-6">Ações</div>
    </div>

    <RecycleScroller
      :items="transactions"
      :item-size="72"
      key-field="id"
      class="min-w-[760px] h-[400px] md:h-[468px]"
    >
        <template #default="{ item }">
          <TransactionRow
            :key="item.id"
            :transaction="item"
            :grid-class="tableGridClass"
            @delete="$emit('delete', $event)"
          />
        </template>
    </RecycleScroller>
  </div>

</template>