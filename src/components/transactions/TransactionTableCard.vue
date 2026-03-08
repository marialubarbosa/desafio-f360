<script setup lang="ts">
import { computed } from 'vue'
import Input from '../ui/Input.vue'
import Select from '../ui/Select.vue'
import TransactionTable from './TransactionTable.vue'

import { categories } from '../../mocks/transactionsMock'
import { useTransactionStore } from '../../stores/transactionStore'
import { useTransactionFilter } from '../../composables/useTransactionFilter'

const store = useTransactionStore()

const transactions = computed(() => store.transactions)

const {
  search,
  category,
  type,
  filteredTransactions
} = useTransactionFilter(() => transactions.value)

const categoriesOptions = categories.map(c => ({
  label: c,
  value: c
}))

defineEmits(['delete'])
</script>

<template>
  <div class="rounded-3xl border border-neutral-200 bg-white">
    <div class="p-6 text-[18px] font-semibold">
      Transações Recentes
    </div>

    <div class="border-t border-neutral-200 bg-neutral-50 p-6 flex gap-4">
      <Input
        v-model="search"
        placeholder="Filtrar por descrição..."
        icon="search"
      />

      <Select
        v-model="category"
        placeholder="Categoria"
        :options="categoriesOptions"
      />

      <Select
        v-model="type"
        placeholder="Tipo"
        :options="[
          { label: 'Receita', value: 'income' },
          { label: 'Despesa', value: 'expense' }
        ]"
      />
    </div>

    <div v-if="transactions.length > 0" class="">
      <TransactionTable
        :transactions="filteredTransactions"
        @delete="$emit('delete', $event)"
      />
    </div>
  </div>
</template>