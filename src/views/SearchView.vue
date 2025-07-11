<template>
  <PageContent>
    <div
      class="bg-wheat-300 mb-5 w-fit rounded-lg px-2 py-1 text-xl text-white"
    >
      查询：{{ route.query.q ?? '' }}
    </div>
    <RouterLink
      class="block"
      v-for="result in searchedResponse.data.results"
      :to="{ name: 'word', query: { w: result.w } }"
      :key="result.w"
    >
      <div class="bg-wheat-100 my-5 px-5 py-4">
        <div class="text-wheat-500 flex flex-wrap justify-end gap-2 text-sm">
          <span v-for="book in result.refs" class="flex w-fit items-center"
            ><span
              class="material-symbols-rounded w-fit"
              style="font-size: 20px"
              >book_2</span
            >{{ sourceMap[book] ?? '' }}</span
          >
        </div>
        <div
          class="ruby-container text-rosybrown-800 xxl:text-4xl text-3xl font-bold break-all whitespace-normal"
        >
          <ruby
            v-html="
              makeYngpingRubyInner(
                result.text,
                result.pron,
                'text-rosybrown-700'
              )
            "
            style="ruby-align: center"
          >
          </ruby>
        </div>
        <p class="text-wheat-600 mt-2">{{ result.brief }}</p>
      </div></RouterLink
    >
  </PageContent>
</template>

<script setup lang="ts">
import { watch, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import PageContent from '../components/PageContent.vue';
import { makeYngpingRubyInner } from '../utils/typography';
import type { SearchResponse } from '../utils/typing';
import { sourceMap } from '../utils/mapping';

const apiUrl = import.meta.env.VITE_API_URL || '/';
const route = useRoute();

const loading = ref(false);
const q = ref(route.query.q as string);
const searchedResponse = ref<SearchResponse>({
  status: 0,
  data: {
    q: '',
    currentPage: 0,
    totalPage: 0,
    totalResult: 0,
    results: [],
  },
});

const updateTitle = () => {
  document.title = route.query.q
    ? `${route.query.q} - 检索`
    : `米时典 SeeDict - 检索`;
};

const fetchSearchResponse = async () => {
  loading.value = true;
  try {
    const response = await fetch(
      `${apiUrl}/search?q=${encodeURIComponent(q.value)}`
    );
    if (!response.ok) throw new Error('Response Error');
    searchedResponse.value = await response.json();
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

watch(
  () => route.query.q,
  (newQuery) => {
    if (!newQuery) return;
    q.value = newQuery as string;
    fetchSearchResponse();
  },
  { immediate: true } // 初始加载时立即执行一次
);

onMounted(() => {
  updateTitle();
});

watch(() => route.query.q, updateTitle);
</script>
