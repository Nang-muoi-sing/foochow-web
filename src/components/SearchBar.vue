<template>
  <div>
    <div
      class="fixed top-0 left-0 z-50 h-screen w-screen"
      :class="toggleDimmer"
    ></div>
    <form
      class="outline-rosybrown-300 hover:outline-rosybrown-400 relative z-100 flex h-12 flex-row items-center space-x-2 bg-white px-3 outline-2 hover:outline-3"
      :class="toggleInputFocusStyle"
      @submit.prevent="handleSubmit"
      @click="onFormClick"
      v-on-click-outside="
        () => {
          isHistoryVisible = false;
        }
      "
    >
      <i-material-symbols-search-rounded
        width="28"
        height="28"
        class="text-rosybrown-400 hover:text-rosybrown-700 cursor-pointer pl-1"
        @click.stop="handleSubmit"
      />
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
          class="hover:border-l-rosybrown-700 hover:text-rosybrown-700 hover:bg-rosybrown-50 box-border flex flex-row items-center justify-between border-l-3 border-l-transparent px-4 py-1"
        >
          <div
            class="flex w-7/8 cursor-pointer flex-row items-center font-sans"
            @click.stop="selectHistory(index)"
          >
            <i-material-symbols-history-rounded
              class="text-rosybrown-400 pr-4"
              style="width: 40px"
            />
            <div class="text-rosybrown-600 overflow-hidden text-ellipsis">
              {{ history }}
            </div>
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
            class="text-rosybrown-300 hover:text-rosybrown-500 cursor-pointer text-xs"
            @click.stop="clearHistory"
          >
            清空历史
          </div>
        </li>
      </ul>
    </form>
  </div>
</template>

<script setup lang="ts">
import { vOnClickOutside } from '@vueuse/components';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Trie } from '../utils/trie';

const router = useRouter();
const searchQuery = ref('');
const filteredHistory = ref<string[]>([]);
const isHistoryVisible = ref(false);
const isInputFocused = ref(false); // 新增：跟踪输入框焦点状态

const handleScroll = () => {
  isHistoryVisible.value = false;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});

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

  if (query) {
    trieHistory.insert(query);
    try {
      localStorage.setItem('searchHistory', trieHistory.serialize());
    } finally {
      searchQuery.value = '';
    }
  }

  isHistoryVisible.value = false;
  isInputFocused.value = false;
  router.push({ name: 'search', query: { q: query } });
};

const filterHistory = () => {
  isHistoryVisible.value = true;
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

const onFormClick = (event: MouseEvent) => {
  if ((event.target as HTMLElement).tagName === 'INPUT') {
    isHistoryVisible.value = true;
    isInputFocused.value = true;
  }
};

const toggleInputFocusStyle = computed(() => {
  return isHistoryVisible.value && filteredHistory.value.length > 0
    ? ['rounded-b-none', 'rounded-t-[24px]']
    : ['rounded-[3rem]'];
});

const toggleDimmer = computed(() => {
  return isHistoryVisible.value
    ? ['backdrop-blur-xs', 'backdrop-brightness-90']
    : ['hidden'];
});
</script>

<style scoped>
/* remove default style */
input {
  border: none;
  outline: none;
}
</style>
