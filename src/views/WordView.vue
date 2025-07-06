<template>
  <SideBar class="hidden 2xl:block"></SideBar>
  <PageContent>
    <div class="bg-wheat-100 mt-5 mb-8 rounded-lg px-8 py-6">
      <div
        class="ruby-container text-rosybrown-800 text-4xl font-bold break-all whitespace-normal md:text-5xl"
      >
        <ruby
          v-html="
            makeYngpingRubyInner(
              processedWordData.seedict.text,
              processedWordData.seedict.pronPrimary,
              'text-rosybrown-700'
            )
          "
          style="ruby-align: center"
        >
        </ruby>
      </div>
    </div>

    <template v-if="processedWordData.seedict.expls.length > 0">
      <Subtitle text="本站释义"></Subtitle>
      <div class="text-rosybrown-800 mt-2 mb-5 rounded-lg bg-white px-8 py-6">
        <ExplanationBlock
          :explanations="processedWordData.seedict.expls"
        ></ExplanationBlock>
        <SeeSymbol
          v-if="processedWordData.seedict.comment"
          icon="注释"
          icon-class="text-rosybrown-700"
          >{{ processedWordData.seedict.comment }}</SeeSymbol
        >
        <template
          v-if="
            processedWordData.seedict.synonym ||
            processedWordData.seedict.antonym
          "
        >
          <hr class="border-rosybrown-100 my-2 border-t-2" />
          <div class="space-y-1">
            <SeeSymbol
              v-if="processedWordData.seedict.synonym"
              icon="近义词"
              icon-class="text-rosybrown-700"
              >{{ processedWordData.seedict.synonym }}</SeeSymbol
            >
            <SeeSymbol
              v-if="processedWordData.seedict.antonym"
              icon="反义词"
              icon-class="text-rosybrown-700"
              >{{ processedWordData.seedict.antonym }}</SeeSymbol
            >
          </div>
        </template>
      </div>
    </template>

    <template v-if="processedWordData.feng || processedWordData.cikling">
      <Subtitle text="辞书释义"></Subtitle>
      <div
        v-if="processedWordData.feng"
        class="text-rosybrown-800 mt-2 mb-5 rounded-lg bg-white px-8 py-6"
      >
        <div class="items-baseline">
          <span class="text-rosybrown-800 mr-2 text-3xl font-bold sm:text-4xl">
            {{ processedWordData.feng.text }}
          </span>
          <span class="text-rosybrown-500 text-xl">
            {{ processedWordData.feng.pronLiteral
            }}<span class="font-serif font-bold">→</span
            >{{ processedWordData.feng.pronSandhi }}
          </span>
        </div>

        <ExplanationBlock
          :explanations="processedWordData.feng.expls"
          :toggle-button="true"
        ></ExplanationBlock>
        <SeeSymbol
          v-if="processedWordData.feng.comment"
          icon="注释"
          icon-class="text-rosybrown-700"
        >
          {{ replaceChineseQuotes(processedWordData.feng.comment) }}
        </SeeSymbol>
        <p class="text-rosybrown-200 mt-2 flex justify-end text-sm">
          {{
            processedWordData.feng.refPage
              ? `冯爱珍. 1998. 福州方言词典. 南京: 江苏教育出版社. 第 ${processedWordData.feng.refPage} 页.`
              : '冯爱珍. 1998. 福州方言词典. 南京: 江苏教育出版社.'
          }}
        </p>
        <template v-if="processedWordData.feng.correction">
          <hr class="border-rosybrown-100 my-2 border-t-2" />
          <SeeSymbol icon="校注" icon-class="text-rosybrown-700">
            {{ processedWordData.feng.correction }}
          </SeeSymbol>
        </template>
      </div>
      <div
        v-if="processedWordData.cikling.ciklingEntries?.length > 0"
        class="mt-2 mb-5 rounded-lg bg-white px-8 py-6"
      >
        <div class="mb-2 space-y-2">
          <CikLingBlock
            v-for="(ciklingEntry, index) in processedWordData.cikling
              .ciklingEntries"
            :data="ciklingEntry"
            :key="index"
          ></CikLingBlock>
        </div>
        <div class="text-rosybrown-800 space-y-1">
          <template
            v-for="(ciklingEntry, index) in processedWordData.cikling
              .ciklingEntries"
            :key="index"
            ><p>
              <Badge
                v-if="ciklingEntry.liAnnotateCikOrder"
                :content="ciklingEntry.liAnnotateCik"
                :data="ciklingEntry"
                >{{ ciklingEntry.cikFinal }}
                {{ ciklingEntry.liAnnotateCikOrder }}</Badge
              >
            </p>
            <p>
              <Badge
                v-if="ciklingEntry.liAnnotateLingOrder"
                :content="ciklingEntry.liAnnotateLing"
                :data="ciklingEntry"
                >{{ ciklingEntry.lingFinal }}
                {{ ciklingEntry.liAnnotateLingOrder }}</Badge
              >
            </p>
          </template>
        </div>

        <p class="text-rosybrown-200 mt-2 flex justify-end text-sm">
          李如龙. 2001. 戚林八音校注. 福州: 福建人民出版社.
        </p>
        <template v-if="processedWordData.cikling.isCommented">
          <hr class="border-rosybrown-100 my-2 border-t-2" />
          <div class="text-rosybrown-800 space-y-1">
            <template
              v-for="(ciklingEntry, index) in processedWordData.cikling
                .ciklingEntries"
              :key="index"
            >
              <SeeSymbol
                v-if="ciklingEntry.comment"
                icon="注释"
                icon-class="text-rosybrown-700"
                >{{ ciklingEntry.comment }}</SeeSymbol
              >
            </template>
          </div>
        </template>
      </div>
    </template>

    <template v-if="processedWordData.seedict.prons.length > 0">
      <Subtitle text="各地方音"></Subtitle>
      <div
        class="text-rosybrown-800 mt-2 mb-5 overflow-hidden rounded-lg bg-white"
      >
        <table class="w-full border-collapse">
          <thead class="bg-rosybrown-300 text-center">
            <tr>
              <th class="py-1 text-white">读音</th>
              <th class="py-1 text-white">连读</th>
              <th class="py-1 text-white">地区</th>
              <th class="hidden py-1 text-white md:block">来源</th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr
              v-for="(pron, index) in processedWordData.seedict.prons"
              :key="index"
            >
              <td class="py-1.5">{{ pron.pron }}</td>
              <td class="flex items-center justify-center py-2 md:hidden">
                <Badge v-if="pron.isSandhi">连</Badge>
                <Badge v-else>本</Badge>
              </td>
              <td class="hidden items-center justify-center py-2 md:flex">
                <Badge v-if="pron.isSandhi">连读音</Badge>
                <Badge v-else>本字音</Badge>
              </td>
              <td class="py-1.5">{{ pron.location }}</td>
              <td class="hidden py-1.5 md:block">{{ pron.origin }}</td>
            </tr>
          </tbody>
        </table>

        <div class="px-8 pb-6" v-if="processedWordData.seedict.commentPron">
          <hr class="border-rosybrown-100 my-2 border-t-2" />
          <SeeSymbol icon="注释" icon-class="text-rosybrown-700">
            {{ processedWordData.seedict.commentPron }}
          </SeeSymbol>
        </div>
      </div>
    </template>

    <template v-if="processedWordData.seedict.phonetics">
      <Subtitle text="注音一览"></Subtitle>
      <div
        class="text-rosybrown-800 mt-2 mb-5 flex flex-wrap gap-3 rounded-lg bg-white px-8 py-6"
      >
        <Badge
          v-if="processedWordData.seedict.phonetics.phonology"
          :content="processedWordData.seedict.phonetics.phonology"
          >音韵地位</Badge
        >

        <Badge
          v-if="processedWordData.seedict.phonetics.banguace"
          :content="processedWordData.seedict.phonetics.banguace"
          >教会罗马字</Badge
        >

        <Badge
          v-if="processedWordData.seedict.phonetics.ipa"
          :content="processedWordData.seedict.phonetics.ipa"
          >IPA</Badge
        >

        <Badge
          v-if="processedWordData.seedict.phonetics.yngping"
          :content="processedWordData.seedict.phonetics.yngping"
          >榕拼</Badge
        >
      </div>
    </template>

    <template v-if="processedWordData.seedict.glyphs.length > 0">
      <Subtitle text="用字一览"></Subtitle>
      <div
        class="text-rosybrown-800 mt-2 mb-5 overflow-hidden rounded-lg bg-white"
      >
        <table class="w-full border-collapse">
          <thead class="bg-rosybrown-300 text-center">
            <tr>
              <th class="py-1 text-white">用字</th>
              <th class="py-1 text-white">类别</th>
              <th class="py-1 text-white">来源</th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr
              v-for="(glyph, index) in processedWordData.seedict.glyphs"
              :key="index"
            >
              <td class="py-1.5">{{ glyph.glyph }}</td>
              <td class="flex items-center justify-center py-2">
                <Badge v-if="glyph.category == '本字'">本字</Badge>
                <Badge v-else :content="glyph.category">俗字</Badge>
              </td>
              <td class="py-1.5">{{ glyph.origin }}</td>
            </tr>
          </tbody>
        </table>

        <div class="px-8 pb-6" v-if="processedWordData.seedict.commentGlyph">
          <hr class="border-rosybrown-100 my-2 border-t-2" />
          <SeeSymbol icon="注释" icon-class="text-rosybrown-700">
            {{ processedWordData.seedict.commentGlyph }}
          </SeeSymbol>
        </div>
      </div>
    </template>
  </PageContent>
