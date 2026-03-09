<script setup lang="ts">
import TransactionRow from '@/views/Dashboard/components/transactions/TransactionRow.vue'
import { RecycleScroller } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'


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
    <div class="min-w-[600px]  grid grid-cols-6 text-neutral-500 text-xs md:text-[12px] border-b border-neutral-200 bg-neutral-50 uppercase">
      <div class="py-2 md:py-3 px-6 md:px-6">DESCRIÇÃO</div>
      <div class="py-2 md:py-3 px-2 md:px-6">CATEGORIA</div>
      <div class="py-2 md:py-3 px-2 md:px-6">DATA</div>
      <div class="py-2 md:py-3 px-2 md:px-6">VALOR</div>
      <div class="py-2 md:py-3 px-2 md:px-6">TIPO</div>
      <div class="py-2 md:py-3 px-2 md:px-6">AÇÕES</div>
    </div>

    <RecycleScroller
      :items="transactions"
      :item-size="60"
      key-field="id"
      class=" min-w-[600px] w-full h-[400px] md:h-[468px]"
      >
        <template #default="{ item }">
          <TransactionRow
            :key="item.id"
            :transaction="item"
            @delete="$emit('delete', $event)"
          />
        </template>
    </RecycleScroller>
  </div>

</template>