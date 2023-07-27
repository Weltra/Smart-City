<template>
  <div class="ClassicTable">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="图例样式">
        <el-select v-model.lazy="fromData.type" placeholder="请输入" clearable>
          <el-option label="2D样式" value="heatmap" />
          <el-option label="3D样式" value="heatmap3D" />
        </el-select>
      </el-form-item>
      <el-form-item label="色带样式">
        <el-select v-model.lazy="fromData.color" placeholder="请输入" clearable>
          <!-- 自定标签样式，更换为色带 -->
          <!-- <el-option
            v-for="item in colorList"
            :key="item.id"
            :list="item.list"
            :value="item.value"
          >
            
          </el-option> -->
          <el-option label="色带1" :value="0" />
          <el-option label="色带2" :value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="尺寸大小">
        <el-slider
          v-model="tempSize"
          @change="
            (val) => {
              fromData.size = val
            }
          "
        />
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import {
  computed,
  onMounted,
  reactive,
  ref,
  watch,
  inject,
  onUnmounted,
} from 'vue'
import useHeatData from '../../SmartCity/hooks/useHeatData'
const { scene, map } = inject('$scene_map')
// 加载色带数组
const colorList = ref([
  {
    id: 1,
    value: 0,
    list: [
      '#FF4818',
      '#F7B74A',
      '#FFF598',
      '#91EABC',
      '#2EA9A1',
      '#206C7C',
    ].reverse(),
  },
  {
    id: 2,
    value: 1,
    list: [
      '#FF4818',
      '#F7B74A',
      '#FFF598',
      '#F27DEB',
      '#8C1EB2',
      '#421EB2',
    ].reverse(),
  },
])

// 配置成图数据
const fromData = reactive({
  type: 'heatmap',
  color: 0,
  size: 1,
})
// 配置临时绑定
const tempSize = ref(fromData.size)

watch(fromData, async (newValue, oldValue) => {
  let oldLayer = scene.getLayerByName('heatmap')
  oldLayer && scene.removeLayer(oldLayer)
  if (newValue.type === 'heatmap3D') {
    map.flyTo({
      center: [120.0, 30.25],
      zoom: 8.5,
      pitch: 60,
    })
  } else {
    map.flyTo({
      center: [120.0, 30.25],
      zoom: 8.5,
      pitch: 0,
    })
  }
  // 生成默认图层
  const newLayer = await useHeatData(
    'heatmap',
    newValue.type,
    colorList.value[newValue.color].list,
    newValue.size
  )
  // 加载默认图层
  scene.addLayer(newLayer)
})

onMounted(async () => {
  let oldLayer = scene.getLayerByName('heatmap')
  oldLayer && scene.removeLayer(oldLayer)
  // 生成默认图层
  const Layer = await useHeatData(
    'heatmap',
    fromData.type,
    colorList.value[fromData.color].list,
    fromData.size
  )
  // 加载默认图层
  scene.addLayer(Layer)
})

// 销毁时去除所有图层
onUnmounted(() => {
  let oldLayer = scene.getLayerByName('heatmap')
  oldLayer && scene.removeLayer(oldLayer)
})
</script>
<style scoped>
:deep(.el-form-item__label) {
  color: #efefef;
}

:deep(.el-form) {
  /* height: 300px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.ClassicTable {
  margin-left: 10px;
}

.styleList {
  padding: 0px 10px;
}
</style>
