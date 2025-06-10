<template>
  <div class="h-fit" @scroll.native="console.log('scroll')">
    <div class="bg-wheat-50 relative z-10 h-screen overflow-hidden shadow-2xl">
      <div class="fixed z-500 h-full w-full" :class="toggleDimmer"></div>
      <div class="flex flex-row-reverse px-16 py-8">
        <NavPanel class="w-xs"></NavPanel>
      </div>
      <div
        class="relative z-510 mx-auto mt-5 flex w-fit flex-col items-center space-y-8 text-center"
      >
        <div class="pl-10">
          <img src="../assets/logo-see.png" />
        </div>
        <SearchBar
          class="w-xs sm:w-sm md:w-md"
          :isHistoryVisible="isHistoryVisible"
          @click="isHistoryVisible = true"
          v-on-click-outside="
            () => {
              isHistoryVisible = false;
            }
          "
        ></SearchBar>
      </div>
      <MarqueeWords class="absolute -mt-[10vh]"></MarqueeWords>
    </div>
    <!-- <div class="relative z-5 -my-12 h-[220vh] overflow-hidden bg-[#efe9dc]">
      <div
        class="absolute h-[304vh] w-[120vw] -translate-x-[10vw] -translate-y-[20vh] rotate-6 bg-[url(./assets/bg-map.webp)] bg-cover bg-center opacity-50 brightness-110 saturate-40"
      ></div>
    </div> -->
    <!-- footer -->
    <!-- <div class="relative z-10 -mt-32 h-56 rounded-t-[48px] bg-zinc-700"></div> -->
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { vOnClickOutside } from '@vueuse/components';
import NavPanel from '../components/NavPanel.vue';
import SearchBar from '../components/SearchBar.vue';
import MarqueeWords from '../components/MarqueeWords.vue';

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
