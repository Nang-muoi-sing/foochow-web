<template>
  <div class="h-fit" @scroll.native="console.log('scroll')">
    <div class="bg-wheat-50 relative z-10 h-screen overflow-hidden">
      <div class="fixed z-500 h-full w-full" :class="toggleDimmer"></div>
      <div class="flex justify-center px-16 py-8 md:justify-end">
        <NavPanel
          class="z-510 w-xs relative"
        ></NavPanel>
      </div>
      <div
        class="relative z-510 mx-auto mt-5 flex w-fit flex-col items-center space-y-8 text-center"
      >
        <div
          class="pl-10"
          :style="{
            transform: `translateY(-${Math.min(scrollY * 1, 200)}px)`,
            opacity: Math.max(0, 1 - scrollY / 500),
          }"
        >
          <img src="../assets/logo-see.png" />
        </div>
        <SearchBar
          class="relative w-xs sm:w-sm md:w-md"
          :isHistoryVisible="isHistoryVisible"
          @click="isHistoryVisible = true"
          v-on-click-outside="
            () => {
              isHistoryVisible = false;
            }
          "
        ></SearchBar>
      </div>
      <FloatingImages class="absolute top-0 hidden md:block"></FloatingImages>
    </div>
    <div class="bg-wheat-100 relative z-5 h-[100vh] overflow-hidden">
      <WordsDeck></WordsDeck>
    </div>
    <Footer class="relative z-10 -mt-[10vh]"></Footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { vOnClickOutside } from '@vueuse/components';
import NavPanel from '../components/NavPanel.vue';
import SearchBar from '../components/SearchBar.vue';
import FloatingImages from '../components/FloatingImages.vue';
import Footer from '../components/Footer.vue';
import WordsDeck from '../components/WordsDeck.vue';

const scrollY = ref(0);
const searchBarFixed = ref(false);
const navPanelFixed = ref(false);
const isHistoryVisible = ref(false);

const handleScroll = () => {
  scrollY.value = window.scrollY;
  searchBarFixed.value = scrollY.value > 200;
  navPanelFixed.value = scrollY.value > 300;

  isHistoryVisible.value = false;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});

const toggleDimmer = computed(() => {
  return isHistoryVisible.value
    ? ['backdrop-blur-xs', 'backdrop-brightness-90']
    : ['hidden'];
});
</script>
