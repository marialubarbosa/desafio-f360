
<script setup lang="ts">
import Header from '@/components/header/Header.vue'
import Sidebar from '@/components/sidebar/Sidebar.vue'

const emit = defineEmits(['add'])
</script>

<template>
  <div class="flex">
    <Sidebar />
    <main class="flex-1 p-2 md:p-6 bg-neutral-50 min-h-screen">
        <Header @add="() => emit('add')"/>
        <slot />
    </main>
  </div>

</template>
