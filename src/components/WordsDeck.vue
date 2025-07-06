<template>
  <div
    class="relative flex h-screen w-screen items-center justify-center overflow-hidden"
  >
    <div
      v-for="(spring, index) in springs"
      :key="index"
      class="deck absolute flex h-full w-full touch-none items-center justify-center will-change-transform"
      :style="{ transform: `translate3d(${spring.x}px, ${spring.y}px, 0)` }"
    >
      <div
        @mousedown="onDragStart(index)"
        @mousemove="onDragMove(index, $event)"
        @mouseup="onDragEnd(index)"
        @mouseleave="onDragEnd(index)"
        @touchstart="onDragStart(index)"
        @touchmove="onDragMove(index, $event)"
        @touchend="onDragEnd(index)"
        class="border-wheat-200 bg-wheat-50 relative h-[60vh] w-[75vw] rounded-xl border-1 p-4 select-none lg:h-[450px] lg:w-[600px]"
      >
        <div
          class="flex h-1/1 flex-col items-center space-y-5 px-5 pt-5 font-sans"
        >
          <div
            class="ruby-container text-rosybrown-800 text-4xl font-bold break-all whitespace-normal md:text-5xl lg:text-6xl"
          >
            <ruby
              v-html="
                makeYngpingRubyInner(cards[index].text, cards[index].pron)
              "
              style="ruby-align: center"
            >
            </ruby>
          </div>
          <p
            class="text-rosybrown-800 max-w-lg overflow-hidden text-base text-ellipsis lg:text-lg"
          >
            释义：{{ cards[index].expl }}
          </p>
          <div class="absolute bottom-0 min-h-[110px] scale-75 overflow-hidden">
            <img src="../assets/logo-daily.png" draggable="false" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import gsap from 'gsap';
import { onMounted, reactive, ref } from 'vue';
import { makeYngpingRubyInner } from '../utils/typography';

// 卡片数据
const cards = [
  {
    year: '2025',
    month: '03',
    day: '26',
    week: '星期三',
    text: '花生仁',
    pron: 'hua21 leing55 ning53',
    expl: '◯落花生的果實去殼剩下的種子。北京話叫「花生米」。◯蟲蛹，因其外形像花生米而得名。',
  },
  {
    year: '2025',
    month: '03',
    day: '27',
    week: '星期四',
    text: '葵花子',
    pron: 'gi21 ua53 i33',
    expl: '◯炒熟的作食品的向日葵種子。',
  },
  {
    year: '2025',
    month: '03',
    day: '28',
    week: '星期五',
    text: '山頭嶺尾',
    pron: 'sang55 tau53 liang33 mui33',
    expl: '◯泛指山的方方面面。',
  },
  {
    year: '2025',
    month: '03',
    day: '29',
    week: '星期六',
    text: '水漲水汐',
    pron: 'zui24 doung33 zui55 puong213',
    expl: '◯潮汐。由於月亮和太陽的吸引力的作用，海洋水面發生的定時漲落現象。',
  },
  {
    year: '2025',
    month: '03',
    day: '30',
    week: '星期日',
    text: '水窟',
    pron: 'zui33 koouk24',
    expl: '◯田地邊的坑，用以蓄水澆地。◯指積水地坑，非人工挖鑿的水坑。 ',
  },
  {
    year: '2025',
    month: '03',
    day: '31',
    week: '星期一',
    text: '黃⿰禾台',
    pron: 'uong53 dai55',
    expl: '◯草本植物，葉子線形，子實淡黃色，比小米稍大，煮熟後有黏性，可以釀酒等。北京話叫“黍子”。 ',
  },
  {
    year: '2025',
    month: '04',
    day: '01',
    week: '星期二',
    text: '溪笍',
    pron: 'ke55 nak5',
    expl: '◯用毛竹篾做成的縴繩。船在溪澗航行時，多需拉縴。',
  },
];

// 定义弹簧数据的类型
type Spring = {
  x: number;
  y: number;
  scale: number;
};

// 存储被移除的卡片索引
const gone = ref(new Set<number>());

// 生成每个卡片的初始弹簧数据
const initialSprings: Spring[] = reactive(
  cards.map(
    (_, i): Spring => ({
      x: i * 4,
      y: i * 4,
      scale: 1,
    })
  )
);

// 卡片的弹簧数据
const springs = reactive<Spring[]>([...initialSprings]);

// 存储当前拖动的卡片索引
const currentDraggingIndex = ref<number | null>(null);
// 存储拖动开始时的鼠标或触摸位置
const startX = ref(0);
// 存储拖动过程中的移动距离
const movementX = ref(0);
// 存储拖动开始的时间
const startTime = ref(0);

// 初始化弹簧数据
const initSprings = (): void => {
  springs.length = 0;
  initialSprings.forEach((spring) => {
    springs.push({ ...spring });
  });
  gone.value.clear();
};

// 拖动开始事件处理函数
const onDragStart = (index: number): void => {
  currentDraggingIndex.value = index;
  const event = window.event as MouseEvent | TouchEvent;
  startX.value =
    event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
  movementX.value = 0;
  startTime.value = Date.now();
  // 拖动时卡片放大
  gsap.to(springs[index], { scale: 1.1, duration: 0.1 });
};

// 拖动移动事件处理函数
const onDragMove = (index: number, event: MouseEvent | TouchEvent): void => {
  if (currentDraggingIndex.value === index) {
    const clientX =
      event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    movementX.value = clientX - startX.value;
    // 更新卡片的 x 位置和旋转角度
    springs[index].x = movementX.value;
  }
};

// 拖动结束事件处理函数
const onDragEnd = (index: number): void => {
  if (currentDraggingIndex.value === index) {
    const endTime = Date.now();
    const elapsedTime = endTime - startTime.value;
    const velocity = Math.abs(movementX.value) / elapsedTime;
    const trigger = velocity > 0.002; // 调整触发速度阈值
    const dir = movementX.value < 0 ? -1 : 1;

    if (trigger) {
      gone.value.add(index);
      // 卡片移除动画
      gsap.to(springs[index], {
        x: (window.innerWidth + 200) * dir,
        rot: dir * 30 * velocity,
        scale: 0.2,
        duration: 0.5,
        ease: 'power2.out',
        onComplete: () => {
          if (gone.value.size === cards.length) {
            setTimeout(() => {
              initSprings();
            }, 600);
          }
        },
      });
    } else {
      // 卡片回到初始位置
      gsap.to(springs[index], {
        x: 0,
        scale: 1,
        duration: 0.5,
        ease: 'power2.out',
      });
    }

    currentDraggingIndex.value = null;
  }
};

onMounted(() => {
  initSprings();
});
</script>

<style scoped>
.deck > div {
  will-change: transform;
}
</style>
