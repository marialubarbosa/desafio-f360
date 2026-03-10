
<script setup lang="ts">
import Header from '@/components/header/Header.vue'
import Sidebar from '@/components/sidebar/Sidebar.vue'

defineProps<{
  title: string
}>()

const emit = defineEmits(['add'])

</script>

<template>
  <div class="flex min-h-screen bg-neutral-50">
    <Sidebar />
    <main class="flex-1 min-w-0 p-2 md:p-6 bg-neutral-50 min-h-screen">
        <Header :title="title" :useButton="title === 'Dashboard'" :buttonLabel="'Adicionar'" :buttonAction="() => emit('add')"/>
        <slot />
    </main>
  </div>

</template>
