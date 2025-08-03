<template>
  <template v-if="!props.text || !props.yngping"></template>

  <ruby v-else-if="!isMatchedTextSyllable">
    <span class="rb">{{ baldText }}</span>
    <rp>(</rp
    ><rt class="text-rosybrown-700">{{ makeYngpingsCursive(props.yngping) }}</rt
    ><rp>)</rp>
  </ruby>

  <ruby v-else>
    <template v-for="(char, index) in baldChars" :key="`${char}-${index}`">
      <span
        class="rb"
        :class="{ 'phonetic-loan-character': markedChars[index] }"
        >{{ char }}</span
      >

      <rp>(</rp
      ><rt class="text-rosybrown-700"
        >&thinsp;{{ makeYngpingCursive(syllables[index]) }}&thinsp;</rt
      ><rp>)</rp>
    </template>
  </ruby>
</template>

<script setup lang="ts">
import { makeYngpingCursive, makeYngpingsCursive } from '../utils/phonetics';
import { computed } from 'vue';

const props = defineProps<{
  text: string;
  yngping: string;
}>();

const rawText = computed(() => props.text.trim());
const rawYngping = computed(() => props.yngping.trim());

const markedChars = computed<boolean[]>(() => {
  const chars = rawText.value.split(/(?:)/u);
  const marks = [];

  for (let index = 0; index < chars.length; index++) {
    if (chars[index] === '*') {
      continue;
    }

    if (index === length - 1) {
      marks.push(false);
      continue;
    }

    if (chars[index + 1] === '*') {
      marks.push(true);
    } else {
      marks.push(false);
    }
  }
  return marks;
});

const baldText = computed(() => rawText.value.replace(/\*/gu, ''));
const baldChars = computed(() => baldText.value.split(/(?:)/u));
const syllables = computed(() => rawYngping.value.split(' '));

const isMatchedTextSyllable = computed(() => {
  return baldChars.value.length === syllables.value.length;
});
</script>

<style scoped>
.phonetic-loan-character {
  text-emphasis-style: dot;
}
</style>
