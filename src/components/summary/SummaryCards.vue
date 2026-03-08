<script setup lang="ts">
import { useTransactionStore } from '../../stores/transactionStore'
import FinancesCard from '../ui/FinancesCard.vue'
const store = useTransactionStore()
</script>

<template>
  <div class="grid grid-cols-3 gap-6 mb-8">
    <FinancesCard
      title="Saldo Total"
      :value="store.balance.toFixed(2)"
      icon="account_balance"
      iconBg="bg-indigo-100 text-indigo-600"
    />
    <FinancesCard
      title="Receitas"
      :value="store.totalIncome.toFixed(2)"
      icon="arrow_downward_alt"
      iconBg="bg-emerald-100 text-emerald-600"
    />
    <FinancesCard
      title="Despesas"
      :value="store.totalExpense.toFixed(2)"
      icon="arrow_upward_alt"
      iconBg="bg-red-100 text-red-500"
    />
  </div>
</template>

<style scoped>
</style>
