<template>
  <!-- <p>
    <strong>Current route path:</strong> {{ $route.fullPath }}
  </p> -->
  <RouterView />
</template>

<script setup lang="ts">
import { initFlowbite } from 'flowbite';
import { onMounted } from 'vue';
// import HomeView from './views/HomeView.vue';
// import DailyCards from './components/DailyCards.vue';
// import NavBar from './components/NavBar.vue';
onMounted(() => {
  initFlowbite();
});
</script>

<style>
body {
  background-color: gainsboro;
}
</style>
