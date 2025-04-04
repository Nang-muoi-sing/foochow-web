<template>
  <div class="inline-flex flex-row space-x-1 rounded-xl p-2" :class="getStyle">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';

const props = defineProps<{
  color?: string;
}>();

const defaultColor = 'neutral';
const resolvedColor = props.color || defaultColor;

const getStyle = computed(() => {
  switch (resolvedColor) {
    case 'red':
      return ['bg-red-100', 'text-red-800'];
    case 'orange':
      return ['bg-orange-100', 'text-orange-800'];
    case 'amber':
      return ['bg-amber-100', 'text-ember-800'];
    case 'yellow':
      return ['bg-yellow-100', 'text-yellow-800'];
    case 'lime':
      return ['bg-lime-100', 'text-lime-800'];
    case 'green':
      return ['bg-green-100', 'text-green-800'];
    case 'emerald':
      return ['bg-emerald-100', 'text-emerald-800'];
    case 'teal':
      return ['bg-teal-100', 'text-teal-800'];
    case 'cyan':
      return ['bg-cyan-100', 'text-cyan-800'];
    case 'sky':
      return ['bg-sky-100', 'text-sky-800'];
    case 'blue':
      return ['bg-blue-100', 'text-blue-800'];
    case 'indigo':
      return ['bg-indigo-100', 'text-indigo-800'];
    case 'violet':
      return ['bg-violet-100', 'text-violet-800'];
    case 'purple':
      return ['bg-purple-100', 'text-purple-800'];
    case 'fuchsia':
      return ['bg-fuchsia-100', 'text-fuchsia-800'];
    case 'pink':
      return ['bg-pink-100', 'text-pink-800'];
    case 'rose':
      return ['bg-rose-100', 'text-rose-800'];
    case 'slate':
      return ['bg-slate-100', 'text-slate-800'];
    case 'gray':
      return ['bg-gray-100', 'text-gray-800'];
    case 'zinc':
      return ['bg-zinc-100', 'text-zinc-800'];
    case 'neutral':
      return ['bg-neutral-100 text-neutral-800'];
    case 'stone':
      return ['bg-stone-100', 'text-stone-800'];
  }
});
</script>
