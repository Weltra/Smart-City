<template>
  <Header></Header>
  <SmartCity />
  <MapControls />
  <G2Charts v-show="showCharts" />
  <Footer @toggleCharts="handleCharts"> </Footer>
</template>

<script setup>
// 导入组件
import SmartCity from './views/SmartCity/index.vue'
import MapControls from './components/MapControls.vue'
import Header from './components/Header.vue'
import G2Charts from './components/G2Charts/index.vue'
import Footer from './components/Footer/index.vue'

import { ref } from 'vue'

const showCharts = ref(true)
function handleCharts(value) {
  showCharts.value = value
}
</script>

<style>
.mapboxgl-ctrl {
  display: none !important;
}
</style>
