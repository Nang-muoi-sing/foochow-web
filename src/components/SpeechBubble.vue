<template>
    <div class="flex flex-col">
      <div
        class="px-5 py-3 rounded-xl"
        :class="getBubbleStyle"
      >
        <slot></slot>
      </div>
      <div class="flex flex-row">
        <div
          class="ml-5 h-3 w-7 border-l-14 border-r-14 border-b-8 border-t-8 border-l-transparent border-r-transparent border-b-transparent"
          :class="getArrowStyle"
        ></div>
      </div>
    </div>
    <div
      v-if="avatarUrl"
      class="relative ml-[.875rem]"
    >
      <div class="flex flex-row items-center space-x-3">
        <img
          class="h-10 w-10 rounded-full border-4 border-white object-cover"
          :src="avatarUrl"
          alt="Avatar"
        />
        <template v-if="nickname">
          <span class="font-semibold text-zinc-600 text-md">{{
            nickname
          }}</span>
        </template>
      </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";

const props = defineProps<{
  color?: string;
  avatarUrl?: string;
  nickname?: string;
}>();

const defaultColor = "neutral";
const resolvedColor = props.color || defaultColor;

const getBubbleStyle = computed(() => {
  switch (resolvedColor) {
    case "red":
      return ["bg-red-100", "text-red-800"];
    case "orange":
      return ["bg-orange-100", "text-orange-800"];
    case "amber":
      return ["bg-amber-100", "text-ember-800"];
    case "yellow":
      return ["bg-yellow-100", "text-yellow-800"];
    case "lime":
      return ["bg-lime-100", "text-lime-800"];
    case "green":
      return ["bg-green-100", "text-green-800"];
    case "emerald":
      return ["bg-emerald-100", "text-emerald-800"];
    case "teal":
      return ["bg-teal-100", "text-teal-800"];
    case "cyan":
      return ["bg-cyan-100", "text-cyan-800"];
    case "sky":
      return ["bg-sky-100", "text-sky-800"];
    case "blue":
      return ["bg-blue-100", "text-blue-800"];
    case "indigo":
      return ["bg-indigo-100", "text-indigo-800"];
    case "violet":
      return ["bg-violet-100", "text-violet-800"];
    case "purple":
      return ["bg-purple-100", "text-purple-800"];
    case "fuchsia":
      return ["bg-fuchsia-100", "text-fuchsia-800"];
    case "pink":
      return ["bg-pink-100", "text-pink-800"];
    case "rose":
      return ["bg-rose-100", "text-rose-800"];
    case "slate":
      return ["bg-slate-100", "text-slate-800"];
    case "gray":
      return ["bg-gray-100", "text-gray-800"];
    case "zinc":
      return ["bg-zinc-100", "text-zinc-800"];
    case "neutral":
      return ["bg-neutral-100 text-neutral-800"];
    case "stone":
      return ["bg-stone-100", "text-stone-800"];
  }
});

const getArrowStyle = computed(() => {
  switch (resolvedColor) {
    case "red":
      return ["border-t-red-100"];
    case "orange":
      return ["border-t-orange-100"];
    case "amber":
      return ["border-t-amber-100"];
    case "yellow":
      return ["border-t-yellow-100"];
    case "lime":
      return ["border-t-lime-100"];
    case "green":
      return ["border-t-green-100"];
    case "emerald":
      return ["border-t-emerald-100"];
    case "teal":
      return ["border-t-teal-100"];
    case "cyan":
      return ["border-t-cyan-100"];
    case "sky":
      return ["border-t-sky-100"];
    case "blue":
      return ["border-t-blue-100"];
    case "indigo":
      return ["border-t-indigo-100"];
    case "violet":
      return ["border-t-violet-100"];
    case "purple":
      return ["border-t-purple-100"];
    case "fuchsia":
      return ["border-t-fuchsia-100"];
    case "pink":
      return ["border-t-pink-100"];
    case "rose":
      return ["border-t-rose-100"];
    case "slate":
      return ["border-t-slate-100"];
    case "gray":
      return ["border-t-gray-100"];
    case "zinc":
      return ["border-t-zinc-100"];
    case "neutral":
      return ["border-t-neutral-100"];
    case "stone":
      return ["border-t-stone-100"];
  }
});
</script>
