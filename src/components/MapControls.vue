<template></template>

<script setup>
import { inject, onMounted } from 'vue'
import { Zoom, Fullscreen, MouseLocation, MapTheme } from '@antv/l7'
onMounted(() => {
  const { scene } = inject('$scene_map')

  // 缩放控件
  const zoom = new Zoom({
    zoomInTitle: '放大',
    zoomOutTitle: '缩小',
    position: 'bottomright',
  })
  scene.addControl(zoom)

  // 全屏控件
  const fullscreen = new Fullscreen({
    btnText: '全屏',
    exitBtnText: '退出全屏',
  })
  scene.addControl(fullscreen)

  // 鼠标位置控件
  const mouseLocation = new MouseLocation({
    transform: (position) => {
      return position
    },
    position: 'leftbottom',
  })
  scene.addControl(mouseLocation)

  // 主题控件
  const mapTheme = new MapTheme({})
  scene.addControl(mapTheme)
})
</script>
<style></style>
