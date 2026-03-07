<script setup>
import { useVirtualList } from '@vueuse/core'
import { ref } from 'vue'

const allTransactions = ref(
  Array.from({ length: 30000 }, (_, i) => ({
    id: i,
    title: `Transação #${i}`,
    amount: (Math.random() * 1000).toFixed(2)
  }))
)

const { list, containerProps, wrapperProps } = useVirtualList(allTransactions, {
  itemHeight: 50, 
})
</script>

<template>
  <div v-bind="containerProps" style="height: 500px; border: 1px solid #ccc;">
    <div v-bind="wrapperProps">
      <div 
        v-for="item in list" 
        :key="item.data.id" 
        style="height: 50px; display: flex; align-items: center; padding: 0 10px; border-bottom: 1px solid #eee;"
      >
        {{ item.data.title }} - R$ {{ item.data.amount }}
      </div>
    </div>
  </div>
</template>
