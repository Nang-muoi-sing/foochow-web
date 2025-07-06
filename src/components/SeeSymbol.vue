<template>
  <p>
    <span
      class="seeicon- mr-1 inline-block align-text-bottom"
      style="font-size: 20px"
      >{{ props.icon }}</span
    >
    <slot></slot>
  </p>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  icon: string;
}>();
</script>
