<template>
  <PageContent>
    <div
      class="bg-wheat-300 mb-5 w-fit rounded-lg px-2 py-1 text-xl text-white"
    >
      查询：{{ route.query.q ?? '' }}
    </div>
    <!-- {{ searchedResponse }} -->
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
            >{{ refMap[book] ?? '' }}</span
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

const apiUrl = import.meta.env.VITE_API_URL || '/';
const route = useRoute();
interface SearchResult {
  w: string;
  text: string;
  pron: string;
  brief: string;
  refs: string[];
}

interface SearchResponse {
  status: number;
  data: {
    q: string;
    currentPage: number;
    totalPage: number;
    totalResult: number;
    results: SearchResult[];
  };
}

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

const loading = ref(false);
// const error = ref(null);

const getSearchQuery = (): string => {
  const q = route.query.q;
  if (Array.isArray(q)) {
    return q[0] || '';
  }
  return typeof q === 'string' ? q : '';
};

watch(
  () => getSearchQuery(),
  async (newQuery) => {
    if (!newQuery) return;

    loading.value = true;
    try {
      const response = await fetch(
        `${apiUrl}/search?q=${encodeURIComponent(newQuery)}`
      );
      if (!response.ok) throw new Error('Response Error');
      searchedResponse.value = await response.json();
      console.log(searchedResponse.value);
    } catch (err) {
      console.error(err);
    } finally {
      loading.value = false;
    }
  },
  { immediate: true } // 初始加载时立即执行一次
);

const updateTitle = () => {
  document.title = route.query.q
    ? `${route.query.q} - 检索`
    : `米时典 SeeDict - 检索`;
};

onMounted(() => {
  updateTitle();
});

watch(() => route.query.q, updateTitle);

const refMap: Record<string, string> = {
  feng: '福州方言词典',
  cikling: '戚林八音校注',
  dfd: 'Dictionary of Foochow Dialect',
};
</script>
