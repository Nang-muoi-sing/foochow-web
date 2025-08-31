<template>
  <div class="h-full w-full overflow-hidden rounded-lg">
    <a
      v-for="(wordImg, index) in imgList"
      :key="index"
      :href="wordImg.url"
      class="floating-element absolute h-20"
      :style="{
        left: `${randomPositions[index]?.x || 0}%`,
        top: `${randomPositions[index]?.y || 0}%`,
        '--animation-delay': `${Math.random() * 600}ms`, // 随机延迟渐显动画
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
  { img: img1, url: '/word?w=L6Cq00' },
  { img: img2, url: '/word?w=bWYYZZ' },
  { img: img3, url: '/word?w=dtlcN7' },
  { img: img4, url: '/word?w=FZAKul' },
  { img: img5, url: '/word?w=SHqtKQ' },
  { img: img6, url: '/word?w=x1Bvhs' },
];

// 生成随机位置
const generateRandomPositions = () => {
  const positions: { x: number; y: number }[] = [];
  const padding = { x: 20, y: 10 };
  const center = { x: 50, y: 20 };

  for (let i = 0; i < imgList.length; i++) {
    const x = padding.x + Math.random() * (100 - 2 * padding.x);
    const y = padding.y + Math.random() * (100 - 2 * padding.y);

    const isOverlapCenter = (() => {
      const dx = center.x - x;
      const dy = center.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance < 30;
    })();

    if (isOverlapCenter) {
      i--;
      continue;
    }

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
    opacity: var(--base-opacity, 0.75);
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) translate(-50%, -50%);
  }
  50% {
    transform: translateY(-25px) translate(-50%, -50%);
  }
}

.floating-element {
  opacity: 0;
  animation:
    fadeIn 1s ease-out forwards var(--animation-delay),
    float 3s ease-in-out infinite calc(1s + var(--animation-delay));
  transform: translate(-50%, -50%);
  transition: all 0.3s ease;
}

.floating-element:hover {
  --base-opacity: 1;
}
</style>
