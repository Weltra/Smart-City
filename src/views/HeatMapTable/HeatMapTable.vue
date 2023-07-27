<template>
  <!-- 标签页 -->
  <div class="TableContainer">
    <div class="tableHead">
      <router-link to="/home/heatmap/classic">经典热力图</router-link>
      <router-link to="/home/heatmap/grid">网络热力图</router-link>
      <router-link to="/home/heatmap/beehome">蜂窝热力图</router-link>
    </div>
    <div class="tableContent">
      <router-view></router-view>
      <div class="close-btn">
        <el-button @click="closeTable">关闭</el-button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter, RouterView } from 'vue-router'
const router = useRouter()
function closeTable() {
  router.replace('/')
}
</script>
<style scoped>
.TableContainer {
  position: fixed;
  background: linear-gradient(to bottom, #292e4968, #5369766a);
  color: #fff;
  top: 100px;
  left: 20px;
  width: 300px;
  border-radius: 14px;
}

.TableContainer .tableHead {
  display: flex;
  justify-content: space-between;
  background-color: rgb(22, 46, 67);
  border-radius: 14px;
}
.TableContainer .tableHead a {
  display: inline-block;
  color: #fff;
  text-decoration: none;
  padding: 5px;
  font-weight: bold;
  width: 300px;
  text-align: center;
}

.router-active {
  background-color: #5a707dd1;
  border-radius: 14px;
}

.tableContent {
  padding-top: 10px;
}

.close-btn {
  margin-left: 210px;
  margin-bottom: 5px;
}

.TableContainer::before {
  display: block;
  content: '';
  position: absolute;
  top: -5px;
  left: -2px;
  width: 111px;
  height: 35px;
  background-image: url('../../assets/images/border.png');
  transform: rotate(180deg);
  pointer-events: none;
}
.TableContainer::after {
  display: block;
  content: '';
  position: absolute;
  bottom: -5px;
  right: -2px;
  width: 111px;
  height: 35px;
  background-image: url('../../assets/images/border.png');
  pointer-events: none;
}
</style>
