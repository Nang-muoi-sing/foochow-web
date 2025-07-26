<template>
  <SideBar v-show="!loading" class="hidden 2xl:block"></SideBar>
  <PageContent>
    <!-- {{ wordResponse }} -->
    <WordSkeleton v-if="loading"></WordSkeleton>
    <template v-else>
      <div class="bg-wheat-100 mt-5 mb-8 rounded-lg px-8 py-6">
        <div
          class="ruby-container text-rosybrown-800 text-4xl font-bold break-all whitespace-normal md:text-5xl"
        >
          <ruby
            v-html="
              makeYngpingRubyInner(
                wordResponse.data.result.seedict.text,
                wordResponse.data.result.seedict.pronPrimary,
                'text-rosybrown-700'
              )
            "
            style="ruby-align: center"
          >
          </ruby>
        </div>
      </div>

      <template v-if="wordResponse.data.result.seedict.expls.length > 0">
        <Subtitle text="本站释义"></Subtitle>
        <div class="text-rosybrown-800 mt-2 mb-5 rounded-lg bg-white px-8 py-6">
          <Explanations
            :data="wordResponse.data.result.seedict.expls"
          ></Explanations>
          <p v-if="wordResponse.data.result.seedict.commentExpl">
            <SeeSymbol class="text-rosybrown-700">注释</SeeSymbol
            >{{ wordResponse.data.result.seedict.commentExpl }}
          </p>
          <template
            v-if="
              wordResponse.data.result.seedict.synonym ||
              wordResponse.data.result.seedict.antonym
            "
          >
            <hr class="border-rosybrown-100 my-2 border-t-2" />
            <div class="space-y-1">
              <p v-if="wordResponse.data.result.seedict.synonym">
                <SeeSymbol class="text-rosybrown-700">近义词</SeeSymbol
                >{{ wordResponse.data.result.seedict.synonym }}
              </p>
              <p v-if="wordResponse.data.result.seedict.antonym">
                <SeeSymbol class="text-rosybrown-700">反义词</SeeSymbol
                >{{ wordResponse.data.result.seedict.antonym }}
              </p>
            </div>
          </template>
        </div>
      </template>

      <template
        v-if="
          wordResponse.data.result.fengs.length > 0 ||
          wordResponse.data.result.ciklings.length > 0
        "
      >
        <Subtitle text="辞书释义"></Subtitle>
        <WordFengBlock
          v-if="wordResponse.data.result.fengs.length > 0"
          v-for="(feng, index) in wordResponse.data.result.fengs"
          :data="feng"
          :key="index"
        ></WordFengBlock>

        <WordCikLingCard
          :data="wordResponse.data.result.ciklings"
          :isCommentedCikLing="isCommentedCikLing"
        ></WordCikLingCard>
      </template>

      <template v-if="wordResponse.data.result.seedict.prons.length > 0">
        <Subtitle text="各地方音"></Subtitle>
        <div
          class="text-rosybrown-800 mt-2 mb-5 overflow-hidden rounded-lg bg-white"
        >
          <table class="w-full border-collapse">
            <thead class="bg-rosybrown-300 text-center">
              <tr>
                <th class="py-1 text-white">读音</th>
                <th class="py-1 text-white">连读</th>
                <th class="py-1 text-white">地区</th>
                <!-- <th class="hidden py-1 text-white md:block">来源</th> -->
              </tr>
            </thead>
            <tbody class="text-center">
              <tr
                v-for="(pron, index) in wordResponse.data.result.seedict.prons"
                :key="index"
              >
                <td class="py-1.5">{{ yngpingToIPA(pron.pron) }}</td>
                <td class="flex items-center justify-center py-2 md:hidden">
                  <Badge v-if="pron.isSandhi">连</Badge>
                  <Badge v-else>本</Badge>
                </td>
                <td class="hidden items-center justify-center py-2 md:flex">
                  <Badge v-if="pron.isSandhi">连读音</Badge>
                  <Badge v-else>本字音</Badge>
                </td>
                <td class="py-1.5">
                  {{ pron.location == '' ? '市区' : pron.location }}
                </td>
                <!-- <td class="hidden py-1.5 md:block">
                  {{ sourceQuoteMap[pron.source] }}
                </td> -->
              </tr>
            </tbody>
          </table>

          <div
            class="px-8 pb-6"
            v-if="wordResponse.data.result.seedict.commentPron"
          >
            <hr class="border-rosybrown-100 my-2 border-t-2" />
            <p>
              <SeeSymbol class="text-rosybrown-700">注释 </SeeSymbol
              >{{ wordResponse.data.result.seedict.commentPron }}
            </p>
          </div>
        </div>
      </template>

      <template v-if="wordResponse.data.result.seedict.phonetics">
        <Subtitle text="注音一览"></Subtitle>
        <WordPhoneticCard
          :data="wordResponse.data.result.seedict.phonetics"
        ></WordPhoneticCard>
      </template>

      <template v-if="wordResponse.data.result.seedict.glyphs.length > 0">
        <Subtitle text="用字一览"></Subtitle>
        <div
          class="text-rosybrown-800 mt-2 mb-5 overflow-hidden rounded-lg bg-white"
        >
          <table class="w-full border-collapse">
            <thead class="bg-rosybrown-300 text-center">
              <tr>
                <th class="py-1 text-white">用字</th>
                <th class="py-1 text-white">类别</th>
                <!-- <th class="py-1 text-white">来源</th> -->
              </tr>
            </thead>
            <tbody class="text-center">
              <tr
                v-for="(glyph, index) in wordResponse.data.result.seedict
                  .glyphs"
                :key="index"
              >
                <td class="py-1.5">{{ glyph.glyph }}</td>
                <td class="flex items-center justify-center py-2">
                  <Badge v-if="glyph.category == '本字'">本字</Badge>
                  <Badge v-else :content="glyph.category">俗字</Badge>
                </td>
                <!-- <td class="py-1.5">{{ glyph.source }}</td> -->
              </tr>
            </tbody>
          </table>

          <div
            class="px-8 pb-6"
            v-if="wordResponse.data.result.seedict.commentGlyph"
          >
            <hr class="border-rosybrown-100 my-2 border-t-2" />
            <p>
              <SeeSymbol class="text-rosybrown-700">注释</SeeSymbol>
              {{ wordResponse.data.result.seedict.commentGlyph }}
            </p>
          </div>
        </div>
      </template></template
    >
  </PageContent>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Badge from '../components/Badge.vue';
