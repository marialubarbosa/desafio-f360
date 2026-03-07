<script setup lang="ts">
import { onMounted } from 'vue'
import SummaryCards from '../components/summary/SummaryCards.vue'
import TransactionList from '../components/transactions/TransactionList.vue'
import { useTransactionStore } from '../stores/transactionStore'
import { generateTransactions } from '../utils/generateTransactions'
import Sidebar from '../components/sidebar/Sidebar.vue'
import Header from '../components/header/Header.vue'

const store = useTransactionStore()

onMounted(() => {
  const transactions = generateTransactions(30000)
  store.setTransactions(transactions)
})
</script>

<template>
  <div class="flex h-screen">
    <Sidebar />
    <main class="flex-1 overflow-auto p-6 bg-neutral-50">
      <Header />
      <SummaryCards />
      <TransactionList />
    </main>
  </div>
</template>

<style scoped>
</style>