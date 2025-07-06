<template>
  <nav class="flex flex-row items-center justify-between gap-5 px-16 py-8">
    <div class="hidden min-w-35 md:block">
      <img src="../assets/logo.png" />
    </div>
    <SearchBar class="w-xs sm:w-sm md:w-md"></SearchBar>
    <NavPanel class="hidden w-xs lg:flex"></NavPanel>
    <button
      class="text-rosybrown-600 hover:text-rosybrown-800 flex cursor-pointer items-center rounded-md p-2 focus:outline-none lg:hidden"
      @click="isSidebarOpen = true"
    >
      <span class="material-symbols-rounded w-fit" style="font-size: 36px"
        >menu</span
      >
    </button>
  </nav>

  <div
    class="fixed inset-0 z-500 flex lg:hidden"
    :class="{ hidden: !isSidebarOpen }"
  >
    <div
      class="fixed inset-0 backdrop-blur-xs backdrop-brightness-90 transition-all duration-500 ease-in-out"
      @click="isSidebarOpen = false"
    ></div>

    <div
      class="bg-wheat-50 absolute top-0 right-0 h-full w-full max-w-xs transform flex-col transition-transform duration-300 ease-in-out"
      :class="{
        'translate-x-full': !isSidebarOpen,
        'translate-x-0': isSidebarOpen,
      }"
    >
      <button
        class="text-rosybrown-600 hover:text-rosybrown-800 flex cursor-pointer items-center rounded-md p-2 focus:outline-none lg:hidden"
        @click="isSidebarOpen = false"
      >
        <span class="material-symbols-rounded w-fit" style="font-size: 36px"
          >menu</span
        >
      </button>

      <div
        class="flex w-full flex-col items-center justify-center px-2 py-4 font-sans text-lg"
      >
        <img class="mb-8" src="../assets/logo.png" draggable="false" />
        <div
          class="hover:bg-wheat-100 text-rosybrown-600 hover:text-rosybrown-800 m-1 w-full content-center rounded-xs px-3 py-1.5 align-middle font-bold transition-all ease-in-out"
        >
          <RouterLink :to="{ name: 'home' }" class="inline-flex w-full"
            ><span class="material-symbols-rounded w-fit">home</span
            >&ensp;主页</RouterLink
          >
        </div>
        <div
          class="hover:bg-wheat-100 text-rosybrown-600 hover:text-rosybrown-800 m-1 w-full content-center rounded-xs px-3 py-1.5 align-middle font-bold transition-all ease-in-out"
        >
          <a class="inline-flex w-full" href="#"
            ><span class="material-symbols-rounded w-fit">school</span
            >&ensp;入门</a
          >
        </div>
        <div
          class="hover:bg-wheat-100 text-rosybrown-600 hover:text-rosybrown-800 m-1 w-full content-center rounded-xs px-3 py-1.5 align-middle font-bold transition-all ease-in-out"
        >
          <a class="inline-flex w-full" href="#"
            ><span class="material-symbols-rounded w-fit">help</span
            >&ensp;帮助</a
          >
        </div>
        <div
          class="hover:bg-wheat-100 text-rosybrown-600 hover:text-rosybrown-800 m-1 w-full content-center rounded-xs px-3 py-1.5 align-middle font-bold transition-all ease-in-out"
        >
          <a class="inline-flex w-full" href="#"
            ><span class="material-symbols-rounded w-fit">crowdsource</span
            >&ensp;关于</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchBar from './SearchBar.vue';
import NavPanel from './NavPanel.vue';
import { ref } from 'vue';

// 控制侧边栏显示状态
const isSidebarOpen = ref(false);
</script>

<style scoped>
/* 侧边栏动画过渡效果 */
.sidebar-enter-from,
.sidebar-leave-to {
  transform: translateX(-100%);
}

.sidebar-enter-active,
.sidebar-leave-active {
  transition: transform 0.3s ease;
}
</style>
