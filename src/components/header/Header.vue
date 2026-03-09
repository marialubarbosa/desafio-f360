<script setup lang="ts">
import Button from '@/components/ui/Button.vue';

defineEmits(['add'])
</script>

<template>
    <div class="flex justify-between items-center mb-6">
        <h2 class="text-lg md:text-[24px] font-semibold">Dashboard</h2>
        <Button
            label="Nova Transação"
            icon="add"
            size="md"
            @click="$emit('add')"
        />
    </div>
</template>