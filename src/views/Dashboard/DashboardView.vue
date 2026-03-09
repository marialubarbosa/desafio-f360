<script setup lang="ts">
import { onMounted } from 'vue'
import SummaryCards from '@/views/Dashboard/components/summary/SummaryCards.vue'
import { useTransactionStore } from '@stores/transactionStore'
import TransactionTableCard from '@/views/Dashboard/components/transactions/TransactionTableCard.vue'
import TransactionModal from '@/views/Dashboard/components/transactions/TransactionModal.vue'
import type { Transaction } from '@/types/transaction'
import { ref } from 'vue'
import { generateTransactions } from '@mocks/transactionsMock'

const store = useTransactionStore()
const isModalOpen = ref<boolean>(false)
const modalType = ref<'add' | 'delete'>('add')
const selectedTransaction = ref<Transaction | undefined>(undefined)

onMounted(() => {
  if (store.transactions.length === 0) {
    const transactions = ref(generateTransactions());
    store.setTransactions(transactions.value)
  }

})

function addTransaction(updated: Transaction) {
  store.addTransaction({ ...updated })
  isModalOpen.value = false
}


function openAddModal() {
  modalType.value = 'add'
  selectedTransaction.value = undefined
  isModalOpen.value = true
}

defineExpose({ openAddModal })

function deleteTransaction() {
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

</script>

<template>

  <SummaryCards />
  <TransactionTableCard @delete="openModalDelete" />

  <TransactionModal v-model="isModalOpen" :transaction="selectedTransaction" :type="modalType" @save="addTransaction($event)"
    @delete="deleteTransaction" />

</template>

<style scoped></style>