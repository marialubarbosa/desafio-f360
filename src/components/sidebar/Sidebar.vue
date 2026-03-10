<script setup lang="ts">
import { useUIStore } from '@/stores/uiStore'
import { storeToRefs } from 'pinia'

const ui = useUIStore()
const { sidebarOpen } = storeToRefs(ui)

const onItemClick = () => {
  if (window.innerWidth < 1028) {
    ui.closeSidebar()
  }
}
</script>

<template>
  <aside
    v-show="sidebarOpen"
    :class="[
      'h-full bg-neutral-50 border-r border-neutral-200 flex flex-col p-6 transition-all duration-300 overflow-hidden',
      'fixed lg:static top-0 left-0 z-40',
      sidebarOpen ? 'translate-x-0 lg:translate-x-0' : '-translate-x-full lg:translate-x-0'
    ]"
    :style="{ width: sidebarOpen ? '256px' : '0px' }"
  >
    <!-- HEADER -->
    <div class="mb-8 flex items-center gap-4">
      <div class="w-12 h-12 rounded-full flex items-center justify-center !bg-primary">
        <span class="material-symbols-outlined text-white text-xl">account_balance_wallet</span>
      </div>

      <div v-show="sidebarOpen">
        <h1 class="text-lg font-bold text-neutral-900">Finanças</h1>
        <p class="text-sm text-neutral-500">Gestão Financeira</p>
      </div>
    </div>

    <!-- MENU -->
    <nav class="flex-1">
      <ul class="space-y-2">

        <li>
          <RouterLink
            to="/"
            @click="onItemClick"
            class="flex items-center gap-3 px-4 py-2 rounded-full hover:bg-neutral-200"
            active-class="!bg-quaternary !text-primary"
          >
            <span class="material-symbols-outlined text-lg">home</span>
            <span class="font-medium">Início</span>
          </RouterLink>
        </li>

        <li>
          <RouterLink
            to="/statistics"
            @click="onItemClick"
            class="flex items-center gap-3 px-4 py-2 rounded-full hover:bg-neutral-200"
            active-class="!bg-quaternary !text-primary"
          >
            <span class="material-symbols-outlined text-lg">equalizer</span>
            <span class="font-medium">Estatísticas</span>
          </RouterLink>
        </li>

      </ul>
    </nav>
  </aside>
</template>