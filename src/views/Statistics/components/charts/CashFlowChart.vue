<script setup lang="ts">
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip
} from 'chart.js'

import { useTransactionAnalytics } from '@/stores/transactions/analytics/useTransactionAnalytics'

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip
)

const { dailyCashFlow } = useTransactionAnalytics()

const data = computed(() => {

  const labels = dailyCashFlow.value.map(item => {
    const [year, month, day] = item.date.split('-').map(Number)

    const date = new Date(year, month - 1, day)

    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short'
    }).toUpperCase()
  })

  const values = dailyCashFlow.value.map(item => item.balance)

  return {
    labels,
    datasets: [
      {
        label: 'Fluxo',
        data: values,
        borderColor: '#1d4ed8',
        tension: 0.4,
        pointRadius: 0,
        fill: true
      }
    ]
  }
})

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    y: {
      grid: {
        color: '#e5e7eb'
      }
    },
    x: {
      grid: {
        display: false
      }
    }
  }
}
</script>

<template>
  <Line :data="data" :options="options" />
</template>