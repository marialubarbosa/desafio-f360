<script setup lang="ts">
import { computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  type ChartOptions,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'

import { useTransactionAnalytics } from '@/stores/transactions/analytics/useTransactionAnalytics'

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
)

const { expensesByCategory } = useTransactionAnalytics()

const colors = [
  '#1d4ed8',
  '#6366f1',
  '#a5b4fc',
  '#cbd5e1',
  '#94a3b8',
  '#64748b'
]

const data = computed(() => {
  const labels = expensesByCategory.value.map(item => item.category)
  const values = expensesByCategory.value.map(item => item.value)

  return {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: labels.map((_, index) => colors[index % colors.length])
      }
    ]
  }
})

const options: ChartOptions<'doughnut'> = {
  responsive: true,
  cutout: '70%',
  plugins: {
    legend: {
      position: 'right'
    }
  }
}
</script>

<template>
  <Doughnut :data="data" :options="options" />
</template>