import Explanations from '../components/Explanations.vue';
import PageContent from '../components/PageContent.vue';
import SeeSymbol from '../components/SeeSymbol.vue';
import SideBar from '../components/SideBar.vue';
import Subtitle from '../components/Subtitle.vue';
import WordCikLingCard from '../components/WordCikLingCard.vue';
import WordFengBlock from '../components/WordFengCard.vue';
import WordPhoneticCard from '../components/WordPhoneticCard.vue';
import { yngpingToIPA, makeYngpingRubyInner } from '../utils/phonetics';
import type { WordResponse, WordSeeDict } from '../utils/typing';
import WordSkeleton from '../components/WordSkeleton.vue';

const apiUrl = import.meta.env.VITE_API_URL || '/';
const route = useRoute();
const w = ref(route.query.w as string);
const loading = ref(false);
const wordResponse = ref<WordResponse>({
  status: 0,
  data: {
    w: '',
    result: {
      seedict: {
        text: '',
        glyphs: [],
        pronPrimary: '',
        prons: [],
        phonetics: { yngping: '' },
        expls: [],
      } as WordSeeDict,
      fengs: [],
      ciklings: [],
    },
  },
});

const updateTitle = () => {
  document.title = wordResponse.value.data?.result?.seedict?.text
    ? `${wordResponse.value.data.result.seedict.text} - 词汇`
    : '米时典 SeeDict - 词汇';
};

const fetchWordResponse = async () => {
  loading.value = true;
  try {
    const response = await fetch(
      `${apiUrl}/word?w=${encodeURIComponent(w.value)}`
    );
    if (!response.ok) throw new Error('Response Error');
    wordResponse.value = await response.json();
    updateTitle();
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

watch(
  () => route.query.w,
  (newWord) => {
    if (!newWord) return;
    w.value = newWord as string;
    fetchWordResponse();
  },
  { immediate: true }
);

const isCommentedCikLing = computed(() => {
  return wordResponse.value.data.result.ciklings.some(
    (entry) => entry.comment?.trim() !== ''
  );
});
</script>
