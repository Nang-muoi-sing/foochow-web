<template>
  <span class="align-text-bottom">
    <span
      class="bg-wheat-100 text-rosybrown-600 mr-1 w-fit rounded-md px-1 py-0.5 text-xs"
    >
      <slot></slot>
    </span>
    <span v-if="props.content">{{ props.content }}</span>
  </span>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  content?: string;
}>();
</script>
