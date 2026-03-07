<script setup lang="ts">
import { useTransactionStore } from '../../stores/transactionStore'

const store = useTransactionStore()
</script>

<template>
  <div class="summary-cards">
    <div class="card income">
      <h3>Receitas</h3>
      <p class="value">{{ store.totalIncome.toFixed(2) }}</p>
    </div>
    <div class="card expense">
      <h3>Despesas</h3>
      <p class="value">{{ store.totalExpense.toFixed(2) }}</p>
    </div>
    <div class="card balance">
      <h3>Saldo</h3>
      <p class="value" :class="{ negative: store.balance < 0 }">
        {{ store.balance.toFixed(2) }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.summary-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.card {
  padding: 1.5rem;
  border-radius: 8px;
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card h3 {
  margin: 0 0 0.5rem 0;
  font-size: 0.875rem;
  font-weight: 500;
  opacity: 0.9;
}

.card .value {
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
}

.card.income {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.card.expense {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
}

.card.balance {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
}

.card.balance .value.negative {
  color: #fecaca;
}
</style>
