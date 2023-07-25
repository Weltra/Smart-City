<template>
  <div>
    <el-table :data="tableData">
      <el-table-cloumn prop="event_num"></el-table-cloumn>
      <el-table-cloumn prop="name" label="类型"></el-table-cloumn>
      <el-table-cloumn label="操作">
        <el-button size="small">详情</el-button>
      </el-table-cloumn>
    </el-table>
  </div>
</template>

<script setup>
const props = defineProps({
  tableData: {
    type: Array,
  },
})
</script>

<style scoped>

</style>
