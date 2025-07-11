<template>
  <div class="text-rosybrown-800 mt-2 mb-5 rounded-lg bg-white px-8 py-6">
    <div class="items-baseline">
      <span class="text-rosybrown-800 mr-2 text-3xl font-bold sm:text-4xl">
        {{ props.data.text }}
      </span>
      <span class="text-rosybrown-500 text-xl">
        /{{ yngpingToIPA(props.data.pronLiteral) }}/<span
          class="font-serif font-bold"
          >→</span
        >/{{ yngpingToIPA(props.data.pronSandhi) }}/
      </span>
    </div>

    <ExplanationBlock
      :explanations="props.data.expls"
      :toggle-button="true"
    ></ExplanationBlock>
    <p v-if="props.data.comment">
      <SeeSymbol class="text-rosybrown-700">注释</SeeSymbol
      >{{ replaceChineseQuotes(props.data.comment) }}
    </p>
    <p class="text-rosybrown-200 mt-2 flex justify-end text-sm">
      {{
        props.data.refPage
          ? `冯爱珍. 1998. 福州方言词典. 南京: 江苏教育出版社. 第 ${props.data.refPage} 页.`
          : '冯爱珍. 1998. 福州方言词典. 南京: 江苏教育出版社.'
      }}
    </p>
    <template v-if="props.data.correction">
      <hr class="border-rosybrown-100 my-2 border-t-2" />
      <p>
        <SeeSymbol class="text-rosybrown-700">校注 </SeeSymbol
        >{{ props.data.correction }}
      </p>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { WordFeng } from '../utils/typing';
import { replaceChineseQuotes } from '../utils/typography';
import ExplanationBlock from './ExplanationBlock.vue';
import SeeSymbol from './SeeSymbol.vue';
import { yngpingToIPA } from '../utils/phonetics';

const props = defineProps<{
  data: WordFeng;
}>();
</script>
