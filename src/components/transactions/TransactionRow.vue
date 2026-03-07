<script setup lang="ts">
import type { Transaction } from '../../types/transaction'

defineProps<{
  transaction: Transaction
}>()
</script>

<template>
  <div class="transaction-row" :class="transaction.type">
    <div class="transaction-info">
      <p class="description">{{ transaction.description }}</p>
      <p class="category">{{ transaction.category }}</p>
    </div>
    <div class="transaction-date">{{ transaction.date }}</div>
    <div class="transaction-value" :class="transaction.type">
      {{ transaction.type === 'income' ? '+' : '-' }} R$ {{ transaction.value.toFixed(2) }}
    </div>
  </div>
</template>

<style scoped>
.transaction-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  height: 60px;
}

.transaction-row.income {
  background-color: #f0fdf4;
  border-left: 4px solid #10b981;
}

.transaction-row.expense {
  background-color: #fef2f2;
  border-left: 4px solid #ef4444;
}

.transaction-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.description {
  margin: 0;
  font-weight: 500;
  color: #1f2937;
  font-size: 0.95rem;
}

.category {
  margin: 0;
  font-size: 0.8rem;
  color: #6b7280;
}

.transaction-date {
  margin: 0 1rem;
  font-size: 0.85rem;
  color: #9ca3af;
  min-width: 80px;
}

.transaction-value {
  font-weight: 600;
  font-size: 0.95rem;
  min-width: 120px;
  text-align: right;
}

.transaction-value.income {
  color: #10b981;
}

.transaction-value.expense {
  color: #ef4444;
}
</style>
