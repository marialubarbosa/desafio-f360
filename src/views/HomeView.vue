<script setup lang="ts">
import { onMounted } from 'vue'
import SummaryCards from '../components/summary/SummaryCards.vue'
import TransactionList from '../components/transactions/TransactionList.vue'
import { useTransactionStore } from '../stores/transactionStore'
import { generateTransactions } from '../utils/generateTransactions'

const store = useTransactionStore()

onMounted(() => {
  const transactions = generateTransactions(30000)
  store.setTransactions(transactions)
})
</script>

<template>
  <div class="container">
    <header>
      <h1>Gestor de Transações</h1>
    </header>
    <SummaryCards />
    <TransactionList />
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

header {
  margin-bottom: 2rem;
}

header h1 {
  margin: 0;
  color: #1f2937;
  font-size: 2rem;
}
</style>