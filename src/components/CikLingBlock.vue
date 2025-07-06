<template>
  <div class="text-rosybrown-800 grid grid-cols-12 grid-rows-4 md:grid-rows-2">
    <div
      class="col-span-2 row-span-4 content-center text-3xl sm:text-4xl font-bold md:col-span-1 md:row-span-2"
    >
      {{ data.text }}
    </div>
    <div class="col-span-10 row-span-2 text-lg md:col-span-11 md:row-span-1">
      <SeeSymbol
        v-if="data.cikFinal"
        icon="戚书"
        icon-class="text-rosybrown-700"
      >
        {{ data.cikInitial }}<span class="text-wheat-400 mr-1 text-sm">聲</span
        >{{ data.cikFinal }}<span class="text-wheat-400 mr-1 text-sm">韻</span
        >{{ data.tone }}<span class="text-wheat-400 mr-3 text-sm">調</span
        ><template v-if="data.cikAnnotation"
          ><span class="text-wheat-400 inline-block w-full md:inline md:w-fit"
            >{{ data.cikAnnotation
            }}<Badge class="ml-1" v-if="data.liAnnotateCik"
              >{{ data.cikFinal }} {{ data.liAnnotateCikOrder }}</Badge
            ></span
          ></template
        >
      </SeeSymbol>
    </div>
    <div class="col-span-10 row-span-2 text-lg md:col-span-11 md:row-span-1">
      <SeeSymbol
        v-if="data.lingFinal"
        icon="林书"
        icon-class="text-rosybrown-700"
      >
        {{ data.lingInitial }}<span class="text-wheat-400 mr-1 text-sm">聲</span
        >{{ data.lingFinal }}<span class="text-wheat-400 mr-1 text-sm">韻</span
        >{{ data.tone }}<span class="text-wheat-400 mr-3 text-sm">調</span
        ><template v-if="data.lingAnnotation"
          ><span class="text-wheat-400 inline-block w-full md:inline md:w-fit"
            >{{ data.lingAnnotation
            }}<Badge class="ml-1 inline-block" v-if="data.liAnnotateLing"
              >{{ data.lingFinal }} {{ data.liAnnotateLingOrder }}</Badge
            ></span
          ></template
        >
      </SeeSymbol>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import SeeSymbol from './SeeSymbol.vue';
import Badge from './Badge.vue';
interface CikLingData {
  text: string;
  tone: string;
  cikFinal?: string;
  cikInitial?: string;
  cikAnnotation?: string;
  liAnnotateCik?: string;
  liAnnotateCikOrder?: number;
  lingFinal?: string;
  lingInitial?: string;
  lingAnnotation?: string;
  liAnnotateLing?: string;
  liAnnotateLingOrder?: number;
  comment?: string;
}

const props = defineProps<{
  data: CikLingData;
}>();
</script>
