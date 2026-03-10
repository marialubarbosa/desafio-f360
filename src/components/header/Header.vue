<script setup lang="ts">
import Button from '@/components/ui/Button.vue';
import { useUIStore } from '@/stores/uiStore'
import { computed } from 'vue';

const ui = useUIStore()
const windowWidth = computed(() => window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);

const props = defineProps<{
  title: string
  useButton?: boolean
  buttonLabel?: string
  buttonAction?: () => void
}>()

defineEmits(['add'])


</script>

<template>

    <div class="flex justify-between items-center mb-6">
        <div class="flex items-center">
            <div class="w-12 h-12 rounded-r-full flex items-center justify-center !bg-primary cursor-pointer z-50 mr-3"  
            :style="{ 
                marginLeft: windowWidth > 767 && windowWidth <= 1023
                ? (ui.sidebarOpen ? '232px'  : '-24px') 
                : windowWidth > 1023 ? '-24px': (ui.sidebarOpen ? '247px' : '-9px') }" 
                @click="ui.toggleSidebar()">
                <span class="material-symbols-outlined text-white text-2xl">
                    {{ ui.sidebarOpen ? "menu_open" : "dehaze" }}
                </span>
            </div>
            <h2 class="text-lg md:text-[24px] font-semibold">{{ title }}</h2>
        </div>
        <Button
            v-if="useButton"
            :label="buttonLabel"
            icon="add"
            size="md"
            @click="buttonAction"
        />
    </div>
</template>