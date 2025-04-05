<template>
  <div class="h-fit" @scroll.native="console.log('scroll')">
    <div
      class="relative z-10 h-screen overflow-hidden rounded-b-[48px] bg-[#f9f5f5] shadow-2xl"
    >
      <CircleAnimation
        class="relative top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block"
      ></CircleAnimation>
      <div class="fixed z-500 h-full w-full" :class="toggleDimmer"></div>

      <NavBar></NavBar>
      <div
        class="relative z-510 mx-auto mt-30 flex w-fit flex-col items-center space-y-8 text-center"
      >
        <h1 class="text-7xl font-black text-violet-700 md:text-8xl">Search!</h1>
        <SearchBar
          class="w-xs sm:w-md md:w-xl"
          :isHistoryVisible="isHistoryVisible"
          @click="isHistoryVisible = true"
          v-on-click-outside="
            () => {
              isHistoryVisible = false;
            }
          "
        ></SearchBar>
      </div>
    </div>
    <div class="relative z-5 -my-12 h-[220vh] overflow-hidden bg-[#efe9dc]">
      <div
        class="absolute h-[304vh] w-[120vw] -translate-x-[10vw] -translate-y-[20vh] rotate-6 bg-[url(./assets/bg-map.webp)] bg-cover bg-center opacity-50 brightness-110 saturate-40"
      ></div>
      <div class="relative mt-12 h-screen bg-white/10">
        <DailyCards></DailyCards>
      </div>
      <div class="relative h-screen border-t-2 border-t-red-500">
        <div class="flex flex-col items-center space-y-8 pt-20">
          <h2 class="font-slogan text-7xl text-zinc-800">
            送十主诉里汗朵良四肖再弓石犬示英
          </h2>
          <h3 class="font-slogan text-5xl">
            牙菜天步一旁住南河哥，直植爪北放巾
          </h3>
        </div>
        <div class="pt-40"><MarqueeCards></MarqueeCards></div>
      </div>
    </div>
    <div class="relative z-10 -mt-32 h-56 rounded-t-[48px] bg-zinc-700"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { vOnClickOutside } from '@vueuse/components';
import CircleAnimation from '../components/CircleAnimation.vue';
import NavBar from '../components/NavBar.vue';
import SearchBar from '../components/SearchBar.vue';
import MarqueeCards from '../components/MarqueeCards.vue';
import DailyCards from '../components/DailyCards.vue';

const isHistoryVisible = ref(false);

const handleScroll = () => {
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

<style scoped>
rt {
  font-weight: 800;
  letter-spacing: 0;
  font-size: xx-large;
  color: var(--color-sky-800);
}
</style>
