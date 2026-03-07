<script setup lang="ts">
import { RecycleScroller } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import TransactionRow from './TransactionRow.vue'
import { useTransactionStore } from '../../stores/transactionStore'

const store = useTransactionStore()
</script>

<template>
  <RecycleScroller
    :items="store.transactions"
    :item-size="60"
    key-field="id"
    class="h-[500px]"
  >
    <template #default="{ item }">
      <TransactionRow :transaction="item" />
    </template>
  </RecycleScroller>
</template>