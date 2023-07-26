<template>
  <v-chart class="chart" :option="option" autoresize />
</template>

<script setup>
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  MarkLineComponent,
  MarkPointComponent,
} from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'
import { ref, provide } from 'vue'
import { UniversalTransition } from 'echarts/features'

use([
  TooltipComponent,
  GridComponent,
  LegendComponent,
  MarkLineComponent,
  MarkPointComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
])

provide(THEME_KEY, 'dark')

const option = ref({
  backgroundColor: '',
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    top: '0%',
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: '{value} °C',
    },
    scale: true,
  },
  grid: {
    left: '0%',
    right: '10%',
    bottom: '3%',
    containLabel: true,
  },
  series: [
    {
      name: 'Highest',
      type: 'line',
      color: '#5470c6',
      data: [34, 31, 31, 32, 35, 35, 33],
      lineStyle: {
        //lineStyle里面写y轴那一条线的样式
        width: 3, //轴线的粗细 我写的是2 最小为0，值为0的时候线隐藏
      },
      markPoint: {
        symbolSize: 40,
        data: [
          { type: 'max', name: 'Max' },
          { type: 'min', name: 'Min' },
        ],
      },
      markLine: {
        data: [{ type: 'average', name: 'Avg' }],
      },
    },
    {
      name: 'Lowest',
      type: 'line',
      color: '#91cc75',
      data: [26, 26, 24, 25, 27, 26, 25],
      lineStyle: {
        //lineStyle里面写y轴那一条线的样式
        width: 3, //轴线的粗细 我写的是2 最小为0，值为0的时候线隐藏
      },
      markPoint: {
        symbolSize: 40,
        data: [
          { type: 'max', name: 'Max' },
          { type: 'min', name: 'Min' },
        ],
      },
      markLine: {
        data: [
          { type: 'average', name: 'Avg' },
          [
            {
              symbol: 'none',
              x: '90%',
              yAxis: 'max',
            },
            {
              symbol: 'circle',
              label: {
                position: 'start',
                formatter: 'Max',
              },
              type: 'max',
              name: '最高点',
            },
          ],
        ],
      },
    },
  ],
})
</script>

<style scoped>
.chart {
  height: 200px;
}
</style>
