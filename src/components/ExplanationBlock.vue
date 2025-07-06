<template>
  <div>
    <div class="flex w-full justify-end" v-if="props.toggleButton">
      <button
        class="bg-wheat-50 hover:bg-wheat-100 mb-4 cursor-pointer rounded px-3 py-1 text-sm transition"
        @click="toggleMode"
      >
        显示{{ currentGlyph === 'first' ? '推荐用字' : '原书用字' }}
      </button>
    </div>

    <div v-html="parsedExplanations"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, ref } from 'vue';
import { replaceChineseQuotes } from '../utils/typography';

interface Props {
  explanations: Node[];
  toggleButton?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  toggleButton: false,
});

interface Node {
  expl: string;
  lexical?: string;
  sent?: string[];
  node?: Node[];
}

const currentGlyph = ref<'first' | 'second'>('first');
const toggleMode = () => {
  currentGlyph.value = currentGlyph.value === 'first' ? 'second' : 'first';
};

// 替换文本中的 {A,B} 格式
const replaceToggleText = (text: string): string => {
  const regex = /\{([^,]+),([^}]+)\}/g;
  return text.replace(regex, (match, first, second) => {
    return currentGlyph.value === 'first' ? first : second;
  });
};

// 生成层级编号（如 1.1, 1.1.1）
const generateNumber = (path: number[]): string => path.join('.') + '. ';

const parseNestedExplanations = (
  explanations: Node[],
  path: number[] = []
): string => {
  return `<ol class="list-none ${path.length === 0 ? 'pl-0' : 'pl-2 md:pl-6'}">${explanations
    .map((item, index) => {
      const currentPath = [...path, index + 1];
      const lexicalIcon = item.lexical
        ? `<span
    class="seeicon- mr-1 inline-block align-text-bottom text-rosybrown-700"
    style="font-size: 20px"
    >${item.lexical}</span>`
        : '';
      const processedExpl = `${lexicalIcon}${replaceChineseQuotes(item.expl)}`;

      return `
    <li class="mb-2">
      <p class="flex items-start">
        <span class="font-semibold mr-2">${generateNumber(currentPath)}</span>
        <span>${processedExpl}</span>
      </p>

      ${
        item.sent?.length
          ? `<ul class="list-none pl-2 md:pl-6 mt-1 space-y-1">${item.sent
              .map((sent) => {
                // 替换例句中的 {A,B} 格式
                const processedSent = replaceChineseQuotes(
                  replaceToggleText(sent)
                );
                return `
          <li class="flex items-start text-wheat-400">
            <span class="mr-2">•</span>
            <span>${processedSent}</span>
          </li>
        `;
              })
              .join('')}</ul>`
          : ''
      }

      ${
        item.node?.length ? parseNestedExplanations(item.node, currentPath) : ''
      }
    </li>
  `;
    })
    .join('')}</ol>`;
};

const parsedExplanations = computed(() => {
  return parseNestedExplanations(props.explanations);
});
</script>
