<template>
  <div class="g2-container">
    <div class="left-container">
      <div class="g2-chart">
        <div class="title">出行人口统计</div>
        <ColumnChart v-bind="lt_config" :data="lt_data" />
      </div>
      <div class="g2-chart">
        <div class="title">实时公交在线表</div>
      </div>
    </div>
    <div class="right-container">
      <div class="g2-chart">
        <div class="title">武汉市人口统计</div>
      </div>
      <div class="g2-chart">
        <div class="title">武汉三甲医院</div>
        <div class="list">
          <div>
            <h4>医院 <span>30家</span></h4>
            <img src="../assets/icons/hospital.png" alt="" />
          </div>
          <div>
            <h4>门诊部 <span>300个</span></h4>
            <img
              style="width: 25px"
              src="../assets/icons/building.png"
              alt=""
            />
          </div>
          <div>
            <h4>病床 <span>3000张</span></h4>
            <img src="../assets/icons/bed.png" alt="" />
          </div>
        </div>
      </div>
      <div class="g2-chart">
        <div class="title">高校学生统计</div>
        <div class="list">
          <div>
            <h4>高校 <span>130家</span></h4>
            <img src="../assets/icons/school.png" alt="" />
          </div>
          <div>
            <h4>在校大学生<span>100万</span></h4>
            <img src="../assets/icons/student.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ColumnChart, RoseChart, PieChart } from '@opd/g2plot-vue'
// // 从自定义hooks中获取数据
import { useLeftTop } from './hooks/useLeftTop.js'
const { config: lt_config, data: lt_data } = useLeftTop()
</script>

<style>
.g2-container {
  position: fixed;
  top: 40px;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;

  display: flex;
  justify-content: space-between;
}
/* 当可视容器<800px时就不显示 */
@media screen and (max-width: 800px) {
  .g2-container {
    display: none;
  }
}
.left-container,
.right-container {
  flex-basis: 25%;
  display: flex;
  flex-direction: column;
}

.g2-chart {
  position: relative;
  flex: 1;
  margin: 20px;
  padding: 20px;

  background: linear-gradient(to bottom, #292e4968, #5369766a);
  border-radius: 20px;
}
.g2-chart::before {
  display: block;
  position: absolute;
  top: -5px;
  left: -2px;
  content: '';
  width: 111px;
  height: 35px;
  background-image: url('../assets/images/border.png');
  transform: rotate(180deg);
}

.g2-chart::after {
  display: block;
  position: absolute;
  bottom: -5px;
  right: -2px;
  content: '';
  width: 111px;
  height: 35px;
  background-image: url('../assets/images/border.png');
}
.g2-chart .title {
  padding-left: 64px;
  line-height: 46px;
  color: #fff;
  white-space: nowrap;
  background: url('../assets/images/chart-item.png') no-repeat;
}
.right-container .g2-chart:first-child {
  flex: 3;
}
.g2-chart .list {
  display: flex;
  justify-content: space-evenly;
  margin-top: 20px;
  color: #fff;
  text-align: center;
  font-size: 12px;
  white-space: nowrap;
}
.g2-chart .list img {
  width: 40px;
}
</style>