</template>

<script lang="ts" setup>
import { computed, onBeforeUpdate, onMounted } from 'vue';
import Badge from '../components/Badge.vue';
import CikLingBlock from '../components/CikLingBlock.vue';
import ExplanationBlock from '../components/ExplanationBlock.vue';
import PageContent from '../components/PageContent.vue';
import SeeSymbol from '../components/SeeSymbol.vue';
import SideBar from '../components/SideBar.vue';
import Subtitle from '../components/Subtitle.vue';
import {
  makeYngpingRubyInner,
  replaceChineseQuotes,
} from '../utils/typography';

onMounted(() => {
  document.title = processedWordData.value.seedict.text
    ? `${processedWordData.value.seedict.text} - 词汇`
    : `米时典 SeeDict - 词汇`;
});

onBeforeUpdate(() => {
  document.title = processedWordData.value.seedict.text
    ? `${processedWordData.value.seedict.text} - 词汇`
    : `米时典 SeeDict - 词汇`;
});

const processedWordData = computed(() => {
  const hasComment = wordData.cikling.ciklingEntries.some(
    (entry) => entry.comment?.trim() !== ''
  );

  return {
    ...wordData,
    cikling: {
      ...wordData.cikling,
      isCommented: hasComment,
    },
  };
});

const wordData = {
  seedict: {
    text: '盡',
    glyphs: [
      { glyph: '会', category: '训读字', origin: '《福州方言词典》' },
      { glyph: '⿰亻鞋', category: '形声字', origin: '《福州方言词典》' },
      { glyph: '解', category: '本字', origin: '《福州方言词典》' },
    ],
    commentGlyph: 'SeeDict 对用字的注释……',
    pronPrimary: 'zeing242',
    prons: [
      {
        pron: 'zeing242',
        isSandhi: false,
        location: '市区',
        origin: '《福州方言词典》',
      },
      {
        pron: 'zeing242',
        isSandhi: true,
        location: '市区',
        origin: '《福州方言词典》',
      },
      {
        pron: 'zeing242',
        isSandhi: false,
        location: '古田',
        origin: '用户贡献',
      },
    ],
    commentPron: 'SeeDict 对读音的注释……',
    phonetics: {
      phonology: '曾賓下去',
      ipa: 'tsɛiŋ˨˦˨',
      banguace: 'cêng',
      yngping: 'zeing242',
    },
    expls: [
      {
        lexical: '动词',
        expl: '全部用出。',
        sent: ['～塍～厝去做道場。', '～我蜀世面去去勸化伊。'],
      },
      {
        lexical: '副词',
        expl: '完，達到極端。',
        sent: ['厝世乇都乞賊偷～去。'],
      },
      {
        lexical: '副词',
        expl: '的確，確實。',
        sent: ['～好看。', '～快。', '～清楚。'],
      },
    ],
    comment: 'SeeDict 对释义注……',
    synonym: '近义词……',
    antonym: '反义词……',
  },
  feng: {
    text: '其',
    pronLiteral: '/ki˥˧/',
    pronSandhi: '/ki˥˧/',
    expls: [
      {
        expl: '用在定語的後面。',
        sent: [],
        node: [
          {
            expl: '定語是指人的名詞或人稱代詞，中心詞和前邊的動詞合起來表示一種動作，意思是這個人是所說的動作的受事者。',
            sent: [
              '去討（找）伊～麻煩。',
              '伊結伊～婚，儂家（我們）開儂家～會。',
            ],
          },
        ],
      },
      {
        expl: '用來造成沒有中心詞的“其”字結構。',
        sent: [],
        node: [
          {
            expl: '“其”字前後用相同的動詞、形容詞等，連用這樣的結構，表示有這樣的，有那樣的。',
            sent: ['大～大，細（小）～細。', '笑～笑，啼（哭）～啼。'],
          },
        ],
      },
      {
        expl: '用在謂語動詞後面，强調这動作的施事者或時間、地點、方式等。',
        sent: [
          '{底,俤}儂（誰）買～書？。',
          '昨暝拍（買）～票。',
          '我{乍,才}（才）食～飯。',
        ],
      },
      {
        expl: '用在陳述句的末尾，表示肯定的語氣。',
        sent: [
          '{這,者*}事我會做～。',
          '{這,者*}儂我會認～。',
          '依爸會拍（打）～。',
        ],
      },
      {
        expl: '用在狀語的後面。',
        sent: ['{一,蜀}日（整天）無停無歇～做。', '汝給我定定～坐𡅏。'],
      },
      {
        expl: '量詞，用於沒有專用量詞的名詞。',
        sent: [
          '兩～青年哥（年輕人）。',
          '三～蘋果。',
          '{一,蜀}～儂。',
          '△{一,蜀}～睏，浸水蟶（指一個人睡很冷），兩～睏，快活仙。',
        ],
      },
    ],
    comment:
      '義項①②③④相當於北京話的“的”，⑤相當於北京話的“地”，⑥相當於北京話的“個”。本地也寫作“唭、倛”。',
    correction: 'SeeDict 对冯书的校正……',
    refPage: '232',
  },
  cikling: {
    ciklingEntries: [
      {
        text: '盡',
        tone: '下去',
        cikFinal: '賓',
        cikInitial: '曾',
        cikAnnotation: '竭～',
        liAnnotateCik: '原书给出的校注……',
        liAnnotateCikOrder: 12,
        lingFinal: '之',
        lingInitial: '京',
        lingAnnotation: '竭～',
        comment: 'SeeDict 给出的注释……',
      },
      {
        text: '尽',
        tone: '下去',
        cikFinal: '賓',
        cikInitial: '曾',
        cikAnnotation: '竭～',
        lingFinal: '之',
        lingInitial: '京',
        lingAnnotation: '竭～',
        liAnnotateLing: '原书给出的校注……',
        liAnnotateLingOrder: 14,
      },
      {
        text: '盡',
        tone: '下去',
        cikFinal: '賓',
        cikInitial: '曾',
        cikAnnotation: '竭～',
        liAnnotateCik: '只出现在戚书中的条目',
        liAnnotateCikOrder: 16,
        comment: 'SeeDict 给出的注释……',
      },
    ],
  },
};
</script>
