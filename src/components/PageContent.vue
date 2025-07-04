<template>
  <div class="bg-wheat-50 h-full min-h-[100vh] w-full">
    <NavBar></NavBar>

    <div
      class="bg-whear-100 px-96 py-5"
      style="min-height: calc(100vh - 130px - var(--spacing) * 56)"
    >
      <!-- 内联样式暂时没有优雅的方法 -->
      <slot></slot>
    </div>
    <Footer class="relative bottom-0 w-full"></Footer>
  </div>
</template>

<script setup lang="ts">
import NavBar from '../components/NavBar.vue';
import Footer from '../components/Footer.vue';
</script>
