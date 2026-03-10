<script setup lang="ts">
import { useTransactionStore } from '@/stores/transactionStore'
import FinancesCard from '@/components/ui/FinancesCard.vue'
import { computed } from 'vue'

const store = useTransactionStore()

const balance = computed(() => `R$ ${store.balance.toFixed(2)}`)
const monthlyAverageBalance = computed(() => `R$ ${store.monthlyAverageBalance.toFixed(2)}`)
const monthlyAverageExpense = computed(() => `R$ ${store.monthlyAverageExpense.toFixed(2)}`)

</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-8">
    <FinancesCard
      title="Saldo Total"
      :value="balance"
      icon="account_balance"
      iconBg="bg-indigo-100 text-indigo-600"
    />
    <FinancesCard
      title="Receitas Mensais"
      :value="monthlyAverageBalance"
      icon="arrow_downward_alt"
      iconBg="bg-emerald-100 text-emerald-600"
    />
    <FinancesCard
      title="Despesas Mensais"
      :value="monthlyAverageExpense"
      icon="arrow_upward_alt"
      iconBg="bg-red-100 text-red-500"
    />
  </div>
</template>

<style scoped>
</style>
