<template>
  <!-- 我们使用el-popover组件，将BottomTool中的内容插入进来 -->
  <el-popover
    placement="top"
    :width="100"
    trigger="click"
    popper-style="background-color: #53697670;color:#fff"
  >
    <template #reference>
      <slot></slot>
    </template>
    <!-- 这里是popover中的内容 -->
    <div class="popover-w">
      <i
        v-for="item in tools"
        :class="computeClass(item)"
        @click="queryEvents(item)"
      ></i>
    </div>
  </el-popover>
</template>

<script setup>
import useDraw from './hooks/useDraw.js'

import { ref, computed } from 'vue'
// 绘制项，我们使用这个数组进行循环
const tools = ref([
  'drawPolygonTool',
  'drawRectTool',
  'drawCircleTool',
  'delete',
])
// 每一项的样式，这里使用计算属性，计算每一项应该使用哪个icon
const computeClass = computed(() => (item) => {
  const res = {
    iconfont: true,
    'query-item': true,
  }
  res[`icon-${item}`] = true
  return res
})

const { queryEvents } = useDraw()
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
