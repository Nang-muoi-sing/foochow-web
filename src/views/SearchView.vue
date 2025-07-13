<template>
  <PageContent>
    <SearchSkeleton v-if="loading"></SearchSkeleton>
    <template v-else>
      <div
        class="bg-wheat-300 mb-2.5 w-fit rounded-lg px-2 py-1 text-xl text-white"
      >
        查询：{{ state.q }}
      </div>
      <span class="text-rosybrown-600 mb-2 px-2 text-sm">
        {{
          searchedResponse.data.totalResult
            ? `共 ${searchedResponse.data.totalResult} 个相关结果`
            : '没有找到相关结果'
        }}
      </span>
      <RouterLink
        class="block"
        v-for="result in searchedResponse.data.results"
        :to="{ name: 'word', query: { w: result.w } }"
        :key="result.w"
      >
        <div class="bg-wheat-100 my-5 px-5 py-4">
          <div class="text-wheat-500 flex flex-wrap justify-end gap-2 text-sm">
            <span
              class="flex items-center"
              v-if="result.refs?.length == 0 && !result.brief"
              ><i-material-symbols-contact-support-rounded
                style="font-size: 16px"
              />
              暂未释义</span
            >

            <span
              class="flex items-center"
              v-else
              v-for="(book, index) in result.refs"
              :key="index"
              ><i-material-symbols-book-2-rounded style="font-size: 16px" />
              {{ sourceMap[book] ?? '' }}</span
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
          <p class="text-wheat-600 mt-2">
            {{ replaceChineseQuotes(toggleGlyph(result.brief)) }}
          </p>
        </div></RouterLink
      >

      <Pagination
        :cur-page="searchedResponse.data.currentPage"
        :total-page="searchedResponse.data.totalPage"
      ></Pagination>
    </template>
  </PageContent>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PageContent from '../components/PageContent.vue';
import Pagination from '../components/Pagination.vue';
import { sourceMap } from '../utils/mapping';
import type { SearchResponse } from '../utils/typing';
import { makeYngpingRubyInner } from '../utils/typography';
import SearchSkeleton from '../components/SearchSkeleton.vue';
import { toggleGlyph, replaceChineseQuotes } from '../utils/typography';

const route = useRoute();
const router = useRouter();

const loading = ref(false);
const state = ref({
  q: (route.query.q as string) || '',
  page: parseInt((route.query.page as string) || '1', 10),
});
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
    const params = new URLSearchParams();
    params.append('q', state.value.q);
    if (state.value.page > 1)
      params.append('page', state.value.page.toString());

    const url = `${import.meta.env.VITE_API_URL || '/'}/search?${params}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP错误: ${response.status}`);
    }

    const data = (await response.json()) as SearchResponse;
    searchedResponse.value = data;

    if (state.value.page > 1 && data.data.totalResult === 0) {
      state.value.page = 1;
      router.push({ query: { q: state.value.q, page: 1 } });
    }
  } catch (error) {
    console.error('搜索请求失败:', error);
  } finally {
    loading.value = false;
  }
};

watch(
  [() => route.query.q, () => route.query.page],
  ([newQ, newPage]) => {
    if (typeof newQ === 'string') state.value.q = newQ;

    let newPageSate = 1;
    if (typeof newPage === 'string') {
      const pageNum = parseInt(newPage, 10);
      if (!isNaN(pageNum) && pageNum > 0) {
        newPageSate = pageNum;
      }
    }
    state.value.page = newPageSate;
    if (state.value.q) {
      fetchSearchResponse();
    }
  },
  { immediate: true }
);

onMounted(() => {
  updateTitle();
});

watch(() => route.query.q, updateTitle);
</script>
