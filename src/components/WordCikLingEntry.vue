<template>
  <div class="text-rosybrown-800 grid grid-cols-12 grid-rows-4 md:grid-rows-2">
    <div
      class="col-span-2 row-span-4 content-center text-3xl font-bold sm:text-4xl md:col-span-1 md:row-span-2"
    >
      {{ props.data.text }}
    </div>
    <div class="col-span-10 row-span-2 text-lg md:col-span-11 md:row-span-1">
      <p v-if="props.data.cikFinal">
        <SeeSymbol class="text-rosybrown-700">戚书</SeeSymbol>

        {{ props.data.cikInitial
        }}<span class="text-wheat-400 mr-1 text-sm">聲</span
        >{{ props.data.cikFinal
        }}<span class="text-wheat-400 mr-1 text-sm">韻</span>{{ props.data.tone
        }}<span class="text-wheat-400 mr-3 text-sm">調</span
        ><template v-if="props.data.cikAnnotation"
          ><span class="text-wheat-400 inline-block w-full md:inline md:w-fit"
            ><SeeSymbol class="text-rosybrown-700">注释</SeeSymbol
            >{{ props.data.cikAnnotation
            }}<Badge class="ml-1" v-if="props.data.liAnnotateCik"
              >{{ props.data.cikFinal }}
              {{ props.data.liAnnotateCikOrder }}</Badge
            ></span
          ></template
        >
      </p>
    </div>
    <div class="col-span-10 row-span-2 text-lg md:col-span-11 md:row-span-1">
      <p v-if="props.data.lingFinal">
        <SeeSymbol class="text-rosybrown-700">林书</SeeSymbol>
        {{ props.data.lingInitial
        }}<span class="text-wheat-400 mr-1 text-sm">聲</span
        >{{ props.data.lingFinal
        }}<span class="text-wheat-400 mr-1 text-sm">韻</span>{{ props.data.tone
        }}<span class="text-wheat-400 mr-3 text-sm">調</span
        ><template v-if="props.data.lingAnnotation"
          ><span class="text-wheat-400 inline-block w-full md:inline md:w-fit"
            ><SeeSymbol class="text-rosybrown-700">注释</SeeSymbol
            >{{ props.data.lingAnnotation
            }}<Badge class="ml-1 inline-block" v-if="props.data.liAnnotateLing"
              >{{ props.data.lingFinal }}
              {{ props.data.liAnnotateLingOrder }}</Badge
            ></span
          ></template
        >
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import SeeSymbol from './SeeSymbol.vue';
import Badge from './Badge.vue';
import type { WordCikLing } from '../utils/typing';

const props = defineProps<{
  data: WordCikLing;
}>();
</script>
