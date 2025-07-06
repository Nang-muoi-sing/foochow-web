<template>
  <div class="bg-wheat-50 relative z-10 h-screen overflow-hidden">
    <div class="flex justify-center px-4 py-8 md:justify-end md:px-16">
      <NavPanel class="relative z-100 w-xs"></NavPanel>
    </div>
    <div
      class="relative mx-auto mt-5 flex w-fit flex-col items-center space-y-8 text-center"
    >
      <RouterLink
        :to="{ name: 'home' }"
        class="z-100 block pl-10"
        :style="{
          transform: `translateY(-${Math.min(scrollY * 1, 200)}px)`,
          opacity: Math.max(0, 1 - scrollY / 500),
        }"
      >
        <img src="../assets/logo-see.png" />
      </RouterLink>
      <SearchBar class="relative w-xs sm:w-sm md:w-md"></SearchBar>
    </div>
    <FloatingImages class="absolute top-0 hidden md:block"></FloatingImages>
  </div>
  <div class="bg-wheat-100 relative z-5 h-[100vh] overflow-hidden">
    <WordsDeck></WordsDeck>
  </div>
  <Footer class="relative z-10 -mt-[10vh]"></Footer>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

import NavPanel from '../components/NavPanel.vue';
import SearchBar from '../components/SearchBar.vue';
import FloatingImages from '../components/FloatingImages.vue';
import Footer from '../components/Footer.vue';
import WordsDeck from '../components/WordsDeck.vue';

const scrollY = ref(0);
const searchBarFixed = ref(false);
const navPanelFixed = ref(false);

const handleScroll = () => {
  scrollY.value = window.scrollY;
  searchBarFixed.value = scrollY.value > 200;
  navPanelFixed.value = scrollY.value > 300;
};

onMounted(() => {
  document.title = "米时典 SeeDict"
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
