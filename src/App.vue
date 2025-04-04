<template>
  <!-- <h1>Hello App!</h1>
  <p>
    <strong>Current route path:</strong> {{ $route.fullPath }}
  </p>
  <nav>
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/about">Go to About</RouterLink>
  </nav> -->
  <!-- <HomeView></HomeView> -->
  <!-- <NavBar></NavBar> -->
  <RouterView />
</template>

<script setup lang="ts">
import { initFlowbite } from 'flowbite';
import { onMounted } from 'vue';
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
