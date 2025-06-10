<template>
  <div class="relative h-[50vh] w-full overflow-hidden rounded-lg">
    <a
      v-for="(wordImg, index) in imgList"
      :key="index"
      :href="wordImg.url"
      class="floating-element absolute h-20"
      :style="{
        left: `${randomPositions[index]?.x || 0}%`,
        top: `${randomPositions[index]?.y || 0}%`,
        '--animation-delay': `${Math.random() * 500}ms`, // 随机延迟渐显动画
      }"
    >
      <img class="h-full w-full object-cover object-left" :src="wordImg.img" />
    </a>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
const randomPositions = ref<{ x: number; y: number }[]>([]);

import img1 from '../assets/snacks/die-biang.png';
import img2 from '../assets/snacks/guong-biang.png';
import img3 from '../assets/snacks/ha-su.png';
import img4 from '../assets/snacks/soh-mieng.png';
import img5 from '../assets/snacks/uo-gui.png';
import img6 from '../assets/snacks/uo-ne.png';

const imgList = [
  { img: img1, url: '#' },
  { img: img2, url: '#' },
  { img: img3, url: '#' },
  { img: img4, url: '#' },
  { img: img5, url: '#' },
  { img: img6, url: '#' },
];

// 生成随机位置
const generateRandomPositions = () => {
  const positions: { x: number; y: number }[] = [];
  const padding = 10;

  for (let i = 0; i < imgList.length; i++) {
    const x = padding + Math.random() * (100 - 2 * padding);
    const y = Math.random() * 100;

    const isTooClose = positions.some((pos) => {
      const dx = pos.x - x;
      const dy = pos.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance < 20;
    });

    if (isTooClose) {
      i--;
      continue;
    }

    positions.push({ x, y });
  }

  randomPositions.value = positions;
};

onMounted(() => {
  generateRandomPositions();
});
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 0.75;
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-25px);
  }
}

.floating-element {
  opacity: 0;
  animation:
    fadeIn 1s ease-out forwards var(--animation-delay),
    float 3s ease-in-out infinite calc(1s + var(--animation-delay));
}
</style>
