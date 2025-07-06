<template>
  <div class="bg-wheat-50 h-full min-h-[100vh] w-full">
    <NavBar></NavBar>
    <div
      class="items-center py-5"
      style="min-height: calc(100vh - 130px - var(--spacing) * 56)"
    >
      <!-- 内联样式暂时没有优雅的方法 -->
      <div class="w-2xl mx-auto">
        <slot></slot>
      </div>
    </div>

    <Footer class="relative bottom-0 w-full"></Footer>
  </div>
</template>

<script setup lang="ts">
import NavBar from '../components/NavBar.vue';
import Footer from '../components/Footer.vue';
</script>
