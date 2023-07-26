<template></template>

<script setup>
// 导入vue
import { inject, onMounted } from 'vue'
import useBuildings from './hooks/useBuildings'
import useRoads from './hooks/useRoads'


onMounted(async () => {
  // 通过inject, 获取地图场景对象
  const { scene, map } = inject('$scene_map')

  const building_layer = await useBuildings()
  scene.addLayer(building_layer)

  const roads_layer = await useRoads()
  scene.addLayer(roads_layer)
})
</script>

<style></style>
