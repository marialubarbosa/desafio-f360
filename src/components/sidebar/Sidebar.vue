<script setup lang="ts">
</script>

<template>
  <aside class="w-64 bg-neutral-50 border-r border-neutral-200 h-screen flex flex-col p-6">
    <div class="mb-8 flex items-center gap-4">
      <div class="w-12 h-12 rounded-full flex items-center justify-center !bg-primary" >
        <span class="material-symbols-outlined text-white text-2xl">account_balance_wallet</span>
      </div>
      <div>
        <h1 class="mt-2 text-lg font-bold text-neutral-900">Finanças</h1>
        <p class="text-sm text-neutral-500">Gestão Financeira</p>
      </div>

    </div>

    <nav class="flex-1">
      <ul class="space-y-2">
        <li class="!bg-primary-surface rounded-full" >
          <a href="" class="flex items-center gap-3 px-4 py-2 rounded-full !bg-quaternary !text-primary" >
            <span class="material-symbols-outlined text-lg text-primary">home</span>
            <span class="font-medium text-primary">Início</span>
          </a>
        </li>
      </ul>
    </nav>
  </aside>
</template>
