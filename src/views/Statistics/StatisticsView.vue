<script setup lang="ts">
import SummaryCards from '@/views/Dashboard/components/summary/SummaryCards.vue'
import { useTransactionStore } from '@stores/transactionStore'
import { onMounted, ref } from 'vue'
import { generateTransactions } from '@/mocks/transactionsMock'

const store = useTransactionStore()

onMounted(() => {
  if (store.transactions.length === 0) {
    const transactions = ref(generateTransactions());
    store.setTransactions(transactions.value)
  }

})

</script>

<template>

  <Transition name="slide-up" appear>
    <SummaryCards />
  </Transition>

</template>

<style scoped>

</style>