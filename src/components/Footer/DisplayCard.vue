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
    <el-dialog v-model="dialogTableVisible" title="事故详情">
      <el-table :data="dialogTableData" type="expand">
        <el-table-column property="event_num" label="编号" />
        <el-table-column property="geometry.coordinates[0]" label="坐标经度" />
        <el-table-column property="geometry.coordinates[1]" label="坐标纬度" />
        <el-table-column property="name" label="事故类型" />
        <el-table-column property="area" label="事故区域" />
        <el-table-column property="car_num" label="车牌号" />
        <el-table-column property="level" label="事故等级" />
        <el-table-column property="phone" label="手机号" />
      </el-table>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogTableVisible = false">Cancel</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, inject, onBeforeUnmount } from 'vue'
import { PointLayer } from '@antv/l7'
import { ref } from 'vue'

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
  markLayer.shape('radar').size(20).color('#f00').animate(true)
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
  console.log(dialogTableData)
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
