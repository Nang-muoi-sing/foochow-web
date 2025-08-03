<template>
  <nav class="text-center" v-if="props.totalPage > 1">
    <ul class="text-rosybrown-800 inline-flex space-x-2 text-sm">
      <li class="">
        <RouterLink
          :to="{
            name: 'search',
            query: { ...route.query, page: props.curPage - 1 },
          }"
          class="text-rosybrown-600 flex h-8 w-8 items-center justify-center rounded-full leading-tight"
          :class="{
            'cursor-default opacity-50': props.curPage === 1,
            'hover:text-rosybrown-800': props.curPage > 1,
          }"
          :disabled="props.curPage === 1"
        >
          <i-material-symbols-arrow-back-ios-new-rounded />
        </RouterLink>
      </li>

      <template v-for="page in visiblePages" :key="page">
        <li
          v-if="page === '...'"
          class="flex h-8 cursor-default items-center justify-center px-2"
        >
          <span>…</span>
        </li>

        <li v-else>
          <RouterLink
            :to="{
              name: 'search',
              query: { ...route.query, page },
            }"
            class="flex h-8 w-8 items-center justify-center rounded-full leading-tight"
            :class="{
              'bg-rosybrown-800 text-wheat-50': page === props.curPage,
              'hover:bg-wheat-100': page !== props.curPage,
            }"
          >
            {{ page }}
          </RouterLink>
        </li>
      </template>

      <li>
        <RouterLink
          :to="{
            name: 'search',
            query: { ...route.query, page: props.curPage + 1 },
          }"
          class="text-rosybrown-600 flex h-8 w-8 items-center justify-center rounded-full leading-tight"
          :class="{
            'cursor-default opacity-50': props.curPage === props.totalPage,
            'hover:text-rosybrown-800': props.curPage < props.totalPage,
          }"
          :disabled="props.curPage === props.totalPage"
        >
          <i-material-symbols-arrow-forward-ios-rounded />
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { RouterLink } from 'vue-router';

const props = defineProps<{
  curPage: number;
  totalPage: number;
}>();

const maxSlot = 7;
const flatSlot = 5;
const route = useRoute();

const visiblePages = computed<(number | '...')[]>(() => {
  const { curPage, totalPage } = props;
  const pages: (number | '...')[] = [];

  // 显示所有页码
  if (totalPage <= maxSlot) {
    for (let i = 1; i <= totalPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  // 总是显示 1
  pages.push(1);
  if (curPage < maxSlot - 2) {
    for (let i = 2; i <= maxSlot; i++) {
      pages.push(i);
    }
    return pages;
  }

  // 折叠，显示以 curPage 为中心的 flatSlot
  pages.push('...');
  const end = Math.min(totalPage, curPage + (flatSlot - 1) / 2);
  const start = end - flatSlot + 1;
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});
</script>
