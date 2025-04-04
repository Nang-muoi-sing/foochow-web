<template>
  <div>
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-neutral-400"
      style="width: 700px; height: 700px"
    ></div>
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-neutral-400"
      style="width: 1000px; height: 1000px"
    ></div>
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-neutral-400"
      style="width: 1300px; height: 1300px"
    ></div>
    <div
      class="animate-rotate-1-1 absolute top-1/2 left-1/2 w-xs origin-center"
      :style="{ '--radius': '350px' }"
    >
      <SpeechBubble
        color="amber"
        nickname="heff"
        avatar-url="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
      >
        <p class="text-lg">
          Hello everyone. <br />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </SpeechBubble>
    </div>
    <div
      class="animate-rotate-1-2 absolute top-1/2 left-1/2 w-xs origin-center"
      :style="{ '--radius': '350px' }"
    >
      <SpeechBubble
        color="red"
        nickname="Geff"
        avatar-url="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
      >
        <p class="text-xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua!
        </p>
      </SpeechBubble>
    </div>
    <div
      class="animate-rotate-1-3 absolute top-1/2 left-1/2 origin-center -translate-x-1/2 -translate-y-1/2"
      :style="{ '--radius': '350px' }"
    >
      <Badge color="green">
        <span class="material-symbols-rounded">cognition</span>
        <p>Message</p>
      </Badge>
    </div>
  </div>
</template>

<script setup lang="ts">
import SpeechBubble from './SpeechBubble.vue';
import Badge from './Badge.vue';
</script>

<style scoped>
@keyframes rotate {
  from {
    transform: rotate(0deg) translateX(var(--radius)) rotate(0deg);
  }
  to {
    transform: rotate(360deg) translateX(var(--radius)) rotate(-360deg);
  }
}

.animate-rotate-1-1 {
  animation: rotate 30s linear infinite;
  /* block height - avatar height (20px) */
  margin-top: -200px;
  /* arrow position */
  margin-left: -34px;
}

.animate-rotate-1-2 {
  animation: rotate 30s linear infinite;
  animation-delay: -10s;
  margin-top: -200px;
  margin-left: -34px;
}

.animate-rotate-1-3 {
  animation: rotate 30s linear infinite;
  animation-delay: -25s;
}
</style>
