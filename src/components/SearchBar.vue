<template>
  <div class="relative">
    <form @submit.prevent="handleSubmit">
      <div
        class="flex h-12 flex-row items-center space-x-2 bg-white px-3 outline-2 outline-zinc-300 hover:outline-3 hover:outline-indigo-300"
        :class="toggleInputFocusStyle"
      >
        <span
          class="material-symbols-rounded cursor-pointer pl-1 hover:text-blue-700"
          @click="handleSubmit"
          >search</span
        >
        <input
          class="h-full w-full text-zinc-800"
          v-model.trim="searchQuery"
          @input="filterHistory"
          @focus="filterHistory"
        />
        <ul
          v-show="isHistoryVisible && filteredHistory.length > 0"
          class="absolute top-full right-0 left-0 rounded-b-md bg-white pt-2 outline outline-zinc-300"
        >
          <li
            v-for="(history, index) in filteredHistory"
            :key="index"
            class="box-border flex flex-row items-center justify-between border-l-3 border-l-transparent px-4 py-1 hover:border-l-blue-700 hover:bg-zinc-100 hover:text-blue-700"
          >
            <div
              class="flex w-7/8 cursor-pointer flex-row items-center font-sans"
              @click="selectHistory(index)"
            >
              <span
                class="material-symbols-rounded w-fit pr-4 text-zinc-400"
                style="font-size: 22px"
                >history</span
              >
              <div class="overflow-hidden text-ellipsis">{{ history }}</div>
            </div>
            <div
              class="cursor-pointer text-sm text-zinc-400 hover:text-zinc-600 hover:underline"
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
              class="cursor-pointer text-xs text-zinc-400 hover:text-zinc-600"
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
