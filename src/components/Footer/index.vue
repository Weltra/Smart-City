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
    </div>
  </footer>
</template>

<script setup>
import useRotation from './hooks/useRotation'
const { mark, handleRotation } = useRotation()

let isShow = true
const emits = defineEmits(['toggleCharts'])
function toggleCharts() {
  isShow = !isShow
  emits('toggleCharts', isShow)
}
</script>

<style>
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
