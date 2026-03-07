<script setup lang="ts">
import HomeView from './views/HomeView.vue'
</script>

<template>
  <div id="app">
    <HomeView />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background-color: #f9fafb;
  color: #1f2937;
}

#app {
  width: 100%;
  height: 100%;
}
</style>
