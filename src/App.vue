<template>
  <RouterView />
</template>

<script setup lang="ts">
import { initFlowbite } from 'flowbite';
import { onMounted } from 'vue';

onMounted(() => {
  initFlowbite();
});
</script>

<style>
html {
  scroll-behavior: smooth;
}
</style>
