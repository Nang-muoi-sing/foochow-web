<template>
  <div
    class="slider relative grid h-fit w-1/1 place-items-start overflow-hidden"
  >
    <div class="slide-track flex justify-between">
      <ImageCard class="slide"
        ><img class="rounded-t-lg bg-red-200 p-8" src="" alt="1"
      /></ImageCard>
      <ImageCard class="slide"
        ><img class="rounded-t-lg bg-yellow-200 p-8" src="" alt="2"
      /></ImageCard>
      <ImageCard class="slide"
        ><img class="rounded-t-lg bg-green-200 p-8" src="" alt="3"
      /></ImageCard>
      <ImageCard class="slide"
        ><img class="rounded-t-lg bg-orange-200 p-8" src="" alt="4"
      /></ImageCard>
      <ImageCard class="slide"
        ><img class="rounded-t-lg bg-blue-200 p-8" src="" alt="5"
      /></ImageCard>
      <!-- (duplicate) -->
      <ImageCard class="slide"
        ><img class="rounded-t-lg bg-red-200 p-8" src="" alt="1"
      /></ImageCard>
      <ImageCard class="slide"
        ><img class="rounded-t-lg bg-yellow-200 p-8" src="" alt="2"
      /></ImageCard>
      <ImageCard class="slide"
        ><img class="rounded-t-lg bg-green-200 p-8" src="" alt="3"
      /></ImageCard>
      <ImageCard class="slide"
        ><img class="rounded-t-lg bg-orange-200 p-8" src="" alt="4"
      /></ImageCard>
      <ImageCard class="slide"
        ><img class="rounded-t-lg bg-blue-200 p-8" src="" alt="5"
      /></ImageCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import ImageCard from './ImageCard.vue';
</script>

<style scoped>
.slider::before,
.slider::after {
  position: absolute;
  background-image: linear-gradient(
    to right,
    rgba(255, 255, 255, 0.75) 0%,
    rgba(255, 255, 255, 0) 50%
  );
  content: '';
  height: 100%;
  width: 25%;
  z-index: 2;
  pointer-events: none;
}
.slider::before {
  left: 0;
  top: 0;
}
.slider::after {
  right: 0;
  top: 0;
  transform: rotateZ(180deg);
}

.slide-track {
    /* 10*300 + 10*60 */
  width: calc(300px * 12);
  animation: scroll 30s linear infinite;
}

.slide-track:hover {
  animation-play-state: paused;
}

.slide {
  margin-right: 60px;
  width: 300px;
  height: auto;
  transition: 0.5s;
  /* cursor: pointer; */
}
.slide:hover {
  transform: scale(0.8);
}

@keyframes scroll {
  0% {
    transform: translateX(0px);
  }
  100% {
    transform: translateX(calc(-300px * 6));
  }
}

@media screen and (max-width: 768px) {
  .slide-track {
    width: calc(200px * 10);
  }
  .slide {
    margin-right: 0px;
    width: 200px;
  }

  @keyframes scroll {
    0% {
      transform: translateX(0px);
    }
    100% {
      transform: translateX(calc(-200px * 5));
    }
  }
}
</style>
