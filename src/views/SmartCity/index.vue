<template>
  <Header></Header>
  <MapControls />
  <G2Charts v-show="showCharts" />
  <Footer @toggleCharts="handleCharts"> </Footer>
</template>

<script setup>
// 导入vue
import { inject, onMounted } from 'vue'
import useBuildings from './hooks/useBuildings'
import useRoads from './hooks/useRoads'
import MapControls from '@/components/MapControls.vue'
import Header from '@/components/Header.vue'
import G2Charts from '@/components/G2Charts/index.vue'
import Footer from '@/components/Footer/index.vue'

import { ref } from 'vue'

const showCharts = ref(true)
function handleCharts(value) {
  showCharts.value = value
}

onMounted(async () => {
  // 通过inject, 获取地图场景对象
  const { scene, map } = inject('$scene_map')

  const building_layer = await useBuildings()
  scene.addLayer(building_layer)

  const roads_layer = await useRoads()
  scene.addLayer(roads_layer)
})
</script>

<style>
.mapboxgl-ctrl {
  display: none !important;
}
</style>
