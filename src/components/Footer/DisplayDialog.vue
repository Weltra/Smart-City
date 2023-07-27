<template>
  <div class="display-dialog">
    <el-dialog
      :model-value="dialogTableVisible"
      :before-close="CloseClick"
      title="事故详情"
      width="65%"
      border
    >
      <el-table :data="dialogTableData">
        <el-table-column property="event_num" label="编号" align="center" />
        <el-table-column
          property="geometry.coordinates[0]"
          label="坐标经度"
          width="120"
          align="center"
        />
        <el-table-column
          property="geometry.coordinates[1]"
          label="坐标纬度"
          width="120"
          align="center"
        />
        <el-table-column property="name" label="事故类型" align="center" />
        <el-table-column property="area" label="事故区域" align="center" />
        <el-table-column
          property="car_num"
          label="车牌号"
          width="120"
          align="center"
        />
        <el-table-column property="level" label="事故等级" align="center" />
        <el-table-column
          property="phone"
          label="手机号"
          width="120"
          align="center"
        />
      </el-table>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="CloseClick">退出</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
const props = defineProps({
  dialogTableData: {
    type: Array,
  },
  dialogTableVisible: {
    type: Boolean,
  },
})

const emit = defineEmits(['update:dialogTableVisible'])

function CloseClick() {
  emit('update:dialogTableVisible', false)
}
</script>

<style scoped>
:deep(.el-table .cell) {
  white-space: nowrap;
}
</style>
