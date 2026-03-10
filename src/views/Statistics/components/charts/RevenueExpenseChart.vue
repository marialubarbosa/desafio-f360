<script setup lang="ts">
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

import { useTransactionAnalytics } from '@/stores/transactions/analytics/useTransactionAnalytics'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
)

const { incomeVsExpenseByMonth } = useTransactionAnalytics()

const monthLabels = [
  'JAN','FEV','MAR','ABR','MAI','JUN',
  'JUL','AGO','SET','OUT','NOV','DEZ'
]

const data = computed(() => {

  const months = Array(12).fill(null).map(() => ({
    income: 0,
    expense: 0
  }))

  incomeVsExpenseByMonth.value.forEach(item => {
    const monthIndex = Number(item.month.split('-')[1])
    months[monthIndex] = {
      income: item.income,
      expense: item.expense
    }
  })

  return {
    labels: monthLabels,
    datasets: [
      {
        label: 'Receitas',
        data: months.map(m => m.income),
        backgroundColor: '#1d4ed8'
      },
      {
        label: 'Despesas',
        data: months.map(m => m.expense),
        backgroundColor: '#cbd5e1'
      }
    ]
  }
})

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    }
  }
}
</script>

<template>
  <Bar :data="data" :options="options" />
</template>