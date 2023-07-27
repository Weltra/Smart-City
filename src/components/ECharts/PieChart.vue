<template>
  <v-chart class="chart" :option="option" autoresize />
</template>

<script setup>
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent } from 'echarts/components'
import { LabelLayout } from 'echarts/features'
import VChart, { THEME_KEY } from 'vue-echarts'
import { ref, provide } from 'vue'

use([TooltipComponent, LegendComponent, PieChart, CanvasRenderer, LabelLayout])

provide(THEME_KEY, 'dark')

const option = ref({
  backgroundColor: '',
  tooltip: {
    trigger: 'item',
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['杭州东站', '杭州南站', '杭州站', '余杭站', '其他'],
  },
  series: [
    {
      // name: 'Access From',
      left: 30,
      type: 'pie',
      radius: ['45%', '80%'],
      avoidLabelOverlap: false,
      color: ['#91cc75', '#5470c6', '#fac858', '#73c0de', '#ee6666'],
      itemStyle: {
        borderRadius: 3,
        borderColor: '#fff',
        borderWidth: 1.5,
      },
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 15,
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { name: '杭州东站', value: 65 },
        { name: '杭州南站', value: 20 },
        { name: '杭州站', value: 12 },
        { name: '余杭站', value: 8 },
        { name: '其他', value: 3 },
      ],
    },
  ],
})
</script>

<style scoped>
.chart {
  height: 180px;
}
</style>
