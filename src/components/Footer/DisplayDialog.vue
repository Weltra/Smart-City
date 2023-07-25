<template>
  <div class="display-dialog">
    <el-dialog v-model="props.dialogTableVisible" title="Shipping address">
      <el-table :data="props.tableData">
        <el-table-column property="" label="编号" width="150" />
        <el-table-column property="" label="坐标经度" width="200" />
        <el-table-column property="坐标纬度" label="Address" />
        <el-table-column property="" label="事故类型" width="150" />
        <el-table-column property="" label="事故区域" width="200" />
        <el-table-column property="车牌号" label="Address" />
        <el-table-column property="" label="事故等级" width="150" />
        <el-table-column property="" label="手机号" width="200" />
      </el-table>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="props.dialogTableVisible = false"
            >Cancel</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
const props = defineProps({
  tableData: {
    type: Array,
  },
  clicknumber: {
    typr: Number,
  },
  dialogTableVisible: {
    type: Boolean,
  },
})
</script>

<style scoped></style>
