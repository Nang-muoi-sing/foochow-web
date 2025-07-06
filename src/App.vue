<template>
  <RouterView />
</template>

<script setup lang="ts">
import { useSessionStorage } from '@vueuse/core';
import { initFlowbite } from 'flowbite';
import { onBeforeMount, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const redirect = useSessionStorage('redirect', '');

onBeforeMount(async () => {
  if (redirect.value) {
    await router.push(redirect.value);
    redirect.value = '';
  }
});
onMounted(() => {
  initFlowbite();
});
</script>

<style>
body {
  background-color: gainsboro;
}

html {
  scroll-behavior: smooth;
}
</style>
