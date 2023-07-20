<template>
  <Header />
  <SmartCity />
  <MapControls />
</template>

<script setup>
// 导入组件
import SmartCity from './views/SmartCity/index.vue'
import MapControls from './components/MapControls.vue'
import Header from './components/Header.vue'
</script>

<style>
.mapboxgl-ctrl {
  display: none !important;
}
</style>
