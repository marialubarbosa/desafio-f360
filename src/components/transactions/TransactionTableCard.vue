<script setup lang="ts">
import { ref, computed } from 'vue'
import Input from '../ui/Input.vue'
import Select from '../ui/Select.vue'
import TransactionTable from './TransactionTable.vue'
import { generateTransactions, categories } from '../../mocks/transactionsMock'

const transactions = ref(generateTransactions());
const categoriesOptions = categories.map(c => ({ label: c, value: c }));
const search = ref('')
const category = ref('')
const type = ref('')

const filtered = computed(() => {
  return transactions.value.filter((t: any) => {
    return (
      (!search.value ||
        t.description.toLowerCase().includes(search.value.toLowerCase())) &&
      (!category.value || t.category === category.value) &&
      (!type.value || t.type === type.value)
    )
  })
})

const emit = defineEmits(['delete'])
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

    <div class="">
      <TransactionTable
        :transactions="filtered"
        @delete="$emit('delete', $event)"
      />
    </div>
  </div>
</template>