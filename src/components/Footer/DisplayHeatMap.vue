<template>
  <!-- popover弹出框 -->
  <el-popover
    placement="top"
    trigger="click"
    popper-style="background-color:#53697670;color:#fff"
    :width="250"
    :visible="visible"
  >
    <template #reference>
      <!-- 按钮插槽 -->
      <slot></slot>
    </template>
    <!-- pop弹出内容 -->
    <el-form class="popover-w">
      <el-form-item label="图例样式">
        <el-select v-model="typeForm.type" placeholder="选择">
          <el-option label="2D样式" value="0" />
          <el-option label="3D样式" value="1" />
        </el-select>
      </el-form-item>
    </el-form>
    <el-form class="popover-w">
      <el-form-item label="色带样式">
        <el-select v-model="typeForm.color" placeholder="选择">
          <el-option label="色带1" value="0" />
          <el-option label="色带2" value="1" />
        </el-select>
      </el-form-item>
    </el-form>
    <el-form class="popover-w">
      <el-button type="success" :icon="Check" @click="changeVisable" circle />
    </el-form>
  </el-popover>
</template>
<script setup>
import { Check } from '@element-plus/icons-vue'
import { inject, ref } from 'vue'
const { scene, map } = inject('$scene_map')
import useHeatData from '@/views/SmartCity/hooks/useHeatData.js'

const props = defineProps({
  visible: {
    type: Boolean,
  },
  typeForm: {
    type: Object,
  },
})

const emits = defineEmits(['changeVisable'])

async function changeVisable() {
  emits('changeVisable')
}

// do not use same name with ref
// const form = reactive({
//   type: 'heatmap',
//   color: 1,
// })
</script>
<style scoped>
.popover-w {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

:deep(.el-form-item__label) {
  color: #fff;
}
</style>
