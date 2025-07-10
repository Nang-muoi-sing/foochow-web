<template>
  <div
    v-if="props.data?.length > 0"
    class="mt-2 mb-5 rounded-lg bg-white px-8 py-6"
  >
    <div class="mb-2 space-y-2">
      <WordCikLingEntry
        v-for="(cikling, index) in props.data"
        :data="cikling"
        :key="index"
      ></WordCikLingEntry>
    </div>
    <div class="text-rosybrown-800 space-y-1">
      <template v-for="(cikling, index) in props.data" :key="index"
        ><p>
          <Badge
            v-if="cikling.liAnnotateCikOrder"
            :content="cikling.liAnnotateCik"
            :data="cikling"
            >{{ cikling.cikFinal }} {{ cikling.liAnnotateCikOrder }}</Badge
          >
        </p>
        <p>
          <Badge
            v-if="cikling.liAnnotateLingOrder"
            :content="cikling.liAnnotateLing"
            :data="cikling"
            >{{ cikling.lingFinal }} {{ cikling.liAnnotateLingOrder }}</Badge
          >
        </p>
      </template>
    </div>

    <p class="text-rosybrown-200 mt-2 flex justify-end text-sm">
      李如龙. 2001. 戚林八音校注. 福州: 福建人民出版社.
    </p>
    <template v-if="props.isCommentedCikLing">
      <hr class="border-rosybrown-100 my-2 border-t-2" />
      <div class="text-rosybrown-800 space-y-1">
        <template v-for="(cikling, index) in props.data" :key="index">
          <SeeSymbol
            v-if="cikling.comment"
            icon="注释"
            icon-class="text-rosybrown-700"
            >{{ cikling.comment }}</SeeSymbol
          >
        </template>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { WordCikLing } from '../utils/typing';
import Badge from './Badge.vue';
import SeeSymbol from './SeeSymbol.vue';
import WordCikLingEntry from './WordCikLingEntry.vue';
import { toneCikLingMap } from '../utils/model';

const props = defineProps<{
  data: WordCikLing[];
  isCommentedCikLing: boolean;
}>();
</script>
