<template>
  <footer class="footer">
    <div class="btn-groups">
      <div class="item">
        <button class="toggle-btn" @click="handleRotation">
          <i class="iconfont icon-fuwudiqiu"></i>
        </button>
        <p>{{ mark }}</p>
      </div>
      <div class="item">
        <button class="toggle-btn" @click="toggleCharts">
          <i class="iconfont icon-supervision-full"></i>
        </button>
        <p>控制中心</p>
      </div>
      <div class="item">
        <button class="toggle-btn" @click="flyTo">
          <i class="iconfont icon-icon-test"></i>
        </button>
        <p>{{ flyMsg }}</p>
      </div>
      <div class="item">
        <DrawTool>
          <button class="toggle-btn">
            <i class="iconfont icon-paint"></i>
          </button>
        </DrawTool>
        <p>事故查询</p>
      </div>
      <div class="item">
        <!-- <DisplayHeatMap
          :visible="visible"
          :typeForm="typeForm"
          @changeVisable="changeShow"
        >
          <button class="toggle-btn" @click="changeVisible">
            <i class="iconfont icon-paint"></i>
          </button>
        </DisplayHeatMap> -->
        <router-link to="/home/heatMap">
          <button class="toggle-btn" @click="transHangZhou">
            <i class="iconfont icon-paint"></i>
          </button>
        </router-link>
        <p>热力分析</p>
      </div>
    </div>
    <router-view></router-view>
  </footer>
</template>

<script setup>
import DrawTool from './DrawTools.vue'
import useRotation from './hooks/useRotation'
import useFly from './hooks/useFly'
const { mark, handleRotation } = useRotation()
const { flyTo, flyMsg } = useFly()
import { ref, inject, reactive, onMounted } from 'vue'
import useHeatData from '@/views/SmartCity/hooks/useHeatData.js'
const { scene, map } = inject('$scene_map')
import { useRouter } from 'vue-router'

//初始化路由
const router = useRouter()
// 设置pop显示
const visible = ref(false)
// 设置色带列表
const typeList = ref(['heatmap', 'heatmap3D'])
const colorList = ref([
  ['#2E8AE6', '#69D1AB', '#DAF291', '#FFD591', '#FF7A45', '#CF1D49'].reverse(),
  ['#FF4818', '#F7B74A', '#FFF598', '#F27DEB', '#8C1EB2', '#421EB2'].reverse(),
])
// 初始化表单数据
const typeForm = reactive({
  type: '',
  color: '',
})

let isShow = ref(true)
const emits = defineEmits(['toggleCharts'])

// 飞行杭州并去除图表
function transHangZhou() {
  isShow = false
  emits('toggleCharts', isShow)
  map.flyTo({
    center: [120.2, 30.25],
    zoom: 10,
    pitch: 0,
  })
}

async function changeVisible() {
  // 添加默认热力图
  visible.value = !visible.value
  map.flyTo({
    center: [120.2, 30.25],
    zoom: 10,
    pitch: 0,
  })
  let heatmap = scene.getLayerByName('heatmap')
  if (!heatmap) {
    heatmap = await useHeatData(typeList.value[0], colorList.value[0])
    scene.addLayer(heatmap)
  }
}

async function changeShow() {
  visible.value = !visible.value
  let heatmap = scene.getLayerByName('heatmap')
  // console.log(heatmap)
  // 去除已有图层
  if (heatmap !== undefined) {
    scene.removeLayer(heatmap)
    heatmap = await useHeatData(
      typeList.value[typeForm.type],
      colorList.value[typeForm.color]
    )
    scene.addLayer(heatmap)
  }
}

function toggleCharts() {
  isShow = !isShow
  emits('toggleCharts', isShow)
}
</script>

<style scoped>
@import 'https://at.alicdn.com/t/c/font_4072822_j5r3vfaxh8h.css';

.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 80px;
  z-index: 90;
  background: url('../../assets/images/footer.png') center no-repeat;
  background-size: cover;
}
.btn-groups {
  display: flex;
  justify-content: center;
  font-size: 12px;
  color: #fff;
}

.btn-groups .item {
  margin-left: 20px;
  text-align: center;
}

.btn-groups button {
  margin-bottom: 4px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  outline: none;
  color: #fff;
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.3);
  background: linear-gradient(
    to bottom,
    rgba(0, 128, 255, 0.377),
    rgba(0, 128, 255, 0.281)
  );
}

.btn-groups button:hover {
  cursor: pointer;
  background: linear-gradient(
    to bottom,
    rgba(0, 128, 255, 1),
    rgba(0, 128, 255, 0.281)
  );
}
</style>
