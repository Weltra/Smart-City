<template>
  <div>
    <div class="text">{{ `色带${props.id}:` }}</div>
    <div id="colorBar" ref="colorBar"></div>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'

// 配置样式属性
const props = defineProps({
  list: {
    type: Array,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
})

onMounted(() => {
  colorBar[
    props.id - 1
  ].style.backgroundImage = `linear-gradient(to right, ${props.list})`
  colorBar[props.id - 1].style.marginTop = '2px'
  colorBar[props.id - 1].style.color = '#fff'
  // colorBar[props.id - 1].style.width = '20px'
})
</script>
<style scoped>
#colorBar {
  border-radius: 3px;
  height: 20px;
  width: 110px;
  display: inline-block;
  vertical-align: middle;
}
.text {
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  margin-right: 5px;
}
</style>
