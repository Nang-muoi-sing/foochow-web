<template>
  <div
    class="relative flex h-screen w-screen items-center justify-center overflow-hidden"
  >
    <div
      v-for="(spring, index) in springs"
      :key="index"
      class="deck absolute flex h-[70vh] w-[80vw] touch-none items-center justify-center will-change-transform"
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
        class="grid grid-cols-5 grid-rows-4 gap-4 rounded-xl bg-white p-4 select-none shadow-2xl"
        :style="{
          transform: `perspective(1500px) rotateX(30deg) rotateY(${spring.rot / 10}deg) rotateZ(${spring.rot}deg) scale(${spring.scale})`,
        }"
      >
        <div
          class="col-start-1 row-span-3 flex items-center justify-center bg-sky-800"
        >
          <h2
            class="text-8xl font-bold tracking-tighter text-zinc-100"
            style="writing-mode: vertical-lr"
          >
            每日一词
          </h2>
          <!-- 榕拼？ -->
          <!-- <p class="text-zinc-100 font-semibold" style="writing-mode: vertical-lr">ing ung</p> -->
        </div>
        <div
          class="col-start-1 row-span-1 grid grid-cols-4 grid-rows-3 gap-x-1 text-center"
        >
          <p
            class="col-span-3 row-span-1 border-4 border-sky-800 text-xl font-bold text-sky-800"
          >
            {{ cards[index].year }}年{{ cards[index].month }}月
          </p>
          <div
            class="col-span-3 row-span-2 border-4 border-t-0 border-sky-800 text-8xl/18 font-bold text-sky-800"
          >
            {{ cards[index].day }}
          </div>
          <p
            class="col-start-4 col-end-5 row-start-1 row-end-4 border-4 border-t-20 border-sky-800 text-center text-xl/8 font-bold tracking-widest text-sky-800"
            style="writing-mode: vertical-lr"
          >
            {{ cards[index].week }}
          </p>
        </div>
        <div
          class="col-start-2 col-end-6 row-start-1 row-end-5 border-4 border-sky-800"
        >
          <div class="flex flex-col space-y-5 px-5 py-10">
            <ruby
              class="text-6xl font-bold break-all whitespace-normal"
              style="ruby-align: center"
              v-html="
                makeYngpingRubyInner(cards[index].text, cards[index].pron)
              "
            >
            </ruby>
            <p class="text-xl text-zinc-900">
              {{ cards[index].expl }}
            </p>
            <div class="flex flex-row items-center space-x-5">
              <button
                type="button"
                class="flex w-fit flex-row items-center space-x-3 rounded-lg bg-sky-700 px-8 py-2 font-medium text-white hover:bg-sky-800 focus:ring-4 focus:ring-sky-300 focus:outline-none dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800"
              >
                <span>查阅详情</span
                ><span class="material-symbols-rounded">arrow_right_alt</span>
              </button>
              <span class="material-symbols-rounded text-sky-800">share</span>
              <span class="material-symbols-rounded text-sky-800"
                >favorite</span
              >
            </div>
          </div>
        </div>
        <div
          class="col-start-5 col-end-6 row-start-3 row-end-5 flex flex-col justify-end"
        >
          <img src="../assets/stamp.svg" />
          <p class="pr-5 pb-5 text-right text-zinc-600">From 蓝尾星团队</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import gsap from 'gsap';

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
    text: '黃秮',
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
  rot: number;
};

// 存储被移除的卡片索引
const gone = ref(new Set<number>());

// 生成每个卡片的初始弹簧数据
const initialSprings: Spring[] = reactive(
  cards.map(
    (_, i): Spring => ({
      x: 0,
      y: i * -4,
      scale: 1,
      rot: -10 + Math.random() * 20,
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
    springs[index].rot = movementX.value / 100;
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
        rot: initialSprings[index].rot,
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

const makeYngpingRubyInner = (text: string, yngping: string): string => {
  const chars = text.trim().split('');
  const charProns = yngping.trim().split(' ');
  //  TODO: <sub>

  if (charProns.length !== chars.length) {
    return `<span class="rb">${text}</span><rp>(</rp><rt>${makeYngpingSup(yngping)}</rt><rp>)</rp>`;
  } else {
    let rubyString = '';
    for (let i = 0; i < chars.length; i++) {
      rubyString += `<span class="rb">${chars[i]}</span><rp>(</rp><rt>${makeYngpingSup(charProns[i])}</rt><rp>)</rp>`;
    }
    return rubyString;
  }
};

const makeYngpingSup = (yngping: string): string => {
  const tone = yngping.match(/\d+$/);
  const yngpingLetter = yngping.replace(/\d+$/, '');
  return tone ? `${yngpingLetter}<sup>${tone}</sup>` : yngping;
};
</script>

<style scoped>
.deck > div {
  width: 921px;
  /* max-width: 150px; */
  height: 568px;
  /* max-height: 285px; */
  will-change: transform;
  /* box-shadow:
    0 12.5px 100px -10px rgba(50, 50, 73, 0.4),
    0 10px 10px -10px rgba(50, 50, 73, 0.3); */
}

::v-deep .rb {
  color: var(--color-white);
  filter: drop-shadow(5px 5px 0 var(--color-sky-800))
    drop-shadow(2px 0 0 var(--color-sky-800))
    drop-shadow(-2px 0 0 var(--color-sky-800))
    drop-shadow(0 2px 0 var(--color-sky-800))
    drop-shadow(0 -2px 0 var(--color-sky-800));
}

::v-deep rt {
  font-size: xx-large;
  color: var(--color-sky-800);
}
</style>
