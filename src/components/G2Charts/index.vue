<template>
  <div>
    <div class="left-container">
      <div class="g2-chart">
        <div class="title">出行人口统计</div>
        <!-- 柱状图 -->
        <ColumnChart v-bind="lt_config" :data="lt_data" />
      </div>
      <div class="g2-chart">
        <div class="title">实时公交在线表</div>
        <!-- 玫瑰图 -->
        <RoseChart v-bind="lb_config" :data="lb_data" />
      </div>
    </div>
    <div class="right-container">
      <div class="g2-chart">
        <div class="title">武汉市人口统计</div>
        <!-- 饼状图 -->
        <PieChart v-bind="rt_config" />
      </div>
      <div class="g2-chart static">
        <div class="title">武汉市三甲医院</div>
        <div class="list">
          <div>
            <h4>医院 <span>30家</span></h4>
            <img width="150px" src="../../assets/icons/hospital.png" />
          </div>
          <div>
            <h4>门诊部 <span>300个</span></h4>
            <img src="../../assets/icons/building.png" />
          </div>
          <div>
            <h4>病床 <span>3000张</span></h4>
            <img src="../../assets/icons/bed.png" />
          </div>
        </div>
      </div>
      <div class="g2-chart static">
        <div class="title">高校学生统计</div>
        <div class="list">
          <div>
            <h4>高校 <span>130所</span></h4>
            <img src="../../assets/icons/school.png" alt="" />
          </div>
          <div>
            <h4>在校大学生<span>100万</span></h4>
            <img src="../../assets/icons/student.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ColumnChart, RoseChart, PieChart } from '@opd/g2plot-vue'
// 从自定义hooks中获取数据
import { useLeftTop } from './hooks/useLeftTop'
import { useLeftBottom } from './hooks/useLeftBottom'
import { useRightTop } from './hooks/useRightTop'

const { config: lt_config, data: lt_data } = useLeftTop()
const { config: lb_config, data: lb_data } = useLeftBottom()
const { config: rt_config } = useRightTop()
</script>

<style>
.left-container {
  position: fixed;
  top: 50px;
  left: 20px;
  z-index: 5;
}
.right-container {
  position: fixed;
  top: 50px;
  right: 20px;
  z-index: 5;
}
.g2-chart {
  position: relative;
  margin: 20px 0;
  padding: 20px;
  background: linear-gradient(to bottom, #292e4968, #5369766a);
  border-radius: 20px;
}
.g2-chart::before {
  display: block;
  content: '';
  position: absolute;
  top: -5px;
  left: -2px;
  width: 111px;
  height: 35px;
  background-image: url('../../assets/images/border.png');
  transform: rotate(180deg);
}
.g2-chart::after {
  display: block;
  content: '';
  position: absolute;
  bottom: -5px;
  right: -2px;
  width: 111px;
  height: 35px;
  background-image: url('../../assets/images/border.png');
}
.g2-chart .title {
  padding-left: 64px;
  margin-bottom: 20px;
  color: #fff;
  line-height: 46px;
  background: url('../../assets/images/chart-item.png') no-repeat;
}
.g2-chart .list {
  display: flex;
  justify-content: space-evenly;
  font-size: 12px;
  color: #fff;
  text-align: center;
}
.g2-chart .list img {
  width: 40px;
  margin-top: 5px;
}
/* 为了调用右边的宽高 */
.right-container .g2-chart {
  min-width: 300px;
}
.g2-chart.static {
  padding: 10px;
  height: 130px;
  box-sizing: border-box;
}
.g2-chart.static:first-of-type {
  margin-top: 20px;
}
.g2-chart.static .title {
  transform: scale(0.8);
  margin-bottom: 0;
}
@media screen and (max-width: 800px) {
  .g2-container {
    display: none;
  }
}
</style>
