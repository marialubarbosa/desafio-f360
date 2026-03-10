<script setup lang="ts">
import RevenueExpenseChart from '@/views/Statistics/components/charts/RevenueExpenseChart.vue'
import CashFlowChart from '@/views/Statistics/components/charts/CashFlowChart.vue'
import CategoryChart from '@/views/Statistics/components/charts/CategoryChart.vue'


</script>


<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-8">
    
    <div class="bg-white p-4 rounded-lg shadow h-fit">
      <h2 class="semi-bold">Receitas vs Despesas</h2>
      <RevenueExpenseChart/>
    </div>

    <div class="bg-white p-4 rounded-lg shadow">
      <h2 class="semi-bold">Despesas por Categoria</h2>
      <CategoryChart/>
    </div>

  </div>
  <div>
    <div class="bg-white p-4 rounded-lg shadow">
      <h2 class="semi-bold">Fluxo Monetário</h2>
      <CashFlowChart/>
    </div>
  </div>
</template>

<style scoped>
</style>
