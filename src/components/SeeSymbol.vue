<template>
  <p>
    <span
      class="seeicon- mr-1 align-text-bottom"
      :class="props.iconClass"
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
  iconClass?: string;
}>();
</script>
