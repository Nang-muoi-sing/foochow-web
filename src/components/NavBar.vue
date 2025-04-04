<template>
  <nav class="border-zinc-200 bg-white dark:bg-zinc-900 relative">
    <div
      class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4"
    >
      <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          class="h-8"
          alt="Flowbite Logo"
        />
        <span
          class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
          >Flowbite</span
        >
      </a>
      <button
        data-collapse-toggle="navbar-default"
        type="button"
        class="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-zinc-500 hover:bg-zinc-100 focus:ring-2 focus:ring-zinc-200 focus:outline-none md:hidden dark:text-zinc-400 dark:hover:bg-zinc-700 dark:focus:ring-zinc-600"
        aria-controls="navbar-default"
        aria-expanded="false"
      >
        <span class="sr-only">打开选单</span>
        <svg
          class="h-5 w-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>
      <div class="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul
          class="mt-4 flex flex-col rounded-lg border border-zinc-100 bg-zinc-50 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 rtl:space-x-reverse dark:border-zinc-700 dark:bg-zinc-800 md:dark:bg-zinc-900"
        >
          <li>
            <RouterLink
              :to="{ name: 'home' }"
              class="block rounded-sm px-3 py-2 text-zinc-900 hover:bg-zinc-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-zinc-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
              active-class="bg-blue-700 text-white md:bg-transparent md:text-blue-700 md:dark:text-blue-500"
              >主页</RouterLink
            >
          </li>
          <li>
            <RouterLink
              :to="{ name: 'resource' }"
              class="block rounded-sm px-3 py-2 text-zinc-900 hover:bg-zinc-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-zinc-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
              active-class="bg-blue-700 text-white md:bg-transparent md:text-blue-700 md:dark:text-blue-500"
              >资源</RouterLink
            >
          </li>
          <li>
            <RouterLink
              :to="{ name: 'donate' }"
              class="block rounded-sm px-3 py-2 text-zinc-900 hover:bg-zinc-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-zinc-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
              active-class="bg-blue-700 text-white md:bg-transparent md:text-blue-700 md:dark:text-blue-500"
              >捐赠</RouterLink
            >
          </li>
          <li>
            <RouterLink
              :to="{ name: 'about' }"
              class="block rounded-sm px-3 py-2 text-zinc-900 hover:bg-zinc-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-zinc-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
              active-class="bg-blue-700 text-white md:bg-transparent md:text-blue-700 md:dark:text-blue-500"
              >关于</RouterLink
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
// import { defineProps, onMounted, ref } from 'vue';

// const props = defineProps<{
//   activate?: string;
//   activateStyles?: Array<string>;
// }>();

// onMounted(() => {
//   if (props.activate && props.activateStyles) {
//     navButtons[props.activate];
//   }
// });
</script>
