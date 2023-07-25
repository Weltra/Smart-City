<template>
  <el-popover
    placement="top"
    trigger="click"
    popper-style="background-color:#53697670;color:#fff"
    :width="100"
  >
    <template #reference>
      <slot></slot>
    </template>
    <div class="popover-w">
      <i
        v-for="item in tools"
        :class="computedClass(item)"
        @click="queryEvents(item)"
      ></i>
    </div>
  </el-popover>
  <DisplayCard v-if=""></DisplayCard>
</template>

<script setup>
import {DisplayCard} from './DisplayCard.vue'
import { computed, inject, onMounted, ref } from 'vue'
import { DrawEvent, DrawPolygon, DrawCircle, DrawRect } from '@antv/l7-draw'
import { point, polygon, booleanPointInPolygon } from '@turf/turf'
import { getEvents } from '@/api/smart_city.js'


// 定义普通数据
let eventsData = null
let dataSource =null
// 定义tools
const tools = ref([
  'drawPolygonTool',
  'drawRectTool',
  'drawCircleTool',
  'delete',
])
// 定义计算属性
const computedClass = computed(() => {
  return (item) => {
    const res = {
      iconfont: true,
      'query-item': true,
    }
    res[`icon-${item}`] = true
    return res
  }
})
// 在onMounted中获取事故数据
onMounted(async () => {
  const res = await getEvents()
  eventsData = res.features
})

// 定义查询绘制函数
let draw = null
const { scene } = inject('$scene_map')
function queryEvents(type) {
  if (draw) {
    draw.disable()
    draw.clear()
  }
  switch (type) {
    case 'drawPolygonTool':
      draw = new DrawPolygon(scene, {})
      break
    case 'drawRectTool':
      draw = new DrawRect(scene, {})
      break
    case 'drawCircleTool':
      draw = new DrawCircle(scene, {})
      break
    default:
      draw = null
      return
  }
  draw.enable()
  draw.on(DrawEvent.Change, (allFeatures) => {
    // 找出最后绘制的图形(多边形)
    const activeFeature = allFeatures[allFeatures.length - 1]
    // 只保留最后绘制的图形
    allFeatures.forEach((item, index) => {
      if (index !== allFeatures.length - 1) {
        draw.removeFeature(item)
      }
    })

    if (eventsData.length && activeFeature) {
      const {
        geometry: { coordinates: coordinatesActive },
      } = activeFeature

      // 使用turf判断哪些事故点落在绘制的拉框中
      const resData = eventsData.filter((item) => {
        const { geometry } = item
        if (geometry.type === 'Point') {
          const pt = point(geometry.coordinates)
          const poly = polygon(coordinatesActive)
          const isInArea = booleanPointInPolygon(pt, poly)
          return isInArea
        }
      })
      console.log(resData)
    }
  })
}
</script>

<style scoped>
.el-button + .el-button {
  margin-left: 8px;
}

.popover-w {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.query-item:hover {
  cursor: pointer;
  background: linear-gradient(
    to bottom,
    rgba(0, 128, 255, 0.6),
    rgba(0, 128, 255, 0.281)
  );
}
</style>
