<template>
  <PageContent>
    <div
      class="bg-wheat-300 mb-5 w-fit rounded-lg px-2 py-1 text-xl text-white"
    >
      查询：{{ route.query.word ?? '' }}
    </div>

    <router-link
      class="block"
      :to="{ name: 'word', query: { id: card.id } }"
      v-for="card in processedCards"
      :key="card.id"
    >
      <div class="bg-wheat-100 my-5 px-5 py-4">
        <div class="text-wheat-500 flex flex-wrap justify-end gap-2 text-sm">
          <span v-for="ref in card.refsSorted" class="flex w-fit items-center"
            ><span
              class="material-symbols-rounded w-fit"
              style="font-size: 20px"
              >book_2</span
            >{{ refMap[ref] ?? '' }}</span
          >
        </div>
        <div
          class="ruby-container text-rosybrown-800 text-4xl font-bold break-all whitespace-normal"
        >
          <ruby
            v-html="
              makeYngpingRubyInner(card.text, card.pron, 'text-rosybrown-700')
            "
            style="ruby-align: center"
          >
          </ruby>
        </div>
        <p class="text-wheat-600">{{ card.brief }}</p>
      </div></router-link
    >
  </PageContent>
</template>

<script setup lang="ts">
import { computed, onBeforeUpdate, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import PageContent from '../components/PageContent.vue';
import { makeYngpingRubyInner } from '../utils/typography';

const route = useRoute();

onMounted(() => {
  document.title = route.query.word
    ? `${route.query.word} - 检索`
    : `米时典 SeeDict - 检索`;
});

onBeforeUpdate(() => {
  document.title = route.query.word
    ? `${route.query.word} - 检索`
    : `米时典 SeeDict - 检索`;
});

const refMap: Record<string, string> = {
  cikling: '戚林八音校注',
  feng: '福州方言词典',
  dfd: 'Dictionary of Foochow Dialect',
};

const processedCards = computed(() => {
  return searchedCards.cards.map((card) => ({
    ...card,
    refsSorted: [...card.refs].sort(),
  }));
});

const searchedCards = {
  currentPage: 2,
  totalPage: 10,
  cards: [
    {
      id: 'vfde4',
      text: '餅',
      pron: 'bing33',
      brief: '1. 烤熟或蒸熟的麵食，形狀大多扁而圓。2. 形體像餅的東西。',
      refs: ['cikling', 'feng'],
    },
    {
      id: '32fde4',
      text: '餅',
      pron: 'bing33',
      brief: '1. 烤熟或蒸熟的麵食，形狀大多扁而圓。2. 形體像餅的東西。',
      refs: ['cikling', 'dfd'],
    },
    {
      id: 'vfht4',
      text: '餅',
      pron: 'bing33',
      brief: '1. 烤熟或蒸熟的麵食，形狀大多扁而圓。2. 形體像餅的東西。',
      refs: ['cikling', 'feng'],
    },
    {
      id: 'vfrtr',
      text: '餅',
      pron: 'bing33',
      brief: '1. 烤熟或蒸熟的麵食，形狀大多扁而圓。2. 形體像餅的東西。',
      refs: ['feng', 'cikling'],
    },
    {
      id: '434fh',
      text: '餅',
      pron: 'bing33',
      brief: '1. 烤熟或蒸熟的麵食，形狀大多扁而圓。2. 形體像餅的東西。',
      refs: ['dfd'],
    },
    {
      id: 'dsdq',
      text: '餅',
      pron: 'bing33',
      brief: '1. 烤熟或蒸熟的麵食，形狀大多扁而圓。2. 形體像餅的東西。',
      refs: ['feng', 'cikling'],
    },
  ],
};
</script>
