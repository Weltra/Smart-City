<template>
  <div class="GridTable">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="像元形状">
        <el-select v-model.lazy="fromData.shape" placeholder="请输入" clearable>
          <el-option label="圆形" value="circle" />
          <el-option label="正方形" value="square" />
        </el-select>
      </el-form-item>
      <el-form-item label="色带样式">
        <el-select v-model.lazy="fromData.color" placeholder="请输入" clearable>
          <el-option label="色带1" :value="0" />
          <el-option label="色带2" :value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="像元密度">
        <!-- size属性范围未知，需要修改！！！！！！！ -->
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
    </el-form>
  </div>
</template>
<script setup>
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
const { scene,map } = inject('$scene_map')

// 定义标签页中定义的图层类型
const fromData = reactive({
  type: 'grid',
  shape: 'circle',
  color: 0,
  size: 2000,
  coverage: 0.9,
})

// 保存临时的渲染数据
const tempSize = ref(fromData.size / 100)
const tempCoverage = ref(fromData.coverage * 100)
// 保存色带数据
const colorList = ref([
  ['#FF4818', '#F7B74A', '#FFF598', '#91EABC', '#2EA9A1', '#206C7C'].reverse(),
  ['#FF4818', '#F7B74A', '#FFF598', '#F27DEB', '#8C1EB2', '#421EB2'].reverse(),
])

watch(fromData, async (newValue, oldValue) => {
  let oldLayer = scene.getLayerByName('gridmap')
  oldLayer && scene.removeLayer(oldLayer)
  // 生成默认图层
  const newLayer = await useCsv(
    'gridmap',
    newValue.type,
    newValue.size,
    newValue.shape,
    newValue.coverage,
    colorList.value[newValue.color]
  )
  // 加载默认图层
  scene.addLayer(newLayer)
})

// 界面渲染，生成默认图层
onMounted(async () => {
  let oldLayer = scene.getLayerByName('gridmap')
  oldLayer && scene.removeLayer(oldLayer)
  // 生成默认图层
  const Layer = await useCsv(
    'gridmap',
    fromData.type,
    fromData.size,
    fromData.shape,
    fromData.coverage,
    colorList.value[fromData.color]
  )
  // 加载默认图层
  scene.addLayer(Layer)
  map.flyTo({
      center: [118.7, 30.25],
      zoom: 7,
      pitch: 0,
    })
})

// 销毁时去除所有图层
onUnmounted(() => {
  let oldLayer = scene.getLayerByName('gridmap')
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

.GridTable {
  margin-left: 10px;
  /* height: 400px; */
}
</style>
