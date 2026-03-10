<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import DefaultLayout from '@layouts/DefaultLayout.vue';

const route = useRoute();
const dashboardView = ref();

function openModalAdd() {
  dashboardView.value?.openAddModal();
}
</script>


<template>
  <DefaultLayout :title="route.name === 'Dashboard' ? 'Dashboard' : 'Visão Geral'" @add="openModalAdd">
    <router-view ref="dashboardView"></router-view>
  </DefaultLayout>
</template>

<style></style>
