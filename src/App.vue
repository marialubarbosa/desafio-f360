<script setup lang="ts">
import { ref } from 'vue';
import DashboardView from '@views/Dashboard/DashboardView.vue';
import DefaultLayout from '@layouts/DefaultLayout.vue';

const dashboardView = ref();

function openModalAdd() {
  dashboardView.value?.openAddModal();
}
</script>


<template>
  <DefaultLayout @add="openModalAdd">
    <DashboardView ref="dashboardView"/>
  </DefaultLayout>
</template>

<style></style>
