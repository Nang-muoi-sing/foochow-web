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
        <img class="absolute h-1/3" src="../assets/water-color.svg" />
        <div class="relative flex flex-col px-6 py-12 md:px-16 md:py-16">
          <div class="flex items-baseline space-x-8">
            <h2 class="font-slogan text-6xl text-zinc-800 md:text-8xl">
              每日一词
            </h2>
            <h3
              class="font-slogan text-4xl text-red-500 md:text-5xl"
              style="text-shadow: 4px -4px 0 skyblue"
            >
              4月1日
            </h3>
          </div>
          <div
            class="px:12 flex flex-col space-y-4 py-16 md:space-y-8 lg:px-32"
          >
            <div>
              <ruby
                class="text-5xl font-bold break-all whitespace-normal text-zinc-800 md:text-6xl lg:text-7xl"
                style="ruby-align: center"
              >
                文<rp>(</rp><rt>ma<sup>21</sup></rt
                ><rp>)</rp>字<rp>(</rp><rt>lang<sup>21</sup></rt
                ><rp>)</rp>文<rp>(</rp><rt>sung<sup>53</sup></rt
                ><rp>)</rp>字<rp>(</rp><rt>ma<sup>21</sup></rt
                ><rp>)</rp>文<rp>(</rp><rt>lang<sup>21</sup></rt
                ><rp>)</rp>字<rp>(</rp><rt>sung<sup>53</sup></rt
                ><rp>)</rp>
              </ruby>
            </div>
            <p
              class="line-ellipsis text-xl leading-8 font-medium text-ellipsis text-zinc-800 md:text-2xl md:leading-10 lg:text-3xl lg:leading-12"
            >
              ○解释解释解释支斥給哭菜具戶眼乍足品假苗泉訴弓皮。○旦房占歡草豆冒首您林公中亭五屋手良書民葉；清丟足犬課麻弓止跑欠甲石尺胡見耍，做聽什怎穴貓者，地長就助林她山喜戶和用。
            </p>
            <button
              type="button"
              class="me-2 mb-2 flex w-fit flex-row items-center space-x-3 rounded-lg bg-blue-700 px-8 py-2 font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <span>查阅详情</span
              ><span class="material-symbols-rounded">arrow_right_alt</span>
            </button>
          </div>
        </div>
      </div>
      <div class="relative h-screen border-t-2 border-t-red-500">
        <div class="pt-56"></div>
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

/* .line-ellipsis {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
} */
</style>
