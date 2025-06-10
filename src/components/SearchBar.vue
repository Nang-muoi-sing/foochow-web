<template>
  <div class="relative">
    <form @submit.prevent="handleSubmit">
      <div
        class="outline-rosybrown-300 hover:outline-rosybrown-400 flex h-12 flex-row items-center space-x-2 bg-white px-3 outline-2 hover:outline-3"
        :class="toggleInputFocusStyle"
      >
        <span
          class="material-symbols-rounded text-rosybrown-400 hover:text-rosybrown-700 cursor-pointer pl-1"
          @click="handleSubmit"
          >search</span
        >
        <input
          class="text-rosybrown-800 h-full w-full"
          v-model.trim="searchQuery"
          @input="filterHistory"
          @focus="filterHistory"
        />
        <ul
          v-show="isHistoryVisible && filteredHistory.length > 0"
          class="outline-rosybrown-300 absolute top-full right-0 left-0 rounded-b-md bg-white pt-2 outline"
        >
          <li
            v-for="(history, index) in filteredHistory"
            :key="index"
            class="hover:border-l-rosybrown-700 hover:text-rosybrown-700 box-border flex flex-row items-center justify-between border-l-3 border-l-transparent px-4 py-1 hover:bg-rosybrown-50"
          >
            <div
              class="flex w-7/8 cursor-pointer flex-row items-center font-sans"
              @click="selectHistory(index)"
            >
              <span
                class="material-symbols-rounded text-rosybrown-400 w-fit pr-4"
                style="font-size: 22px"
                >history</span
              >
              <div class="overflow-hidden text-ellipsis text-rosybrown-600">{{ history }}</div>
            </div>
            <div
              class="text-rosybrown-300 hover:text-rosybrown-500 cursor-pointer text-sm hover:underline"
              @click.stop="deleteHistory(index)"
            >
              删除
            </div>
          </li>
          <li
            v-show="isHistoryVisible && filteredHistory.length > 0"
            class="flex flex-row-reverse items-baseline px-4 py-1"
          >
            <div
              class="cursor-pointer text-xs text-rosybrown-300 hover:text-rosybrown-500"
              @click.stop="clearHistory"
            >
              清空历史
            </div>
          </li>
        </ul>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { Trie } from '../utils/trie';

const props = defineProps({
  isHistoryVisible: {
    type: Boolean,
    default: false,
  },
});

const searchQuery = ref('');
const filteredHistory = ref<string[]>([]);

const deserializeTrie = (json: string | null) => {
  try {
    return json ? Trie.deserialize(json) : new Trie();
  } catch (error) {
    console.error('反序列化前缀树时出错:', error);
    return new Trie();
  }
};

const trieHistory = deserializeTrie(localStorage.getItem('searchHistory'));

const handleSubmit = () => {
  const query = searchQuery.value;
  // const maxHistoryLength = 50;

  if (query) {
    trieHistory.insert(query);
    try {
      localStorage.setItem('searchHistory', trieHistory.serialize());
    } finally {
      searchQuery.value = '';
    }
  }
};

const filterHistory = () => {
  const query = searchQuery.value;
  const matchedHistory = trieHistory.findWords(query);
  if (matchedHistory.length < 2) {
    filteredHistory.value = matchedHistory.map((item) => item.word);
    return;
  }

  matchedHistory.sort(
    (
      a: { word: string; timestamp: number },
      b: { word: string; timestamp: number }
    ) => b.timestamp - a.timestamp
  );
  filteredHistory.value = matchedHistory.map((item) => item.word).slice(0, 10);
};

const selectHistory = (index: number) => {
  searchQuery.value = filteredHistory.value[index];
  handleSubmit();
};

const deleteHistory = (index: number) => {
  trieHistory.delete(filteredHistory.value.splice(index, 1)[0]);
  localStorage.setItem('searchHistory', trieHistory.serialize());
};

const clearHistory = () => {
  filteredHistory.value = [];
  trieHistory.clear();
  localStorage.removeItem('searchHistory');
};

const toggleInputFocusStyle = computed(() => {
  return props.isHistoryVisible && filteredHistory.value.length > 0
    ? ['rounded-b-none', 'rounded-t-[24px]']
    : ['rounded-[3rem]'];
});
</script>

<style scoped>
/* remove default style */
input {
  border: none;
  outline: none;
}
</style>
