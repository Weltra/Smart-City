<template>
  <div class="display-card">
    <div class="table-container">
      <el-table
        :data="computedData"
        size="small"
        :max-height="400"
        @row-click="rowClick"
      >
        <el-table-column prop="event_num" label="事件编号"></el-table-column>
        <el-table-column prop="name" label="类型"></el-table-column>
        <el-table-column label="操作" fixed="right" v-slot="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="detailClick(scope.$index)"
            >详情</el-button
          >
        </el-table-column>
      </el-table>
    </div>
    <DisplayDialog
      v-model:dialogTableData="dialogTableData"
      v-model:dialogTableVisible="dialogTableVisible"
    ></DisplayDialog>
  </div>
</template>

<script setup>
import { computed, inject, onBeforeUnmount } from 'vue'
import { PointLayer } from '@antv/l7'
import { ref } from 'vue'
import DisplayDialog from './DisplayDialog.vue'

const { scene, map } = inject('$scene_map')

let markLayer = null
let dialogTableVisible = ref(false)
let dialogTableData = ref(null)

const props = defineProps({
  tableData: {
    type: Array,
  },
})

const computedData = computed(() => {
  return props.tableData.map((row) => {
    const {
      geometry,
      properties: { area, car_num, event_num, name, level, phone },
    } = row
    return {
      geometry,
      area,
      car_num,
      event_num,
      name,
      level,
      phone,
    }
  })
})

function rowClick(row) {
  markLayer && scene.removeLayer(markLayer)
  // 添加动态点
  const data = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: row.geometry.coordinates,
        },
        properties: {
          name: 'marker',
        },
      },
    ],
  }

  markLayer = new PointLayer({}).source(data)
  //在地图中添加动态点
  markLayer
    .shape('circle')
    .size(60)
    .color('#f00')
    .active({ color: '#00EE00' })
    .animate({ enable: true, rings: 4 })
  scene.addLayer(markLayer)
  // 视角飞到事故点
  map.flyTo({
    //飞行的中心点
    center: row.geometry.coordinates,
    //飞行之后地图的放大级别
    zoom: 15,
    //控制飞行的速度
    speed: 0.4,
    /* 俯仰角0-90 */
    pitch: 30,
  })
}

function detailClick(rownum) {
  dialogTableVisible.value = true
  dialogTableData.value = computedData.value.slice(rownum, rownum + 1)
}

onBeforeUnmount(() => {
  markLayer && scene.removeLayer(markLayer)
})
</script>

<style scoped>
.display-card {
  position: fixed;
  bottom: 80px;
  background: #53697670;
  border-radius: 4px;
  box-shadow: 0 0 5px 3px #333;
}
:deep(.eleCeil) {
  background: transparent;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.table-container:deep(.el-table) {
  background-color: transparent;
}

.table-container:deep(.el-table tr) {
  background-color: transparent;
  color: #fff;
  cursor: pointer;
}

.table-container:deep(.el-table tr:hover) {
  background-color: rgba(0, 0, 0, 0.3);
}

.table-container:deep(
    .el-table--enable-row-transition .el-table__body td.el-table__cell
  ) {
  background-color: transparent;
}

.table-container:deep(.el-table th.el-table__cell) {
  background-color: transparent;
}

.table-container:deep(.el-table td.el-table__cell) {
  border-bottom: none;
}

.table-container:deep(.el-table__inner-wrapper::before) {
  height: 0;
}
.table-container:deep(
    .el-table.is-scrolling-none th.el-table-fixed-column--right
  ) {
  background-color: transparent;
}
</style>
