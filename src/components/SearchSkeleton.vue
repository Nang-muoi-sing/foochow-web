<template>
  <div class="animate-pulse">
    <div class="bg-wheat-200 mb-2.5 h-6 w-32 rounded-lg px-2 py-1"></div>
    <div class="bg-wheat-100 mb-2 h-3 w-50 rounded-lg px-2"></div>
  </div>

  <div
    v-for="index in props.number"
    :key="index"
    class="bg-wheat-100 my-5 px-5 py-4"
  >
    <div class="animate-pulse">
      <div class="flex justify-end">
        <div class="bg-wheat-200 mb-3 h-3 w-32 rounded-lg"></div>
      </div>

      <div class="bg-wheat-200 mb-5 h-6 w-28 rounded-lg"></div>
      <div class="bg-wheat-200 mb-2.5 h-3 w-135 rounded-lg"></div>
      <div class="bg-wheat-200 mb-2.5 h-3 w-105 rounded-lg"></div>
      <div class="bg-wheat-200 mb-2.5 h-3 w-120 rounded-lg"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    number?: number;
  }>(),
  {
    number: 10,
  }
);
</script>
