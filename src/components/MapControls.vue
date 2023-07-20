<template></template>

<script setup>
import { inject, onMounted } from 'vue'
import { Logo, Zoom, Fullscreen, MouseLocation, MapTheme } from '@antv/l7'
onMounted(() => {
  const { scene } = inject('$scene_map')
  // logo控件
  const logo = new Logo({
    // 图片 url
    img: 'https://img.gejiba.com/images/dfdb6db1623eb881e724f58d9a366af8.png',
    // 跳转地址
    href: 'http://www.x-zd.com/',
  })
  scene.addControl(logo)

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
    position: 'rightbottom',
  })
  scene.addControl(mouseLocation)

  // 主题控件
  const mapTheme = new MapTheme({})
  scene.addControl(mapTheme)
})
</script>
<style></style>
