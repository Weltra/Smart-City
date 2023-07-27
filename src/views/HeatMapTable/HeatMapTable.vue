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
    </div>
  </div>
</template>
<script setup></script>
<style scoped>
.TableContainer {
  position: fixed;
  background-color: #53697670;
  color: #fff;
  top: 100px;
  left: 20px;
  width: 300px;
  /* height: 200px; */
  border-radius: 25px;
}

.TableContainer .tableHead {
  display: flex;
  justify-content: space-around;
  background-color: #efefef;
  border-radius: 25px;
}
.TableContainer .tableHead a {
  display: inline-block;
  color: black;
  text-decoration: none;
}

.router-active {
  background-color: #efefef;
}

.tableContent { 
  padding-top: 10px;
}
</style>
