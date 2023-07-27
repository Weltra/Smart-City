<template>
  <div class="BeeTable">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="像元形状">
        <el-select v-model.lazy="fromData.shape" placeholder="请输入" clearable>
          <el-option label="蜂窝平面" value="hexagon" />
          <el-option label="蜂窝柱状图" value="hexagonColumn" />
        </el-select>
      </el-form-item>
      <el-form-item label="色带样式">
        <el-select
          v-model.lazy="fromData.color"
          placeholder="请输入"
          ref="colorSelect"
          clearable
        >
          <el-option
            v-for="item in colorList"
            :key="item.id"
            :label="item.label"
            :value="item.value"
          >
            <colorBar :list="item.list" :id="item.id"></colorBar>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="像元密度">
        <el-slider
          v-model="tempSize"
          @change="
            (val) => {
              fromData.size = val * 100
            }
          "
          :format-tooltip="
            (val) => {
              return val * 100
            }
          "
        />
      </el-form-item>
      <el-form-item label="像元大小">
        <!-- 密度范围为0-1 -->
        <el-slider
          v-model="tempCoverage"
          @change="(val) => (fromData.coverage = val / 100)"
          :format-tooltip="
            (val) => {
              return val / 100
            }
          "
        />
      </el-form-item>
      <el-form-item label="对比度" v-if="fromData.shape === 'hexagonColumn'">
        <!-- 密度范围为0-1 -->
        <el-slider
          v-model="base"
          :show-tooltip="false"
          @change="(val) => (fromData.base = val * 10)"
        />
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import colorBar from '../../../components/ColorBar/colorBar.vue'
import {
  computed,
  reactive,
  ref,
  watch,
  onMounted,
  inject,
  onUnmounted,
} from 'vue'

// name:图层名称
// type:样式类型 !
// size:单元大小(未知) !
// shape:像元形状 ！
// coverage:像元密度
// colorList:色带列表 ！

import useCsv from '../../SmartCity/hooks/useCsv'
import useCsvColumn from '../../SmartCity/hooks/useCsvColumn'
const { scene, map } = inject('$scene_map')

// 定义标签页中定义的图层类型
const fromData = reactive({
  type: 'hexagon',
  shape: 'hexagon',
  color: 0,
  size: 2000,
  coverage: 0.9,
  base: 100, //10-1000
})

// 保存临时的渲染数据
const tempSize = ref(fromData.size / 100)
const tempCoverage = ref(fromData.coverage * 100)
const base = ref(fromData.base / 10)

// 保存色带数据
const colorList = ref([
  {
    id: 1,
    value: 0,
    label: '色带一',
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
    label: '色带二',
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

watch(fromData, async (newValue, oldValue) => {
  let oldLayer = scene.getLayerByName('hexagonmap')
  oldLayer && scene.removeLayer(oldLayer)
  // console.log(newValue)
  if (newValue.shape === 'hexagon') {
    // 生成平面图层
    let newLayer = await useCsv(
      'hexagonmap',
      newValue.type,
      newValue.size,
      newValue.shape,
      newValue.coverage,
      colorList.value[newValue.color].list
    )
    // 加载新图层
    scene.addLayer(newLayer)
  } else {
    let newLayer = await useCsvColumn(
      'hexagonmap',
      newValue.type,
      newValue.size,
      newValue.shape,
      newValue.coverage,
      colorList.value[newValue.color].list,
      newValue.base
    )
    // 加载新图层
    scene.addLayer(newLayer)
  }
})

// 界面渲染，生成默认图层
onMounted(async () => {
  let oldLayer = scene.getLayerByName('hexagonmap')
  oldLayer && scene.removeLayer(oldLayer)
  // 生成默认图层
  const Layer = await useCsv(
    'hexagonmap',
    fromData.type,
    fromData.size,
    fromData.shape,
    fromData.coverage,
    colorList.value[fromData.color].list
  )
  // 加载默认图层
  scene.addLayer(Layer)
})

// 销毁时去除所有图层
onUnmounted(() => {
  let oldLayer = scene.getLayerByName('hexagonmap')
  oldLayer && scene.removeLayer(oldLayer)
})
</script>
<style scoped>
:deep(.el-form-item__label) {
  color: #efefef;
}

:deep(.el-form) {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.BeeTable {
  margin-left: 10px;
  /* height: 400px; */
}
</style>
