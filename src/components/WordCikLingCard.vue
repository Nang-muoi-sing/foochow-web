<template>
  <div
    v-if="processedData?.length > 0"
    class="mt-2 mb-5 rounded-lg bg-white px-8 py-6"
  >
    <div class="mb-2 space-y-2">
      <WordCikLingEntry
        v-for="(cikling, index) in processedData"
        :data="cikling"
        :key="index"
      ></WordCikLingEntry>
    </div>
    <div class="text-rosybrown-800 space-y-1">
      <template v-for="(cikling, index) in processedData" :key="index"
        ><p v-if="cikling.liAnnotateCikOrder">
          <Badge>{{ cikling.cikFinal }} {{ cikling.liAnnotateCikOrder }}</Badge
          >{{ cikling.liAnnotateCik }}
        </p>
        <p v-if="cikling.liAnnotateLingOrder">
          <Badge
            >{{ cikling.lingFinal }} {{ cikling.liAnnotateLingOrder }}</Badge
          >{{ cikling.liAnnotateLing }}
        </p>
      </template>
    </div>

    <p class="text-rosybrown-200 mt-2 flex justify-end text-sm">
      李如龙. 2001. 戚林八音校注. 福州: 福建人民出版社.
    </p>
    <template v-if="props.isCommentedCikLing">
      <hr class="border-rosybrown-100 my-2 border-t-2" />
      <div class="text-rosybrown-800 space-y-1">
        <template v-for="(cikling, index) in processedData" :key="index"
          ><p v-if="cikling.comment">
            <SeeSymbol class="text-rosybrown-700">校注</SeeSymbol
            >{{ cikling.comment }}
          </p>
        </template>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { toneCikLingMap } from '../utils/mapping';
import type { WordCikLing } from '../utils/typing';
import Badge from './Badge.vue';
import SeeSymbol from './SeeSymbol.vue';
import WordCikLingEntry from './WordCikLingEntry.vue';

const props = defineProps<{
  data: WordCikLing[];
  isCommentedCikLing: boolean;
}>();

const processedData = computed(() => {
  return props.data.map((item) => {
    const tone = toneCikLingMap[item.tone];
    const cikAnnotation =
      item.cikAnnotation == '' ? '' : removeNumber(item.cikAnnotation);
    const lingAnnotation =
      item.lingAnnotation == '' ? '' : removeNumber(item.lingAnnotation);

    return {
      ...item,
      tone,
      cikAnnotation,
      lingAnnotation,
    };
  });
});

const removeNumber = (str: string) => {
  return str.replace(/\d+$/, '').trim();
};
</script>
