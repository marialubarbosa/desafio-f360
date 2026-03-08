<script setup lang="ts">
import { onMounted } from 'vue'
import SummaryCards from '../components/summary/SummaryCards.vue'
import { useTransactionStore } from '../stores/transactionStore'
 import Sidebar from '../components/sidebar/Sidebar.vue'
import Header from '../components/header/Header.vue'
import TransactionTableCard from '../components/transactions/TransactionTableCard.vue'
import TransactionModal from '../components/transactions/TransactionModal.vue'
import type { Transaction } from '../types/transaction'
import { ref } from 'vue'
import { generateTransactions } from '../mocks/transactionsMock'

const store = useTransactionStore()
const isModalOpen = ref<boolean>(false)
const modalType = ref<'add' | 'delete'>('add')
const selectedTransaction = ref<Transaction | null>(null)

onMounted(() => {
  if (store.transactions.length === 0) {
    const transactions = ref(generateTransactions());
    store.setTransactions(transactions.value)
  }

})

function addTransaction(updated: Transaction) {
  store.addTransaction({...updated })
  isModalOpen.value = false
}

function deleteTransaction  () {
  if (selectedTransaction.value) {
    store.removeTransaction(selectedTransaction.value.id)
    isModalOpen.value = false
  }
}

function openModalDelete(transaction: Transaction) {
  selectedTransaction.value = transaction
  modalType.value = 'delete'
  isModalOpen.value = true
}

function openModalAdd() {
  selectedTransaction.value = null
  modalType.value = 'add'
  isModalOpen.value = true
}
</script>

<template>

  <div class="flex flex-col md:flex-row min-h-screen">
    <Sidebar />
    <main class="flex-1 p-2 md:p-6 bg-neutral-50 min-h-screen">
      <Header @add="openModalAdd"/>
      <SummaryCards />
      <TransactionTableCard @delete="openModalDelete"/>
    </main>
  </div>

  <TransactionModal
    v-model="isModalOpen"
    :transaction="selectedTransaction"
    :type="modalType"
    @save="addTransaction"
    @delete="deleteTransaction"
  />
</template>

<style scoped>
</style>